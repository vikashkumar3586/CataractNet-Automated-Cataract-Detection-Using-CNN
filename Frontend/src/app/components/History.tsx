import { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/auth';
import { motion } from 'motion/react';
import { ArrowLeft, Search, User, Calendar, Users, Hash, Eye, FileText } from 'lucide-react';
import type { PatientRecord, Page } from '../App';

interface HistoryProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export function History({ onBack, onNavigate }: HistoryProps) {
  const [patientRecords, setPatientRecords] = useState<PatientRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState<PatientRecord[]>([]);

  useEffect(() => {
    // Load patient records from localStorage
    // const storedRecords = localStorage.getItem('patientRecords');
     
    

const user = getCurrentUser();
const key = `records_${user?.mobile}`;

const storedRecords = localStorage.getItem(key);

    if (storedRecords) {
      const records: PatientRecord[] = JSON.parse(storedRecords);
      // Sort by timestamp (newest first)
      records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setPatientRecords(records);
      setFilteredRecords(records);
    }
  }, []);

  useEffect(() => {
    // Filter records based on search term
    if (searchTerm) {
      const filtered = patientRecords.filter((record) =>
        record.patientDetails?.name || "User".toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(patientRecords);
    }
  }, [searchTerm, patientRecords]);

  const getStatusBadgeConfig = (record: PatientRecord) => {
    if (record.analysisResult.status === 'Normal') {
      return {
        bgColor: 'bg-[#d1fae5]',
        textColor: 'text-[#059669]',
        borderColor: 'border-[#10b981]',
        label: 'Normal',
      };
    }
    
    if (record.analysisResult.severity === 'Mild') {
      return {
        bgColor: 'bg-[#fef3c7]',
        textColor: 'text-[#d97706]',
        borderColor: 'border-[#f59e0b]',
        label: 'Mild Cataract',
      };
    }
    
    return {
      bgColor: 'bg-[#fee2e2]',
      textColor: 'text-[#dc2626]',
      borderColor: 'border-[#ef4444]',
      label: 'Severe Cataract',
    };
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 bg-gradient-to-b from-white to-[#e0f2fe]">
      <div className="container mx-auto px-4 max-w-6xl">
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
              Your History
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              View all cataract detection records for all patients
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by patient name or serial number..."
                className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] transition-all bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#0891b2]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                  <p className="text-xl text-foreground">{patientRecords.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d1fae5] flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#059669]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Normal</p>
                  <p className="text-xl text-foreground">
                    {patientRecords.filter(r => r.analysisResult.status === 'Normal').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#d97706]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mild Cataract</p>
                  <p className="text-xl text-foreground">
                    {patientRecords.filter(r => r.analysisResult.severity === 'Mild').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fee2e2] flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#dc2626]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Severe Cataract</p>
                  <p className="text-xl text-foreground">
                    {patientRecords.filter(r => r.analysisResult.severity === 'Severe').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Records Table */}
          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-border">
              <div className="w-20 h-20 rounded-full bg-[#e0f2fe] flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-[#0891b2]" />
              </div>
              <h3 className="text-xl mb-2 text-foreground">No Records Found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'No records match your search criteria.' : 'No patient records available yet.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm text-muted-foreground">Serial Number</th>
                      <th className="text-left px-6 py-4 text-sm text-muted-foreground">Patient Name</th>
                      <th className="text-left px-6 py-4 text-sm text-muted-foreground">Age</th>
                      <th className="text-left px-6 py-4 text-sm text-muted-foreground">Gender</th>
                      <th className="text-left px-6 py-4 text-sm text-muted-foreground">Status</th>
                      <th className="text-left px-6 py-4 text-sm text-muted-foreground">Date</th>
                      <th className="text-left px-6 py-4 text-sm text-muted-foreground">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredRecords.map((record, index) => {
                      const statusConfig = getStatusBadgeConfig(record);
                      return (
                        <motion.tr
                          key={record.serialNumber}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => {
  localStorage.setItem('selectedRecord', JSON.stringify(record));
  onNavigate('view-report');
}}
style={{ cursor: 'pointer' }}

                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Hash className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground font-mono">{record.serialNumber}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">{record.patientDetails?.name || "User"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">{record.patientDetails?.age || "-"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">{record.patientDetails?.gender || "-"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-lg text-xs border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground">
                            {new Date(record.timestamp).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#0891b2]">
                            {record.analysisResult.confidence.toFixed(1)}%
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
