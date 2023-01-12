import {
  Box, Stack, Typography,
} from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectDate, selectSchedules } from '../../../utils/redux/schedule/scheduleSlice';
import ScheduleCard from './ScheduleCard';

function ScheduleList() {
  const schedules = useSelector(selectSchedules);
  const date = moment(useSelector(selectDate)).format('YYYY-MM-DD');

  return (
    <>
      {schedules.filter((el) => el.date === date).length === 0 && (
        <Stack
          justifyContent="center"
          alignItems="center"
        >
          <Box my={5}>
            <Typography>
              {date}
              에 등록된 일정이 없습니다!
            </Typography>
          </Box>
        </Stack>
      )}
      {
        schedules
          .filter((el) => el.date === date)
          .map((el) => (
            <ScheduleCard
              schedule={el}
              key={Math.random()}
            />
          ))
      }
    </>
  );
}

export default ScheduleList;
