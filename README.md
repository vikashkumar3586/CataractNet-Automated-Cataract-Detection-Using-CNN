# Cataract Detection Using EfficientNet

## 📌 Project Overview

This project is an AI-based cataract detection system that uses deep learning to classify eye images into:

- **Normal**
- **Mild Cataract**
- **Severe Cataract**

The system consists of:

- **Backend** — Flask API for handling image upload and prediction  
- **Frontend** — React + Vite UI for user interaction  
- **Model** — EfficientNet-based CNN for image classification  

---

## 🚀 Key Features

- Upload slit-lamp eye images  
- Two-stage classification:
  - Stage-1: Normal vs Cataract  
  - Stage-2: Mild vs Severe Cataract  
- User login system (mobile-based)  
- Patient-wise history tracking  
- Result display with confidence score  
- Downloadable **PDF report**  
- Clean and responsive UI  

---

## 🗂️ Project Structure

```
Backend/
  backend.py              # Flask API
  requirements.txt        # Python dependencies
  scripts/predict.py      # Model inference logic
  models/                 # Trained model files
  datasets/               # Training/testing datasets
  uploads/                # Uploaded images

Frontend/
  package.json            # Dependencies
  vite.config.ts          # Vite configuration
  src/
    app/
      App.tsx             # Main logic
      components/
        Upload.tsx        # Image upload UI
        Results.tsx       # Results + PDF
```

---

## ⚙️ Backend Setup

1. Navigate to Backend folder:

```bash
cd Backend
```

2. Install dependencies:

```bash
python -m pip install -r requirements.txt
```

3. Run the Flask server:

```bash
python backend.py
```

4. Backend will run on:

```
http://127.0.0.1:5000
```

---

## 💻 Frontend Setup

1. Navigate to Frontend folder:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open in browser:

```
http://localhost:5173
```


## 🧠 Model Architecture

We use **EfficientNet (CNN-based model)** for image classification.

### Why EfficientNet?

- High accuracy for medical image tasks  
- Optimized architecture (better performance with fewer parameters)  
- Scales efficiently (depth, width, resolution)  

### Working:

1. Input image  
2. Feature extraction using convolution layers  
3. Classification:
   - Stage-1 → Normal vs Cataract  
   - Stage-2 → Mild vs Severe  
4. Output:
   - Status  
   - Severity  
   - Confidence score  


## 📞 Support

For queries or support:

- Email: contact@cataractnet.com  