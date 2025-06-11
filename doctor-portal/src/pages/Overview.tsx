import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import OverviewIcon from '../assets/overview.svg';
import PatientsIcon from '../assets/patients.svg';
import AppIcon from '../assets/app.svg';
import oliviaProfile from '../assets/olivia.png';

const Overview: React.FC = () => {
  return (
    <Box sx={{ flex: 1, bgcolor: '#F9F9F9', p: 4, overflow: 'auto' }}>
      {/* 顶部卡片区：Upcoming Appointment + Calendar */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mb: 3, alignItems: 'stretch' }}>
        {/* Upcoming Appointment 卡片 */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)', p: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, md: 18 }, color: '#111' }}>Upcoming Appointment</Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 15 }, color: '#E20074', fontWeight: 600, cursor: 'pointer' }}>View All</Typography>
          </Box>
          {/* 内部灰色线框和内容区 */}
          <Box sx={{ border: '1px solid #E5E5E5', borderRadius: 2, p: { xs: 1.5, md: 3 }, bgcolor: '#fff', display: 'flex', flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' } }}>
            {/* 时间区 */}
            <Box sx={{ minWidth: 80, textAlign: 'center', mr: { xs: 0, sm: 3 }, mb: { xs: 2, sm: 0 } }}>
              <Typography sx={{ fontWeight: 500, fontSize: { xs: 20, md: 24 }, color: '#111', lineHeight: 1.1 }}>10:30<br />AM</Typography>
              <Typography sx={{ fontSize: 13, color: '#6A6A6A', mt: 1 }}>In 10 min</Typography>
            </Box>
            {/* 竖直分割线 */}
            <Box sx={{ width: { xs: '100%', sm: '1px' }, height: { xs: 1, sm: 56 }, bgcolor: '#E5E5E5', mx: { xs: 0, sm: 3 }, my: { xs: 1, sm: 0 }, borderRadius: 1, display: { xs: 'none', sm: 'block' } }} />
            {/* 头像 */}
            <Avatar src={oliviaProfile} alt="Olivia Brown" sx={{ width: 56, height: 56, mr: { xs: 0, sm: 3 }, mb: { xs: 2, sm: 0 }, alignSelf: { xs: 'center', sm: 'auto' } }} />
            {/* 信息区 */}
            <Box sx={{ flex: 1, minWidth: 0, mr: { xs: 0, sm: 3 }, mb: { xs: 2, sm: 0 } }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, md: 18 }, color: '#111', mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Olivia Brown</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                <Box sx={{ bgcolor: '#FDE4F1', color: '#E20074', fontWeight: 700, fontSize: 13, borderRadius: 1, px: 1, py: 0.2, mr: 1, mb: { xs: 1, sm: 0 } }}>Priority: High</Box>
                <Typography sx={{ fontSize: 14, color: '#6A6A6A', fontWeight: 500 }}>Rehab Phase: Mid</Typography>
              </Box>
              <Typography sx={{ fontSize: 14, color: '#6A6A6A', fontWeight: 500 }}>ID: Olivia5678 &nbsp; Note: Monthly checkup</Typography>
            </Box>
            {/* 按钮区 */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, gap: 1, minWidth: { xs: 0, sm: 110 }, width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}>
              <Box component="button" sx={{ border: '1px solid #D1D1D1', color: '#E20074', fontWeight: 600, fontSize: 13, borderRadius: 2, px: 2, py: 0.7, background: '#fff', cursor: 'pointer', mb: { xs: 0, sm: 1 }, mr: { xs: 1, sm: 0 }, flex: { xs: 1, sm: 'none' }, transition: 'all 0.2s', '&:hover': { borderColor: '#E20074', color: '#fff', background: '#E20074' } }}>View Plan</Box>
              <Box component="button" sx={{ border: 'none', color: '#fff', fontWeight: 600, fontSize: 13, borderRadius: 2, px: 2, py: 0.7, background: '#E20074', cursor: 'pointer', flex: { xs: 1, sm: 'none' }, transition: 'all 0.2s', '&:hover': { background: '#B8005A' } }}>Start Session</Box>
            </Box>
          </Box>
        </Box>
        {/* Calendar 卡片 */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 220 }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111' }}>October 2025</Typography>
            <CalendarMonthIcon sx={{ color: '#E20074', fontSize: 22 }} />
          </Box>
          <Box sx={{ width: '100%', mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#6A6A6A', fontWeight: 600, fontSize: 13, mb: 0.5 }}>
              <Box>Mo</Box><Box>Tu</Box><Box>We</Box><Box>Th</Box><Box>Fr</Box><Box>Sa</Box><Box>Su</Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {[
                [null, null, null, 1, 2, 3, 4],
                [5, 6, 7, 8, 9, 10, 11],
                [12, 13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24, 25]
              ].map((week, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  {week.map((day, j) => (
                    <Box key={j} sx={{
                      width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%', fontWeight: 600, fontSize: 14,
                      color: day === 8 ? '#fff' : '#111',
                      bgcolor: day === 8 ? '#E20074' : 'transparent',
                      transition: 'all 0.2s',
                    }}>{day || ''}</Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* 统计卡片区 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 3 }}>
        {/* Follow-up Needed */}
        <Box sx={{ position: 'relative', bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden', transition: 'all 0.2s', '&:hover': { boxShadow: '0 8px 32px 0 rgba(226,0,116,0.13)', transform: 'translateY(-2px) scale(1.03)' } }}>
          <Typography sx={{ fontSize: 32, fontWeight: 700, color: '#E20074', mb: 0.5 }}>6</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#111' }}>Follow-up Needed</Typography>
          <Typography sx={{ fontSize: 14, color: '#6A6A6A', fontWeight: 500 }}>Patients</Typography>
          <Box component="img" src={PatientsIcon} alt="icon" sx={{ position: 'absolute', right: 12, bottom: 8, width: 60, height: 60, opacity: 0.13, pointerEvents: 'none', userSelect: 'none' }} />
        </Box>
        {/* Today's Session */}
        <Box sx={{ position: 'relative', bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden', transition: 'all 0.2s', '&:hover': { boxShadow: '0 8px 32px 0 rgba(226,0,116,0.13)', transform: 'translateY(-2px) scale(1.03)' } }}>
          <Typography sx={{ fontSize: 32, fontWeight: 700, color: '#E20074', mb: 0.5 }}>5</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#111' }}>Today's Session</Typography>
          <Typography sx={{ fontSize: 14, color: '#6A6A6A', fontWeight: 500 }}>Assessments</Typography>
          <Box component="img" src={OverviewIcon} alt="icon" sx={{ position: 'absolute', right: 12, bottom: 8, width: 60, height: 60, opacity: 0.13, pointerEvents: 'none', userSelect: 'none' }} />
        </Box>
        {/* Active Patients */}
        <Box sx={{ position: 'relative', bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden', transition: 'all 0.2s', '&:hover': { boxShadow: '0 8px 32px 0 rgba(226,0,116,0.13)', transform: 'translateY(-2px) scale(1.03)' } }}>
          <Typography sx={{ fontSize: 32, fontWeight: 700, color: '#E20074', mb: 0.5 }}>12</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#111' }}>Active Patients</Typography>
          <Typography sx={{ fontSize: 14, color: '#6A6A6A', fontWeight: 500 }}>Patients</Typography>
          <Box component="img" src={AppIcon} alt="icon" sx={{ position: 'absolute', right: 12, bottom: 8, width: 60, height: 60, opacity: 0.13, pointerEvents: 'none', userSelect: 'none' }} />
        </Box>
      </Box>
      {/* 内容区：Today's Appointment + Prioritized Patients */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3 }}>
        {/* Today's Appointment - 左侧大卡片 */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)', p: 3, minWidth: 0, transition: 'all 0.2s', '&:hover': { boxShadow: '0 8px 32px 0 rgba(226,0,116,0.13)', transform: 'translateY(-1px) scale(1.01)' } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#111' }}>Today's Appointment</Typography>
            <Typography sx={{ fontSize: 14, color: '#E20074', fontWeight: 600, cursor: 'pointer' }}>View All</Typography>
          </Box>
          {/* 预约列表（每行卡片化+单排+自适应字体，无省略） */}
          <Box sx={{ overflowX: 'auto' }}>
            {[{ time: '11:30 AM', name: 'John Doe', phase: 'Rehab Phase: Mid', note: 'Monthly checkup', arrived: true }, { time: '12:30 AM', name: 'Jennifer P', phase: 'Rehab Phase: Mid', note: 'Monthly checkup', arrived: true }, { time: '14:30 AM', name: 'Mark Lee', phase: 'Rehab Phase: Mid', note: 'Monthly checkup', arrived: true }, { time: '15:30 AM', name: 'Monica Wang', phase: 'Rehab Phase: Mid', note: 'Monthly checkup', arrived: true }].map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 1.5fr 2fr 1fr',
                  alignItems: 'center',
                  border: '1px solid #E5E5E5',
                  borderRadius: 2,
                  bgcolor: '#fff',
                  p: { xs: 0.8, sm: 1.5 },
                  mb: 2,
                  boxShadow: 0,
                  transition: 'all 0.2s',
                  '&:hover': { boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)', background: '#F9F9F9' },
                  minWidth: 0,
                  overflowX: 'auto'
                }}
              >
                <Typography sx={{ fontWeight: 400, color: '#6A6A6A', fontSize: { xs: 9, sm: 11, md: 12 }, whiteSpace: 'nowrap', textAlign: 'left' }}>{item.time}</Typography>
                <Typography sx={{ fontWeight: 400, color: '#111', fontSize: { xs: 9, sm: 11, md: 12 }, whiteSpace: 'nowrap', textAlign: 'left' }}>{item.name}</Typography>
                <Typography sx={{ color: '#111', fontSize: { xs: 9, sm: 11, md: 12 }, whiteSpace: 'nowrap', textAlign: 'left' }}>{item.phase}</Typography>
                <Typography sx={{ color: '#111', fontSize: { xs: 9, sm: 11, md: 12 }, whiteSpace: 'nowrap', textAlign: 'left' }}>{`Note: ${item.note}`}</Typography>
                <Typography sx={{ color: '#111', fontSize: { xs: 9, sm: 11, md: 12 }, whiteSpace: 'nowrap', textAlign: 'left' }}>{'Arrived'}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/* Prioritized Patients - 右侧窄卡片 */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)', p: 3, minWidth: 0, transition: 'all 0.2s', '&:hover': { boxShadow: '0 8px 32px 0 rgba(226,0,116,0.13)', transform: 'translateY(-1px) scale(1.01)' } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#111' }}>Prioritized Patients</Typography>
            <Typography sx={{ fontSize: 14, color: '#E20074', fontWeight: 700, cursor: 'pointer' }}>View All</Typography>
          </Box>
          {/* 表头flex布局，无背景色，缩小字号加粗，三项一排 */}
          <Box sx={{ display: 'flex', fontWeight: 700, fontSize: { xs: 11, sm: 12, md: 13 }, color: '#111', mb: 2, px: { xs: 0, sm: 2 }, whiteSpace: 'nowrap' }}>
            <Box sx={{ flex: 2, px: { xs: 0, sm: 2 } }}>Name</Box>
            <Box sx={{ flex: 3, px: { xs: 0, sm: 2 } }}>Action</Box>
            <Box sx={{ flex: 2, px: { xs: 0, sm: 2 } }}>Last Exercise</Box>
          </Box>
          {/* 数据行：白底圆角卡片，每行有间距，responsive 字号和 Today's Appointment 一致 */}
          {[
            { name: 'John Doe', action: 'Review Progress', last: '12 Days' },
            { name: 'John Doe', action: 'Send Reminder', last: '9 Days' },
            { name: 'John Doe', action: 'Send Reminder', last: '8 Days' },
            { name: 'John Doe', action: 'Send Reminder', last: '7 Days' }
          ].map((row, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: '0 0 0 1px #ececec',
                px: { xs: 0, sm: 2 },
                py: { xs: 1, sm: 2 },
                mb: 2,
                fontSize: { xs: 10, sm: 12 },
                minWidth: 0,
                gap: 0,
                overflowX: 'auto'
              }}
            >
              <Box sx={{ flex: 2, color: '#111', px: { xs: 0, sm: 2 }, minWidth: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>{row.name}</Box>
              <Box sx={{ flex: 3, color: '#111', px: { xs: 0, sm: 2 }, minWidth: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>{row.action}</Box>
              <Box sx={{ flex: 2, color: '#111', px: { xs: 0, sm: 2 }, minWidth: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>{row.last}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Overview; 