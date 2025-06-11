import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import OverviewIcon from '../assets/overview.svg';
import PatientsIcon from '../assets/patients.svg';
import AppIcon from '../assets/app.svg';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

interface SidebarProps {
  selectedIdx: number;
  onSelect: (idx: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedIdx, onSelect }) => {
  const [patientsOpen, setPatientsOpen] = useState(true);

  const handlePatientsClick = () => {
    setPatientsOpen(!patientsOpen);
  };

  const menuItems = [
    { icon: OverviewIcon, text: 'Overview', idx: 0 },
    {
      icon: PatientsIcon,
      text: 'Patients',
      idx: 1,
      subItems: [
        { icon: PersonOutlineIcon, text: 'All Patients', idx: 1 },
        { icon: AssignmentOutlinedIcon, text: 'Rehab Plan', idx: 2 },
        { icon: AssessmentOutlinedIcon, text: 'Patient Reports', idx: 3 }
      ]
    },
    { icon: AppIcon, text: 'Settings', idx: 4 }
  ];

  return (
    <Box sx={{
      width: 240,
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bgcolor: '#fff',
      borderRight: '1px solid #E5E5E5',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1200
    }}>
      {/* Logo */}
      <Box sx={{ pt: 4, pb: 6, px: 2, display: 'flex', alignItems: 'flex-start' }}>
        <Box component="img" src={require('../assets/tmobile-logo-pure.png')} alt="T-Mobile Logo" sx={{ maxWidth: 120, maxHeight: 100, width: 'auto', height: 'auto', display: 'block' }} />
      </Box>
      {/* X-Heal Title */}
      <Box sx={{ pl: '40px', pb: 2, pt: 0.5 }}>
        <Typography sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>
          X-Heal
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, px: 2 }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.subItems ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handlePatientsClick}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: '#F9F9F9',
                        '& .MuiListItemIcon-root': { color: '#E20074' },
                        '& .MuiListItemText-primary': { color: '#E20074' }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box component="img" src={item.icon} alt={item.text} sx={{ width: 24, height: 24, opacity: selectedIdx >= 1 && selectedIdx <= 3 ? 1 : 0.5 }} />
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ '& .MuiListItemText-primary': { fontWeight: 700, fontSize: 15, color: selectedIdx >= 1 && selectedIdx <= 3 ? '#E20074' : '#6A6A6A' } }} />
                    {patientsOpen ? <ExpandLess sx={{ color: selectedIdx >= 1 && selectedIdx <= 3 ? '#E20074' : '#6A6A6A' }} /> : <ExpandMore sx={{ color: '#6A6A6A' }} />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={patientsOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem key={subItem.text} disablePadding>
                        <ListItemButton
                          onClick={() => onSelect(subItem.idx)}
                          sx={{
                            pl: '56px',
                            borderRadius: 2,
                            mb: 0.5,
                            transition: 'all 0.2s',
                            bgcolor: selectedIdx === subItem.idx ? '#FDE4F1' : 'transparent',
                            '&:hover': {
                              bgcolor: '#F9F9F9',
                              '& .MuiListItemIcon-root': { color: '#E20074' },
                              '& .MuiListItemText-primary': { color: '#E20074' }
                            }
                          }}
                        >
                          {/* 不显示icon */}
                          <ListItemText primary={subItem.text} sx={{ '& .MuiListItemText-primary': { fontWeight: 500, fontSize: 14, color: selectedIdx === subItem.idx ? '#E20074' : '#6A6A6A' } }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => onSelect(item.idx)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    transition: 'all 0.2s',
                    bgcolor: selectedIdx === item.idx ? '#FDE4F1' : 'transparent',
                    '&:hover': {
                      bgcolor: '#F9F9F9',
                      '& .MuiListItemIcon-root': { color: '#E20074' },
                      '& .MuiListItemText-primary': { color: '#E20074' }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box component="img" src={item.icon} alt={item.text} sx={{ width: 24, height: 24, opacity: selectedIdx === item.idx ? 1 : 0.5 }} />
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ '& .MuiListItemText-primary': { fontWeight: 700, fontSize: 15, color: selectedIdx === item.idx ? '#E20074' : '#6A6A6A' } }} />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>

      {/* Help Text */}
      <Box sx={{ p: 3, borderTop: '1px solid #E5E5E5' }}>
        <Typography sx={{ fontSize: 13, color: '#6A6A6A', fontWeight: 500 }}>? Need Help?</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar; 