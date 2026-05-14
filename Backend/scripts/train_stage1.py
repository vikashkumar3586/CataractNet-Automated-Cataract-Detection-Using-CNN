import json
import os

import matplotlib.pyplot as plt
import tensorflow as tf
from sklearn.utils.class_weight import compute_class_weight
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator

IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS_HEAD = 5
EPOCHS_FINE = 10

TRAIN_PATH = "datasets/stage1_normal_cataract/train"
TEST_PATH = "datasets/stage1_normal_cataract/test"
MODEL_PATH = "models/stage1_cataract_model.keras"
CHECKPOINT_PATH = "models/stage1_cataract_model_best.h5"
META_PATH = "models/stage1_metadata.json"

os.makedirs("models", exist_ok=True)
os.makedirs("results", exist_ok=True)

train_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    rotation_range=15,
    zoom_range=0.15,
    horizontal_flip=True,
)

test_datagen = ImageDataGenerator(preprocessing_function=preprocess_input)

train_data = train_datagen.flow_from_directory(
    TRAIN_PATH,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="binary",
)
print("Class indices:", train_data.class_indices)

test_data = test_datagen.flow_from_directory(
    TEST_PATH,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="binary",
)

class_weights_raw = compute_class_weight(
    class_weight="balanced",
    classes=tf.constant(sorted(set(train_data.classes))).numpy(),
    y=train_data.classes,
)
class_weights = {i: w for i, w in enumerate(class_weights_raw)}
print("Class weights:", class_weights)

base_model = EfficientNetB0(
    weights="imagenet",
    include_top=False,
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
)

# Phase 1: train classifier head
base_model.trainable = False
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.4)(x)
output = Dense(1, activation="sigmoid")(x)
model = Model(inputs=base_model.input, outputs=output)

model.compile(
    optimizer=Adam(learning_rate=1e-3),
    loss="binary_crossentropy",
    metrics=["accuracy", tf.keras.metrics.AUC(name="auc")],
)

callbacks = [
    EarlyStopping(monitor="val_accuracy", patience=4, restore_best_weights=True),
    ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=2, min_lr=1e-7),
    # In current TF/Keras version, ModelCheckpoint with native .keras can raise unsupported 'options' error.
    ModelCheckpoint(CHECKPOINT_PATH, monitor="val_accuracy", save_best_only=True),
]

history_head = model.fit(
    train_data,
    validation_data=test_data,
    epochs=EPOCHS_HEAD,
    class_weight=class_weights,
    callbacks=callbacks,
)

# Phase 2: fine-tune deeper EfficientNet layers
base_model.trainable = True
for layer in base_model.layers[:-100]:
    layer.trainable = False
for layer in base_model.layers:
    if isinstance(layer, tf.keras.layers.BatchNormalization):
        layer.trainable = False

model.compile(
    optimizer=Adam(learning_rate=1e-5),
    loss="binary_crossentropy",
    metrics=["accuracy", tf.keras.metrics.AUC(name="auc")],
)

history_fine = model.fit(
    train_data,
    validation_data=test_data,
    epochs=EPOCHS_FINE,
    class_weight=class_weights,
    callbacks=callbacks,
)

# Ensure final best model exists on disk
model.save(MODEL_PATH)

with open(META_PATH, "w", encoding="utf-8") as f:
    json.dump(
        {
            "preprocess": "efficientnet_preprocess_input",
            "class_indices": train_data.class_indices,
            "output_mode": "binary_sigmoid",
        },
        f,
        indent=2,
    )

acc = history_head.history["accuracy"] + history_fine.history["accuracy"]
val_acc = history_head.history["val_accuracy"] + history_fine.history["val_accuracy"]

plt.plot(acc, label="Train Accuracy")
plt.plot(val_acc, label="Test Accuracy")
plt.legend()
plt.title("Stage-1 Accuracy (Normal vs Cataract)")
plt.savefig("results/stage1_accuracy.png")
plt.show()
