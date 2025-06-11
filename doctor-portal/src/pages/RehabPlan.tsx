import React from 'react';
import { Box, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import InputModule from '../components/InputModule';

const RehabPlan: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* 顶部搜索栏和按钮 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, maxWidth: 1100, mx: 'auto' }}>
        <TextField
          placeholder="Search patients..."
          variant="outlined"
          size="small"
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
        >
          Add New Patient
        </Button>
      </Box>
      {/* rehab parameter表单整体加宽并居中 */}
      <InputModule />
    </Box>
  );
};

export default RehabPlan; 