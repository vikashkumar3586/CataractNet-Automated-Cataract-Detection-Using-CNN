import tensorflow as tf
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.efficientnet import preprocess_input
from sklearn.metrics import classification_report, confusion_matrix

IMG_SIZE = 224
BATCH_SIZE = 32

DATASET_PATH = "datasets/stage2_mild_severe"

# Load trained model
model = tf.keras.models.load_model("models/stage2_severity_model.h5")

# Data generator
datagen = ImageDataGenerator(preprocessing_function=preprocess_input)

data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    shuffle=False
)

# True labels
y_true = data.classes

# Predictions
y_pred = model.predict(data)
y_pred = np.argmax(y_pred, axis=1)

# Classification report
print("\n===== Model Evaluation =====\n")
print(classification_report(y_true, y_pred, target_names=data.class_indices.keys()))

# Confusion matrix
cm = confusion_matrix(y_true, y_pred)

plt.figure(figsize=(6,5))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=data.class_indices.keys(),
            yticklabels=data.class_indices.keys())

plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")

plt.show()