import json
import os
import os
os.environ["TF_USE_LEGACY_KERAS"] = "1"
import sys
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf

from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input

IMG_SIZE = 224
STAGE1_METADATA_PATH = "models/stage1_metadata.json"
STAGE1_CLASS_DEFAULT = {"cataract": 0, "normal": 1}


# -----------------------------
# LOAD STAGE-1 MODEL
# -----------------------------
def _load_stage1_model():
    candidates = [
        "models/stage1_cataract_model.keras",
        "models/stage1_cataract_model_best.h5",
        "models/stage1_cataract_model.h5",
    ]

    for path in candidates:
        if os.path.exists(path):
            return tf.keras.models.load_model(path,compile=False), path

    raise FileNotFoundError("Stage-1 model not found.")


# -----------------------------
# LOAD STAGE-2 MODEL
# -----------------------------
def _load_stage2_model():
    candidates = [
        "models/stage2_severity_model.keras",
        "models/stage2_severity_model.h5",
    ]

    for path in candidates:
        if os.path.exists(path):
            return tf.keras.models.load_model(path,compile=False), path

    raise FileNotFoundError("Stage-2 model not found.")


# -----------------------------
# LOAD METADATA
# -----------------------------
def _load_stage1_metadata(stage1_model):

    default = {
        "preprocess": "efficientnet_preprocess_input",
        "class_indices": STAGE1_CLASS_DEFAULT,
        "output_mode": "binary_sigmoid",
    }

    if not os.path.exists(STAGE1_METADATA_PATH):
        return default

    with open(STAGE1_METADATA_PATH, "r") as f:
        meta = json.load(f)

    default.update(meta)
    return default


# -----------------------------
# LOAD MODELS
# -----------------------------
stage1_model, stage1_model_path = _load_stage1_model()
stage2_model, stage2_model_path = _load_stage2_model()

stage1_metadata = _load_stage1_metadata(stage1_model)

print("Stage-1 model loaded from:", stage1_model_path)
print("Stage-2 model loaded from:", stage2_model_path)


# -----------------------------
# LOAD IMAGE
# -----------------------------
def load_image_array(img_path):

    img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = image.img_to_array(img)

    return np.expand_dims(img_array, axis=0)


# -----------------------------
# PREPROCESS
# -----------------------------
def preprocess_stage1(img_array):

    if stage1_metadata["preprocess"] == "efficientnet_preprocess_input":
        return preprocess_input(img_array.copy())

    return img_array / 255.0


def preprocess_stage2(img_array):

    return preprocess_input(img_array.copy())


# -----------------------------
# PREDICTION FUNCTION
# -----------------------------
def predict_image(img_path):

    img_array = load_image_array(img_path)

    # ---------- Stage 1 ----------
    stage1_input = preprocess_stage1(img_array)
    stage1_pred = stage1_model.predict(stage1_input, verbose=0)

    prob = float(stage1_pred[0][0])

    if prob >= 0.7:

        prediction = "Normal"
        confidence = prob

        print("\n===== Cataract Analysis =====")
        print("Prediction :", prediction)
        print("Confidence :", round(confidence * 100, 2), "%")

        return prediction,float(round(confidence*100,2))

    # ---------- Stage 2 ----------
    if prob <= 0.3:

        stage2_input = preprocess_stage2(img_array)
        stage2_pred = stage2_model.predict(stage2_input, verbose=0)

        mild_prob = float(stage2_pred[0][0])
        severe_prob = float(stage2_pred[0][1])

        confidence = max(mild_prob, severe_prob)

        if severe_prob > mild_prob:

            prediction = "Severe Cataract"

        else:

            prediction = "Mild Cataract"

        print("\n===== Cataract Analysis =====")
        print("Prediction :", prediction)
        print("Confidence :", round(confidence * 100, 2), "%")

        return prediction,float(round(confidence*100,2))

        # -------- Probability Graph --------
        

    prediction="Uncertain"
    confidence=prob
    return prediction,float(round(confidence*100,2))


# -----------------------------
# MAIN
# -----------------------------
if __name__ == "__main__":

    test_image_path = sys.argv[1] if len(sys.argv) > 1 else "severeimg.jpg"

    result = predict_image(test_image_path)

    print("\nFinal Prediction:", result)