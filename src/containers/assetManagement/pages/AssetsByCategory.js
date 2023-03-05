import {
  Box, Collapse, IconButton, List, ListItemButton, Stack, Tooltip,
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RefreshIcon from '@mui/icons-material/Refresh';
import moment from 'moment';
import { useState } from 'react';
import RoundedPaper from '../../../components/common/RoundedPaper';
import { EXPENDITURE } from '../../../utils/constants/categories';

function AssetsByCategory() {
  const [open, setOpen] = useState('');
  const today = moment();

  const handleClick = (type) => {
    if (open === type) {
      setOpen('');
    } else {
      setOpen(type);
    }
  };

  return (
    <>
      <RoundedPaper>
        <Box sx={{ fontWeight: 'bold' }}>{`${today.format('M월')} Goal`}</Box>
        <Box sx={{
          typography: 'h4', fontWeight: 'bold', color: 'primary.main', my: 1,
        }}
        >
          xxxxxxx원
          <Tooltip
            open
            arrow
            placement="top"
            title="목표액 수정하기"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'primary.main',
                },
              },
              arrow: {
                sx: {
                  '&::before': {
                    backgroundColor: 'primary.main',
                  },
                },
              },
            }}
          >
            <IconButton color="primary" onClick={() => console.log('modify')} sx={{ p: 0 }}>
              <BorderColorIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Stack direction="row" justifyContent="space-between" sx={{ color: '#979797', fontSize: '14px' }}>
          <Box>지난 달 지출</Box>
          <Box>xxxxxxx원</Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ color: '#979797', fontSize: '14px' }}>
          <Box>최근 3개월 평균 지출</Box>
          <Box>xxxxxxx원</Box>
        </Stack>
      </RoundedPaper>

      <Stack direction="row" justifyContent="space-between" sx={{ fontSize: '14px' }}>
        <Box sx={{ color: '#979797' }}>설정 가능한 카테고리별 자산</Box>
        <Box sx={{ color: 'primary.main' }}>xxxxxxx원</Box>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <IconButton color="primary" onClick={() => console.log('refresh')} sx={{ p: 0 }}>
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Box>

      <List>
        {EXPENDITURE.nested.map((category) => (
          <>
            <ListItemButton onClick={() => handleClick(category.type)}>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <Box>
                  {category.type}
                </Box>
                xxxxxxx원
              </Stack>
            </ListItemButton>
            <Collapse in={open === category.type} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.categories.map((c) => (
                  <ListItemButton>
                    <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', color: 'primary.main' }}>
                      <Box>
                        {c}
                      </Box>
                      xxxxxxx원
                    </Stack>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

          </>
        ))}
      </List>
    </>
  );
}

export default AssetsByCategory;
