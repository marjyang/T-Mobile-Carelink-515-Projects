import React from 'react';
import { Box, Typography } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box sx={{ p: 4, bgcolor: '#F9F9F9', minHeight: '100vh' }}>
      <Typography sx={{ fontWeight: 700, fontSize: 24, color: '#111' }}>Settings</Typography>
    </Box>
  );
};

export default Settings; 