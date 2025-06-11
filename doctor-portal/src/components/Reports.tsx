import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Divider, TextField, InputAdornment, IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { ref, getDownloadURL, listAll, getMetadata } from 'firebase/storage';
import { storage } from '../firebase';
import { collection, query, orderBy, limit, getDocs, getFirestore, doc, getDoc } from 'firebase/firestore';

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

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [patientId, setPatientId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [patientInfo, setPatientInfo] = useState<{ patientName: string; patientId: string; rehabilitationPhase: string } | null>(null);
  const db = getFirestore();

  const fetchReports = async (pid?: string) => {
    if (!pid) {
      setReports([]);
      setPatientInfo(null);
      setError(null);
      return;
    }
    try {
      setError(null);
      // 查询 Firestore: patients/{patientId}/reports，按 timestamp desc 取最新一条
      const reportsRef = collection(db, 'patients', pid, 'reports');
      const q = query(reportsRef, orderBy('timestamp', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setReports([]);
        setPatientInfo(null);
        setError('No reports found for this patient ID.');
        return;
      }
      const docData = querySnapshot.docs[0].data();
      // PDF url 可能在 pdfUrl 字段
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
    } catch (error) {
      setReports([]);
      setPatientInfo(null);
      setError('Failed to load reports. Please try again later.');
    }
  };

  // 搜索按钮点击
  const handleSearch = () => {
    fetchReports(patientId.trim());
    setSearchId(patientId.trim());
  };

  // 回车也能触发搜索
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  // 页面初始不加载任何 report，需输入 patientId 搜索

  const formatDate = (timestamp: number) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F6F7', py: 8, px: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, fontFamily: 'TeleNeo Extra Bold, Arial, sans-serif', mb: 4, textAlign: 'center' }}>
        Patient Report Overview
      </Typography>
      {/* 搜索栏 */}
      <Box sx={{ maxWidth: 400, mx: 'auto', mb: 3, display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Enter Patient ID"
          variant="outlined"
          size="small"
          value={patientId}
          onChange={e => setPatientId(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ flex: 1, mr: 2 }}
        />
        <IconButton color="primary" onClick={handleSearch} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
      <Box sx={{ maxWidth: 800, mx: 'auto', pl: 0, mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'TeleNeo, Arial, sans-serif', color: '#E20074', letterSpacing: 1 }}>
          Patient Information
        </Typography>
      </Box>
      <Paper elevation={2} sx={{ maxWidth: 800, mx: 'auto', p: 0, overflow: 'hidden' }}>
        {/* 顶部横向信息栏 */}
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F6F7', px: 3, py: 2, pt: 0, padding:2 }}>
          <PersonIcon sx={{ color: '#E20074', mr: 1 }} />
          <Typography sx={{ fontWeight: 700, fontFamily: 'TeleNeo, Arial, sans-serif', mr: 3 }}>
            {patientInfo ? patientInfo.patientName : '—'}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Typography sx={{ color: '#6A6A6A', fontFamily: 'TeleNeo, Arial, sans-serif', mr: 3 }}>
            ID: {patientInfo ? patientInfo.patientId : '—'}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Typography sx={{ color: '#6A6A6A', fontFamily: 'TeleNeo, Arial, sans-serif' }}>
            Phase: {patientInfo ? patientInfo.rehabilitationPhase : '—'}
          </Typography>
        </Box>
        <Divider />
        {/* 报告区块 */}
        <Box sx={{ px: 3, py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FolderOpenIcon sx={{ color: '#E20074', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'TeleNeo, Arial, sans-serif', color: '#E20074' }}>
              Latest Exercise Report
            </Typography>
          </Box>
          {error ? (
            <Typography sx={{ color: '#E20074', fontFamily: 'TeleNeo, Arial, sans-serif', py: 4, textAlign: 'center' }}>{error}</Typography>
          ) : reports.length > 0 ? (
            reports.map((report) => (
              <Box key={report.filename} sx={{ bgcolor: '#FAFAFA', borderRadius: 2, p: 3, boxShadow: 0, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PictureAsPdfIcon sx={{ color: '#E20074', mr: 1 }} />
                  <Typography sx={{ fontWeight: 600, fontFamily: 'TeleNeo, Arial, sans-serif', mr: 2 }}>
                    Latest Report: {formatDate(report.timestamp)}
                  </Typography>
                </Box>
                <Typography sx={{ color: '#6A6A6A', fontFamily: 'TeleNeo, Arial, sans-serif', mb: 2 }}>
                  {patientInfo ? `Generated from ${patientInfo.patientName}'s most recent session` : '—'}
                </Typography>
                {report.url ? (
                  <Button
                    variant="contained"
                    color="primary"
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontWeight: 600, fontFamily: 'TeleNeo, Arial, sans-serif', borderRadius: 2 }}
                  >
                    View PDF Report
                  </Button>
                ) : (
                  <Typography sx={{ color: '#E20074', fontFamily: 'TeleNeo, Arial, sans-serif' }}>
                    PDF not available
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Typography sx={{ color: '#6A6A6A', fontFamily: 'TeleNeo, Arial, sans-serif', py: 4, textAlign: 'center' }}>
              No reports available at the moment.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Reports; 