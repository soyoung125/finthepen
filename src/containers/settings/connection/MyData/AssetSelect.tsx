import {
    Box, Button, Stack, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, IconButton,
} from '@mui/material';
import { OrganizationInterface } from '@type/common';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface AssetSelectProps {
    selected: OrganizationInterface
}

const Img = styled('img')({
    padding: '5px',
    borderRadius: '50%',
    border: '1px solid var(--gray-scale-010, #DEE0E3)',
    display: 'block',
    width: '60px',
    height: '60px',
});

function AssetSelect({ selected }: AssetSelectProps) {

    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <Stack justifyContent="space-between">
                    <Box sx={{ fontSize: '22px', fontWeight: 700 }}>{selected.name}</Box>
                    <Box sx={{ color: 'var(--gray-scale-040, #8C919C)', fontSize: '15px' }}>{moment().locale('ko').format('YYYY M D a hh:mm')}</Box>
                </Stack>
                <Img alt={selected.name} src={selected.icon} />
            </Stack>

            <Tabs value={0} aria-label="basic tabs example">
                <Tab label="은행" />
            </Tabs>

            <List sx={{ padding: 0, borderTop: '1px solid var(--gray-scale-005, #F7F7F8)' }}>
                <ListItem
                    sx={{ borderBottom: '1px solid var(--gray-scale-005, #F7F7F8)' }}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <ArrowForwardIosIcon />
                        </IconButton>
                      }
                >
                    <ListItemText
                        primary="account name"
                        secondary="account"
                    />
                </ListItem>

                <ListItem
                    sx={{ borderBottom: '1px solid var(--gray-scale-005, #F7F7F8)' }}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <ArrowForwardIosIcon />
                        </IconButton>
                      }
                >
                    <ListItemText
                        primary="account name"
                        secondary="account"
                    />
                </ListItem>

                <ListItem
                    sx={{ borderBottom: '1px solid var(--gray-scale-005, #F7F7F8)' }}
                >
                    <ListItemIcon sx={{ minWidth: 0, padding: '6px', marginRight: '8px', borderRadius: '8px', background: 'var(--gray-scale-020, #C8CBD0)' }}>
                        <AddRoundedIcon sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="추가 또는 삭제"
                    />
                </ListItem>
            </List>
        </>
    );
}

export default AssetSelect;
