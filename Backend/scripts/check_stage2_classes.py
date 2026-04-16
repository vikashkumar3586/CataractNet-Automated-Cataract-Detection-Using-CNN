from tensorflow.keras.preprocessing.image import ImageDataGenerator

DATASET_PATH = "datasets/stage2_mild_severe"

datagen = ImageDataGenerator()

data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224, 224),
    batch_size=32,
    class_mode="categorical"
)

print("Stage-2 Class Indices:", data.class_indices)
