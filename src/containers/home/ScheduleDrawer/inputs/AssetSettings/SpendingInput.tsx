import {
  Button, Stack, TextField, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { SCHEDULE_DRAWER } from '../../../../../domain/constants/schedule';
import { selectSchedule } from '../../../../../app/redux/slices/scheduleSlice';
import { updateSchedule, updateSpendingType } from '../../domain/schedule';
import { useAppDispatch } from '../../../../../app/redux/hooks';

function SpendingInput({ mode }: { mode: string }) {
  const dispatch = useAppDispatch();
  const schedule = useSelector(selectSchedule);

  const changeSpendingType = () => {
    updateSpendingType(dispatch, schedule);
  };
  const changeSchedule = (state: React.MouseEvent<HTMLButtonElement>) => {
    updateSchedule(dispatch, schedule, { target: { id: state.currentTarget.id, value: state.currentTarget.value }});
  };
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" p={1}>
      <Typography>{SCHEDULE_DRAWER.set_spending_title}</Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        {(mode === 'create') || (schedule?.type === SCHEDULE_DRAWER.type_plus)
          ? (
            <Button
              variant={schedule?.type === SCHEDULE_DRAWER.type_plus ? 'contained' : 'outlined'}
              id="type"
              value={SCHEDULE_DRAWER.type_plus}
              onClick={mode === 'create' ? changeSchedule : changeSpendingType}
              size="small"
              sx={{
                borderRadius: 5, minWidth: 0, width: '30px', height: '30px',
              }}
            >
              {SCHEDULE_DRAWER.type_plus}
            </Button>
          )
          : null}
        {(mode === 'create') || (schedule?.type === SCHEDULE_DRAWER.type_minus)
          ? (
            <Button
              variant={schedule?.type === SCHEDULE_DRAWER.type_minus ? 'contained' : 'outlined'}
              id="type"
              value={SCHEDULE_DRAWER.type_minus}
              onClick={mode === 'create' ? changeSchedule : changeSpendingType}
              size="small"
              sx={{
                borderRadius: 5, minWidth: 0, width: '30px', height: '30px',
              }}
            >
              {SCHEDULE_DRAWER.type_minus}
            </Button>
          )
          : null}
        <TextField
          id="expected_spending"
          value={schedule?.expected_spending}
          onChange={(e) => updateSchedule(dispatch, schedule, e)}
          label={SCHEDULE_DRAWER.expected_spending}
          type="number"
          onFocus={(e) => e.target.select()}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: '20vw' }}
          size="small"
          inputProps={{
            style: { textAlign: 'right' },
            min: 0,
          }}
        />
        <Typography>{SCHEDULE_DRAWER.won}</Typography>
      </Stack>
    </Stack>
  );
}
export default SpendingInput;
