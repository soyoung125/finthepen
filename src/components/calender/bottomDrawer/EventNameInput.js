import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';

function EventNameInput({ event, updateEvent }) {
  return (
    <FormControl fullWidth>
      <OutlinedInput
        id="name"
        startAdornment={<InputAdornment position="start">Event Name</InputAdornment>}
        value={event.name}
        onChange={updateEvent}
      />
    </FormControl>
  );
}
export default EventNameInput;
