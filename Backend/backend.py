from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
import cloudinary
import cloudinary.uploader
from scripts.predict import predict_image

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "change-me")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)
jwt = JWTManager(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB = os.getenv("MONGODB_DB", "cataractnet")
if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI environment variable is required")

mongo_client = MongoClient(MONGODB_URI)
db = mongo_client[MONGODB_DB]
users_collection = db.users
analyses_collection = db.analyses

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Backend running", "message": "Use /auth and /predict endpoints."})

@app.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json(force=True) or {}
    name = data.get("name", "").strip()
    mobile = data.get("mobile", "").strip()
    gender = data.get("gender", "").strip()
    dob = data.get("dob", "").strip()
    password = data.get("password", "")

    if not all([name, mobile, gender, dob, password]):
        return jsonify({"success": False, "message": "All fields are required."}), 400

    if len(mobile) != 10 or not mobile.isdigit():
        return jsonify({"success": False, "message": "Mobile must be 10 digits."}), 400

    if users_collection.find_one({"mobile": mobile}):
        return jsonify({"success": False, "message": "Mobile number already registered."}), 400

    password_hash = generate_password_hash(password)

    users_collection.insert_one({
        "name": name,
        "mobile": mobile,
        "gender": gender,
        "dob": dob,
        "password_hash": password_hash,
        "createdAt": datetime.utcnow(),
    })

    return jsonify({"success": True, "message": "Registration successful."})

@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json(force=True) or {}
    mobile = data.get("mobile", "").strip()
    password = data.get("password", "")

    if not mobile or not password:
        return jsonify({"success": False, "message": "Mobile and password are required."}), 400

    user = users_collection.find_one({"mobile": mobile})
    if not user or not check_password_hash(user.get("password_hash", ""), password):
        return jsonify({"success": False, "message": "Invalid mobile number or password."}), 401

    access_token = create_access_token(identity=mobile)
    user_data = {
        "name": user["name"],
        "mobile": user["mobile"],
        "gender": user["gender"],
        "dob": user["dob"],
    }

    return jsonify({"success": True, "message": "Login successful.", "token": access_token, "user": user_data})

@app.route("/auth/profile", methods=["GET"])
@jwt_required()
def profile():
    mobile = get_jwt_identity()
    user = users_collection.find_one({"mobile": mobile}, {"password_hash": 0})
    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404

    user.pop("_id", None)
    return jsonify({"success": True, "user": user})

@app.route("/predict", methods=["POST"])
@jwt_required()
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"success": False, "message": "Image file is required."}), 400

        file = request.files["image"]
        if file.filename == "":
            return jsonify({"success": False, "message": "Image filename is invalid."}), 400

        filename = secure_filename(file.filename)
        path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(path)

        upload_result = cloudinary.uploader.upload(
            path,
            folder="cataractnet/images",
            use_filename=True,
            unique_filename=True,
            overwrite=False,
        )
        image_url = upload_result.get("secure_url")

        prediction, confidence = predict_image(path)
        os.remove(path)

        serial_number = request.form.get("serialNumber", "").strip()
        patient_name = request.form.get("name", "").strip()
        patient_gender = request.form.get("gender", "").strip()
        patient_age = request.form.get("age", "").strip()

        if not serial_number:
            serial_number = f"CN{int(datetime.utcnow().timestamp() * 1000)}"

        severity = "Normal"
        if prediction == "Mild Cataract":
            severity = "Mild"
        elif prediction == "Severe Cataract":
            severity = "Severe"
        elif prediction != "Normal":
            severity = "Mild"

        analysis = {
            "userMobile": get_jwt_identity(),
            "serialNumber": serial_number,
            "patientDetails": {
                "name": patient_name or "User",
                "gender": patient_gender or "-",
                "age": patient_age or "-",
            },
            "imageUrl": image_url,
            "prediction": prediction,
            "confidence": float(confidence),
            "severity": severity,
            "createdAt": datetime.utcnow(),
        }
        analyses_collection.insert_one(analysis)

        return jsonify({
            "success": True,
            "serialNumber": serial_number,
            "prediction": prediction,
            "confidence": float(confidence),
            "severity": severity,
            "imageUrl": image_url,
        })
    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"success": False, "message": "Prediction failed."}), 500

@app.route("/history", methods=["GET"])
@jwt_required()
def history():
    user_mobile = get_jwt_identity()
    serial_number = request.args.get("serialNumber")
    query = {"userMobile": user_mobile}
    if serial_number:
        query["serialNumber"] = serial_number.strip()
        doc = analyses_collection.find_one(query)
        if not doc:
            return jsonify({"success": False, "message": "Record not found."}), 404

        doc["id"] = str(doc.pop("_id"))
        doc.pop("userMobile", None)
        if isinstance(doc.get("createdAt"), datetime):
            doc["createdAt"] = doc["createdAt"].isoformat()

        return jsonify({"success": True, "record": doc})

    records = []
    for doc in analyses_collection.find(query).sort("createdAt", -1):
        doc["id"] = str(doc.pop("_id"))
        doc.pop("userMobile", None)
        if isinstance(doc.get("createdAt"), datetime):
            doc["createdAt"] = doc["createdAt"].isoformat()
        records.append(doc)

    return jsonify({"success": True, "history": records})

if __name__ == "__main__":
    app.run(debug=False)
