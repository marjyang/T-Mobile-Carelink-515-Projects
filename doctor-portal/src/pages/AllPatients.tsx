import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, IconButton, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PersonIcon from '@mui/icons-material/Person';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { db, storage } from '../firebase';
import InputModule from '../components/InputModule';

interface AllPatientsProps {
  onAddNewPatient: () => void;
}

interface Report {
  filename: string;
  url: string;
  timestamp: number;
  patientInfo?: {
    patientName: string;
    patientId: string;
    rehabilitationPhase: string;
  };
}

const AllPatients: React.FC<AllPatientsProps> = ({ onAddNewPatient }) => {
  const [open, setOpen] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [patientInfo, setPatientInfo] = useState<{ patientName: string; patientId: string; rehabilitationPhase: string } | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');

  // 模拟数据
  const allPatients = [
    { name: 'John Doe', id: '12345', priority: 'High', phase: 'Mid', lastExercise: '12 Days', nextAssessment: '05/26/2025' },
    { name: 'Olivia Brown', id: '5678', priority: 'High', phase: 'Mid', lastExercise: '8 Days', nextAssessment: '05/26/2025' },
    { name: 'Monica Wang', id: '9012', priority: 'High', phase: 'Mid', lastExercise: '7 Days', nextAssessment: '05/26/2025' },
    { name: 'Jennie Kim', id: '3456', priority: 'High', phase: 'Mid', lastExercise: '6 Days', nextAssessment: '05/26/2025' },
    { name: 'Victoria Miller', id: '7890', priority: 'Mid', phase: 'Mid', lastExercise: '4 Days', nextAssessment: '05/26/2025' },
    { name: 'Zach Jackson', id: '2345', priority: 'Mid', phase: 'Mid', lastExercise: '4 Days', nextAssessment: '05/26/2025' },
    { name: 'Dylan Smith', id: '6789', priority: 'Mid', phase: 'Mid', lastExercise: '3 Days', nextAssessment: '05/26/2025' },
    { name: 'Emma J.', id: '4321', priority: 'Low', phase: 'Mid', lastExercise: '1 Days', nextAssessment: '05/26/2025' },
    { name: 'Jennifer P', id: '8765', priority: 'Low', phase: 'Mid', lastExercise: '0 Days', nextAssessment: '05/26/2025' },
    { name: 'John Doe', id: '1111', priority: 'Low', phase: 'Mid', lastExercise: '0 Days', nextAssessment: '05/26/2025' },
  ];
  const [patients, setPatients] = useState(allPatients);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return '#861B54';
      case 'Mid':
        return '#FEC84B';
      case 'Low':
        return '#A3E635';
      default:
        return '#6A6A6A';
    }
  };

  // fetch 最新 report
  const fetchReports = async (pid: string) => {
    setReportLoading(true);
    setReportError(null);
    setReports([]);
    setPatientInfo(null);
    try {
      const reportsRef = collection(db, 'patients', pid, 'reports');
      const q = query(reportsRef, orderBy('timestamp', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setReportError('No reports found for this patient ID.');
        setReportLoading(false);
        return null;
      }
      const docData = querySnapshot.docs[0].data();
      const url = docData.pdfUrl || '';
      const timestamp = docData.timestamp || 0;
      setReports([
        {
          filename: url ? url.split('/').pop() || '' : '',
          url,
          timestamp,
          patientInfo: docData.patientInfo || {
            patientName: docData.patientName || '',
            patientId: pid,
            rehabilitationPhase: docData.phase || docData.rehabilitationPhase || '',
          },
        },
      ]);
      setPatientInfo(docData.patientInfo || {
        patientName: docData.patientName || '',
        patientId: pid,
        rehabilitationPhase: docData.phase || docData.rehabilitationPhase || '',
      });
      return url;
    } catch (error) {
      setReportError('Failed to load reports. Please try again later.');
      return null;
    } finally {
      setReportLoading(false);
    }
  };

  // 获取 doctor/reports 下最新 PDF
  const fetchLatestDoctorReport = async () => {
    try {
      const reportsRef = ref(storage, 'doctor/reports');
      const res = await listAll(reportsRef);
      if (!res.items.length) throw new Error('No reports found.');
      // 获取所有文件的 metadata
      const filesWithMeta = await Promise.all(
        res.items.map(async (itemRef) => {
          const meta = await getMetadata(itemRef);
          return { ref: itemRef, updated: meta.updated };
        })
      );
      // 找到最后修改时间最新的
      filesWithMeta.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
      const latestRef = filesWithMeta[0].ref;
      const url = await getDownloadURL(latestRef);
      return url;
    } catch (e) {
      setReportError('No doctor report found.');
      return null;
    }
  };

  // 搜索栏搜索
  const handleSearch = () => {
    const value = searchInput.trim();
    if (!value) {
      setPatients(allPatients);
      setExpandedRowId(null);
      setReports([]);
      setPatientInfo(null);
      setReportError(null);
      return;
    }
    const filtered = allPatients.filter(p => p.id.includes(value));
    setPatients(filtered);
    if (filtered.length > 0) {
      fetchReports(filtered[0].id);
      setExpandedRowId(filtered[0].id);
    } else {
      setExpandedRowId(null);
      setReports([]);
      setPatientInfo(null);
      setReportError(null);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  // 每行按钮弹窗
  const handleViewReport = (pid: string) => {
    if (expandedRowId === pid) {
      setExpandedRowId(null);
      setReports([]);
      setPatientInfo(null);
      setReportError(null);
      return;
    }
    fetchReports(pid);
    setExpandedRowId(pid);
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#F9F9F9', minHeight: '100vh' }}>
      {/* 搜索栏 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          placeholder="Search patients..."
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            width: 320,
            '& .MuiOutlinedInput-root': {
              bgcolor: '#fff',
              borderRadius: 2,
              '& fieldset': { borderColor: '#E5E5E5' },
              '&:hover fieldset': { borderColor: '#E20074' },
              '&.Mui-focused fieldset': { borderColor: '#E20074' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#6A6A6A' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#E20074',
            color: '#fff',
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 14,
            '&:hover': {
              bgcolor: '#B8005A',
            },
          }}
          onClick={onAddNewPatient}
        >
          Add New Patient
        </Button>
      </Box>
      {/* 表格区域 */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: 15, color: '#111', py: 2 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 15, color: '#111', py: 2 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 15, color: '#111', py: 2 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 15, color: '#111', py: 2 }}>Rehab Phase</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 15, color: '#111', py: 2 }}>Last Exercise</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 15, color: '#111', py: 2 }}>Next Assessment</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 15, color: '#111', py: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ color: '#E20074', fontWeight: 600 }}>
                  No patient found.
                </TableCell>
              </TableRow>
            ) : patients.map((patient, index) => (
              <TableRow
                key={patient.id || index}
                sx={{
                  '&:hover': { bgcolor: '#F9F9F9' },
                  transition: 'all 0.2s',
                }}
              >
                <TableCell sx={{ py: 2, color: '#111', fontSize: 14 }}>{patient.name}</TableCell>
                <TableCell sx={{ py: 2, color: '#6A6A6A', fontSize: 14 }}>{patient.id}</TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Box
                    sx={{
                      bgcolor: `${getPriorityColor(patient.priority)}15`,
                      color: getPriorityColor(patient.priority),
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: 13,
                      fontWeight: 600,
                      display: 'inline-block',
                    }}
                  >
                    {patient.priority}
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2, color: '#111', fontSize: 14 }}>{patient.phase}</TableCell>
                <TableCell sx={{ py: 2, color: '#6A6A6A', fontSize: 14 }}>{patient.lastExercise}</TableCell>
                <TableCell sx={{ py: 2, color: '#6A6A6A', fontSize: 14 }}>{patient.nextAssessment}</TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: '#E20074',
                      color: '#E20074',
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'none',
                      mr: 1,
                      '&:hover': {
                        bgcolor: '#FCE4F2',
                        borderColor: '#B8005A',
                      },
                    }}
                    onClick={async () => {
                      setReportLoading(true);
                      setReportError(null);
                      try {
                        const url = await fetchLatestDoctorReport();
                        if (url) window.open(url, '_blank');
                      } finally {
                        setReportLoading(false);
                      }
                    }}
                  >
                    View Report
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#E20074',
                      color: '#fff',
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#B8005A',
                      },
                    }}
                    onClick={async () => {
                      setReportLoading(true);
                      setReportError(null);
                      try {
                        const url = await fetchReports(patient.id);
                        if (url) window.open(url, '_blank');
                      } finally {
                        setReportLoading(false);
                      }
                    }}
                  >
                    View Plan
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllPatients; 