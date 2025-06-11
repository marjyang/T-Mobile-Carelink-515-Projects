import React from 'react';
import { Box, Typography } from '@mui/material';

const PatientReports: React.FC = () => {
  return (
    <Box sx={{ p: 4, bgcolor: '#F9F9F9', minHeight: '100vh' }}>
      <Typography sx={{ fontWeight: 700, fontSize: 24, color: '#111' }}>Patient Reports</Typography>
    </Box>
  );
};

export default PatientReports; 