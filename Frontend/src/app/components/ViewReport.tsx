import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, CheckCircle, AlertCircle, AlertTriangle, Eye, Info, User, Calendar, Users, Hash } from 'lucide-react';
import type { PatientRecord } from '../App';
import { getCurrentUser } from '../utils/auth';
import { useEffect } from 'react';

interface ViewReportProps {
  onBack: () => void;
}

export function ViewReport({ onBack }: ViewReportProps) {
  const [serialNumber, setSerialNumber] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<PatientRecord | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
  const selected = localStorage.getItem('selectedRecord');

  if (selected) {
    const record = JSON.parse(selected);
    setSearchedRecord(record);
    setSerialNumber(record.serialNumber);
    localStorage.removeItem('selectedRecord');
  }
}, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serialNumber.trim()) {
      return;
    }

    // Search for the record in localStorage
    // const storedRecords = localStorage.getItem('patientRecords');
    const user = getCurrentUser();
const key = `records_${user?.mobile}`;

const storedRecords = localStorage.getItem(key);
    if (storedRecords) {
      const records: PatientRecord[] = JSON.parse(storedRecords);
      const found = records.find(r => r.serialNumber === serialNumber.trim());
      
      if (found) {
        setSearchedRecord(found);
        setNotFound(false);
      } else {
        setSearchedRecord(null);
        setNotFound(true);
      }
    } else {
      setSearchedRecord(null);
      setNotFound(true);
    }
  };

  const getStatusConfig = (record: PatientRecord) => {
    if (record.analysisResult.status === 'Normal') {
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
    
    if (record.analysisResult.severity === 'Mild') {
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

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 bg-gradient-to-b from-white to-[#e0f2fe]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back button */}
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl mb-4 text-foreground">
              Your Report
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter the patient's serial number to retrieve their previous cataract detection report
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-border mb-8">
            <form onSubmit={handleSearch}>
              <div className="mb-6">
                <label htmlFor="serialNumber" className="block text-sm mb-2 text-foreground">
                  Serial Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="serialNumber"
                    value={serialNumber}
                    onChange={(e) => {
                      setSerialNumber(e.target.value);
                      setNotFound(false);
                    }}
                    placeholder="Enter serial number (e.g., CN1707664234567)"
                    className="w-full pl-11 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#0891b2] text-white rounded-xl hover:bg-[#0e7490] transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
              >
                <Search className="w-5 h-5" />
                Search Report
              </button>
            </form>

            {/* Not Found Message */}
            {notFound && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-sm text-red-800 text-center">
                  No report found with serial number "{serialNumber}". Please check and try again.
                </p>
              </motion.div>
            )}
          </div>

          {/* Report Display */}
          {searchedRecord && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Patient Info Card */}
              <div className="bg-gradient-to-r from-[#0891b2] to-[#06b6d4] rounded-2xl shadow-xl p-6 mb-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Hash className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80">Serial Number</p>
                      <p className="text-sm font-mono">{searchedRecord.serialNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80">Patient Name</p>
                      <p className="text-sm">{searchedRecord.patientDetails.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80">Age</p>
                      <p className="text-sm">{searchedRecord.patientDetails.age} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80">Gender</p>
                      <p className="text-sm">{searchedRecord.patientDetails.gender}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Display */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Results Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-border">
                  <h2 className="text-xl mb-6 text-foreground">Detection Results</h2>

                  {(() => {
                    const config = getStatusConfig(searchedRecord);
                    const StatusIcon = config.icon;
                    
                    return (
                      <>
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
                              {searchedRecord.analysisResult.status}
                            </span>
                          </div>

                          {searchedRecord.analysisResult.severity && (
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-muted-foreground" />
                                <span className="text-sm text-foreground">Severity Level</span>
                              </div>
                              <span className={`text-sm ${config.textColor}`}>
                                {searchedRecord.analysisResult.severity}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <Info className="w-5 h-5 text-muted-foreground" />
                              <span className="text-sm text-foreground">Confidence Score</span>
                            </div>
                            <span className="text-sm text-[#0891b2]">
                              {searchedRecord.analysisResult.confidence.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        {/* Confidence Bar */}
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Model Confidence</span>
                            <span className="text-sm text-muted-foreground">{searchedRecord.analysisResult.confidence.toFixed(1)}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#0891b2] to-[#06b6d4]"
                              initial={{ width: 0 }}
                              animate={{ width: `${searchedRecord.analysisResult.confidence}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Image Preview Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-border">
                  <h2 className="text-xl mb-6 text-foreground">Analyzed Image</h2>

                  <div className="relative rounded-xl overflow-hidden border border-border mb-6 bg-gray-50">
                    <img
                      src={searchedRecord.analysisResult.imageUrl}
                      alt="Analyzed eye"
                      className="w-full h-auto"
                    />
                    {(() => {
                      const config = getStatusConfig(searchedRecord);
                      return (
                        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
                          <span className={`text-xs ${config.textColor}`}>
                            {config.label}
                          </span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Metadata */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Analysis Date</span>
                      <span className="text-foreground">
                        {new Date(searchedRecord.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Analysis Time</span>
                      <span className="text-foreground">
                        {new Date(searchedRecord.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Model Version</span>
                      <span className="text-foreground">CataractNet v2.1</span>
                    </div>
                  </div>
                </div>
              </div>

             
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
