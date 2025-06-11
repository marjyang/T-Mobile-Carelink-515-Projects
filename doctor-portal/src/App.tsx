import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Badge } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Sidebar from './components/Sidebar';
import doctorProfile from './assets/doctor.png';
import Overview from './pages/Overview';
import AllPatients from './pages/AllPatients';
import RehabPlan from './pages/RehabPlan';
import PatientReports from './pages/PatientReports';
import Settings from './pages/Settings';
import SignInPage from './pages/SignInPage.jsx';

const DOCTOR_NAME = 'Smith';

function App() {
  const [user, setUser] = useState<any>(null);
  const [selectedIdx, setSelectedIdx] = useState(0); // 默认选中 Overview

  if (!user) {
    return <SignInPage onSignIn={setUser} switchUserType={() => {}} />;
  }

  // 医生和患者都支持侧边栏切换，顶部欢迎语和头像动态显示
  const isDoctor = user.role === 'doctor';

  const renderContent = () => {
    switch (selectedIdx) {
      case 0:
        return <Overview />;
      case 1:
        return <AllPatients onAddNewPatient={() => setSelectedIdx(2)} />;
      case 2:
        return <RehabPlan />;
      case 3:
        return <PatientReports />;
      case 4:
        return <Settings />;
      default:
        return <AllPatients onAddNewPatient={() => setSelectedIdx(2)} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F5F6F7' }}>
        <Sidebar selectedIdx={selectedIdx} onSelect={setSelectedIdx} />
        <Box sx={{ flex: 1, ml: '240px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AppBar position="static" elevation={0} sx={{ bgcolor: '#F5F6F7', color: '#000', boxShadow: 'none', borderBottom: 'none', zIndex: 1100 }}>
            <Toolbar sx={{ minHeight: 72, display: 'flex', justifyContent: 'space-between', pr: 4, pl: 4 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 22, color: '#111', fontFamily: 'TeleNeo, Arial, sans-serif' }}>
                {isDoctor
                  ? `Welcome, Dr. ${user.name} !`
                  : `Welcome, ${user.name} !`}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{ mr: 2, transition: 'all 0.15s', '&:hover': { color: '#E20074', transform: 'scale(1.15)' } }}>
                  <Badge color="error" variant="dot" overlap="circular">
                    <NotificationsNoneOutlinedIcon sx={{ fontSize: 28, color: 'inherit' }} />
                  </Badge>
                </IconButton>
                <Avatar alt={user.name} src={doctorProfile} sx={{ width: 40, height: 40, mr: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 15, fontFamily: 'TeleNeo, Arial, sans-serif', color: '#000' }}>{user.name}</Typography>
                  <Typography sx={{ fontSize: 13, color: '#6A6A6A', fontFamily: 'TeleNeo, Arial, sans-serif', fontWeight: 500 }}>
                    {isDoctor ? 'Orthopedic surgeon' : ''}
                  </Typography>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          {/* 页面内容区域 */}
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
