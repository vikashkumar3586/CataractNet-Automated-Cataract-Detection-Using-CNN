from flask import Flask, request, jsonify
from flask_cors import CORS
from scripts.predict import predict_image
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/predict", methods=["POST"])
def predict():
  try:
    file = request.files["image"]
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    # get prediction
    prediction, confidence = predict_image(path)


    return jsonify({
        "prediction": prediction,
        "confidence":float(confidence)
    })
  except Exception as e:
     print("Prediction error:",e)
     return jsonify({"error":"prediction failed"}),500
  
  
if __name__ == "__main__":
    app.run(debug=False)