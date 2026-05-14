from tensorflow.keras.preprocessing.image import ImageDataGenerator

DATASET_PATH = "datasets/stage1_normal_cataract/train"

datagen = ImageDataGenerator()

train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224, 224),
    batch_size=32,
    class_mode="categorical"
)

print("Stage-1 Class Indices:", train_data.class_indices)
