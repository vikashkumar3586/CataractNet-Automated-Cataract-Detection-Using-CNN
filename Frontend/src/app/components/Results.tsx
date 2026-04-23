import { motion } from 'motion/react';
import { CheckCircle, AlertCircle, AlertTriangle, Download, Upload, Info, Eye, User, Calendar, Users, Hash } from 'lucide-react';
import type { AnalysisResult, PatientDetails } from '../App';
import jsPDF from "jspdf";

interface ResultsProps {
  result: AnalysisResult;
  patientDetails: PatientDetails;
  serialNumber: string;
  onUploadAnother: () => void;
  onViewAbout: () => void;
}

export function Results({ result, patientDetails, serialNumber, onUploadAnother, onViewAbout }: ResultsProps) {
  const getStatusConfig = () => {
    if (result.status === 'Normal') {
      return {
        icon: CheckCircle,
        color: 'from-[#10b981] to-[#34d399]',
        bgColor: 'bg-[#d1fae5]',
        textColor: 'text-[#059669]',
        borderColor: 'border-[#10b981]',
        label: 'Normal',
        message: 'No signs of cataract detected',
      };
    }

    if (result.severity === 'Mild') {
      return {
        icon: AlertCircle,
        color: 'from-[#f59e0b] to-[#fbbf24]',
        bgColor: 'bg-[#fef3c7]',
        textColor: 'text-[#d97706]',
        borderColor: 'border-[#f59e0b]',
        label: 'Mild Cataract',
        message: 'Mild cataract detected - recommend monitoring',
      };
    }




    return {
      icon: AlertTriangle,
      color: 'from-[#ef4444] to-[#f87171]',
      bgColor: 'bg-[#fee2e2]',
      textColor: 'text-[#dc2626]',
      borderColor: 'border-[#ef4444]',
      label: 'Severe Cataract',
      message: 'Severe cataract detected - recommend clinical consultation',
    };
  };
  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(18);
  //   doc.text("CataractNet Report", 20, 20);

  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "normal");

  //   doc.text(`Name: ${patientDetails?.name || "N/A"}`, 20, 40);
  //   doc.text(`Age: ${patientDetails?.age || "-"}`, 20, 50);
  //   doc.text(`Gender: ${patientDetails?.gender || "-"}`, 20, 60);

  //   doc.text(`Status: ${result.status}`, 20, 80);
  //   doc.text(`Severity: ${result.severity || "N/A"}`, 20, 90);
  //   doc.text(`Confidence: ${result.confidence.toFixed(2)}%`, 20, 100);

  //   doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 120);

  //   doc.save(`Cataract_Report_${Date.now()}.pdf`);
  // };

  const handleDownloadPDF = () => {
  const doc = new jsPDF();

  // 🔷 HEADER
  doc.setFillColor(8, 145, 178); // teal bg
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("CataractNet Report", 105, 18, { align: "center" });

  // 🔷 Reset text color
  doc.setTextColor(0, 0, 0);

  // 🔷 Patient Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Patient Details", 20, 45);

  doc.setDrawColor(200);
  doc.line(20, 48, 190, 48);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Name: ${patientDetails?.name || "N/A"}`, 20, 60);
  doc.text(`Age: ${patientDetails?.age || "-"}`, 20, 70);
  doc.text(`Gender: ${patientDetails?.gender || "-"}`, 20, 80);

  // 🔷 Result Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Analysis Result", 20, 100);

  doc.line(20, 103, 190, 103);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Status: ${result.status}`, 20, 115);
  doc.text(`Severity: ${result.severity || "N/A"}`, 20, 125);
  doc.text(`Confidence: ${result.confidence.toFixed(2)}%`, 20, 135);

  // 🔷 Status Highlight Box
  doc.setFillColor(240, 248, 255);
  doc.roundedRect(20, 150, 170, 20, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`Diagnosis: ${result.status}`, 25, 163);

  // 🔷 Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Generated on: ${new Date().toLocaleDateString()}`,
    20,
    180
  );

  doc.text(
    "This report is AI-generated and should be reviewed by a medical professional.",
    20,
    190
  );

  // 🔷 Save
  doc.save(`Cataract_Report_${Date.now()}.pdf`);
};

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  const handleDownloadReport = () => {
    // Mock download functionality
    const reportData = {
      analysis_date: new Date().toISOString(),
      status: result.status,
      severity: result.severity,
      confidence: result.confidence,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cataract-analysis-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 bg-gradient-to-b from-white to-[#e0f2fe]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl mb-4 text-foreground">
              Analysis Results
            </h1>
            <p className="text-lg text-muted-foreground">
              Your eye image has been analyzed using our AI model
            </p>
          </div>

          {/* Patient Info & Serial Number Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-r from-[#0891b2] to-[#06b6d4] rounded-2xl shadow-xl p-6 mb-8 text-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/80">Serial Number</p>
                  <p className="text-sm">{serialNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/80">Patient Name</p>
                  <p className="text-sm">{patientDetails?.name || "User"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/80">Age</p>
                  <p className="text-sm">{patientDetails?.age || "-"} years</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/80">Gender</p>
                  <p className="text-sm">{patientDetails?.gender || "-"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Results Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-border"
            >
              <h2 className="text-xl mb-6 text-foreground">Detection Results</h2>

              {/* Status Badge */}
              <div className={`p-6 rounded-xl ${config.bgColor} border-2 ${config.borderColor} mb-6`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                    <StatusIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl ${config.textColor}`}>
                      {config.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Classification
                    </p>
                  </div>
                </div>
                <p className={`text-sm ${config.textColor}`}>
                  {config.message}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">Status</span>
                  </div>
                  <span className={`text-sm ${config.textColor}`}>
                    {result.status}
                  </span>
                </div>

                {result.severity && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">Severity Level</span>
                    </div>
                    <span className={`text-sm ${config.textColor}`}>
                      {result.severity}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">Confidence Score</span>
                  </div>
                  <span className="text-sm text-[#0891b2]">
                    {result.confidence.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Model Confidence</span>
                  <span className="text-sm text-muted-foreground">{result.confidence.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0891b2] to-[#06b6d4]"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

            </motion.div>

            {/* Image Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-border"
            >
              <h2 className="text-xl mb-6 text-foreground">Analyzed Image</h2>

              <div className="relative rounded-xl overflow-hidden border border-border mb-6 bg-gray-50">
                <img
                  src={result.imageUrl}
                  alt="Analyzed eye"
                  className="w-full h-auto"
                />
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
                  <span className={`text-xs ${config.textColor}`}>
                    {config.label}
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Analysis Date</span>
                  <span className="text-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Analysis Time</span>
                  <span className="text-foreground">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Model Version</span>
                  <span className="text-foreground">CataractNet v0.1</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleDownloadReport}
                  className="w-full px-6 py-3 bg-[#0891b2] text-white rounded-xl hover:bg-[#0e7490] transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Report
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Report
                </button>


                <button
                  onClick={onUploadAnother}
                  className="w-full px-6 py-3 bg-white border-2 border-[#0891b2] text-[#0891b2] rounded-xl hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Another Image
                </button>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-border"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg mb-2 text-foreground">
                  Want to learn more about our model?
                </h3>
                <p className="text-sm text-muted-foreground">
                  View detailed performance metrics and learn about our CNN-based approach
                </p>
              </div>
              <button
                onClick={onViewAbout}
                className="px-8 py-3 bg-[#0891b2] text-white rounded-xl hover:bg-[#0e7490] transition-colors whitespace-nowrap"
              >
                View Model Details
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}