import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/dist/locale/ko";
import { CalendarBox } from "@pages/Home/next-components/ScheduleCalendar/Calendar/Calendar.styles.ts";

export interface CalendarProps {
  value: string;
  handleChange: (newValue: moment.Moment | null) => void;
}

function Calendar({ value, handleChange }: CalendarProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CalendarBox>
        <DateCalendar
          value={moment(value)}
          onChange={handleChange}
          slotProps={{ calendarHeader: { sx: { display: "none" } } }}
        />
      </CalendarBox>
    </LocalizationProvider>
  );
}

export default Calendar;
