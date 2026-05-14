import { useState } from 'react';
import { getCurrentUser } from './utils/auth';
import { Landing } from './components/Landing';
import { Upload } from './components/Upload';
import { Processing } from './components/Processing';
import { Results } from './components/Results';
import { About } from './components/About';
import { History } from './components/History';
import { ViewReport } from './components/ViewReport';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { isAuthenticated } from './utils/auth';

export type Page =
  | 'landing'
  | 'upload'
  | 'processing'
  | 'results'
  | 'about'
  | 'history'
  | 'view-report'
  | 'login'
  | 'register';

export interface PatientDetails {
  name: string;
  age: string;
  gender: string;
}

export interface AnalysisResult {
  status: 'Normal' | 'Cataract';
  severity?: 'Mild' | 'Severe';
  confidence: number;
  imageUrl: string;
}

export interface PatientRecord {
  serialNumber: string;
  patientDetails: PatientDetails;
  analysisResult: AnalysisResult;
  timestamp: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentSerialNumber, setCurrentSerialNumber] = useState<string | null>(null);

  const generateSerialNumber = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `CN${timestamp}${random}`;
  };


  const user = getCurrentUser()
  const calculateAge = (dob: string) => {
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const savePatientRecord = (record: PatientRecord) => {


    if (!user) return; // safety

    const key = `records_${user.mobile}`; // 🔥 unique per user

    const existingRecords = localStorage.getItem(key);
    const records: PatientRecord[] = existingRecords ? JSON.parse(existingRecords) : [];

    records.push(record);

    localStorage.setItem(key, JSON.stringify(records));
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };

  const handlePatientDetailsSubmit = (details: PatientDetails) => {
    setPatientDetails(details);
  };

  const handleAnalyze = async () => {
    setCurrentPage('processing');

    try {
      const formData = new FormData();

      const res = await fetch(uploadedImage!);
      const blob = await res.blob();
      const file = new File([blob], "eye.jpg", { type: "image/jpeg" });

      formData.append("image", file);

      const response = await fetch("/predict", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();
      console.log("Prediction:", data);

      let status: 'Normal' | 'Cataract' = 'Normal';
      let severity: 'Mild' | 'Severe' | undefined = undefined;

      if (data.prediction === "Normal") {
        status = "Normal";
      } else if (data.prediction === "Mild Cataract") {
        status = "Cataract";
        severity = "Mild";
      } else if (data.prediction === "Severe Cataract") {
        status = "Cataract";
        severity = "Severe";
      } else {
        status = "Cataract";
        severity = "Mild";
      }

      const result: AnalysisResult = {
        status,
        severity,
        confidence: data.confidence,
        imageUrl: uploadedImage || "",
      };

      const serialNumber = generateSerialNumber();
      const user = getCurrentUser(); 
      const patientRecord: PatientRecord = {
        serialNumber,
        patientDetails: {
          name: user?.name || "User",
          age: user?.dob ? calculateAge(user.dob).toString() : "-",
          gender: user?.gender || "-"
        },
        analysisResult: result,
        timestamp: new Date().toISOString(),
      };


      savePatientRecord(patientRecord);
      setCurrentSerialNumber(serialNumber);
      setAnalysisResult(result);
      setCurrentPage('results');

    } catch (error) {
      console.error("Error:", error);
      setCurrentPage('upload');
      alert('Analysis failed. Backend issue.');
    }
  };

  const handleUploadAnother = () => {
    setUploadedImage(null);
    setPatientDetails(null);
    setAnalysisResult(null);
    setCurrentSerialNumber(null);
    setCurrentPage('upload');
  };
  const handleLogout = () => {
  setIsLoggedIn(false);
  setUploadedImage(null); // ✅ clear image
  setAnalysisResult(null);
  setCurrentSerialNumber(null);
  setCurrentPage('landing');
};

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* ✅ Header with Auth */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={handleLogout}
      />

      <main className="flex-1">

        {currentPage === 'landing' && (
          <Landing onNavigate={navigateTo} />
        )}

        {currentPage === 'login' && (
          <Login
            onRegisterClick={() => navigateTo('register')}
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setUploadedImage(null);
              navigateTo('upload');
            }}
          />
        )}

        {currentPage === 'register' && (
          <Register
            onLoginClick={() => navigateTo('login')}
            onRegisterSuccess={() => navigateTo('login')}
          />
        )}

        {currentPage === 'upload' && (
          <Upload
            uploadedImage={uploadedImage}
            // patientDetails={patientDetails}
            onImageUpload={handleImageUpload}
            // onPatientDetailsSubmit={handlePatientDetailsSubmit}
            onAnalyze={handleAnalyze}
            onBack={() => navigateTo('landing')}
          />
        )}

        {currentPage === 'processing' && <Processing />}
        {currentPage === 'results' && analysisResult && (

          <Results

            result={analysisResult}
            patientDetails={{
              name: user?.name || "User",
              age: user?.dob ? calculateAge(user.dob).toString() : "-",
              gender: user?.gender || "-"
            }}
            serialNumber={currentSerialNumber!}
            onUploadAnother={handleUploadAnother}
            onViewAbout={() => navigateTo('about')}


          />
        )}

        {currentPage === 'about' && (
          <About onBack={() => navigateTo('landing')} />
        )}

        {currentPage === 'history' && (
          <History onBack={() => navigateTo('landing')} onNavigate={navigateTo} />
        )}

        {currentPage === 'view-report' && (
          <ViewReport onBack={() => navigateTo('landing')} />
        )}

      </main>

      <Footer />
    </div>
  );
}