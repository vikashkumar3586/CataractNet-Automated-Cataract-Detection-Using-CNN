import tensorflow as tf
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.efficientnet import preprocess_input
from sklearn.metrics import classification_report, confusion_matrix

IMG_SIZE = 224
BATCH_SIZE = 32

DATASET_PATH = "datasets/stage1_normal_cataract/test"

# Load model
model = tf.keras.models.load_model("models/stage1_cataract_model_best.h5")

datagen = ImageDataGenerator(preprocessing_function=preprocess_input)

data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="binary",
    shuffle=False
)

y_true = data.classes

y_pred = model.predict(data)
y_pred = (y_pred > 0.5).astype(int).flatten()

print("\n===== Stage-1 Model Evaluation =====\n")

print(classification_report(y_true, y_pred, target_names=data.class_indices.keys()))

cm = confusion_matrix(y_true, y_pred)

sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=data.class_indices.keys(),
            yticklabels=data.class_indices.keys())

plt.title("Stage-1 Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")

plt.show()