import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function SelectWeekdays({ handleWeekdays }) {
  const [weekday, setWeekday] = React.useState([]);

  const handleWeekdayChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedDays = typeof value === 'string' ? value.split(',') : value;
    setWeekday(selectedDays);
    handleWeekdays(selectedDays);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Weekdays</InputLabel>
        <Select
          id="demo-multiple-name"
          label="Weekdays"
          multiple
          value={weekday}
          onChange={handleWeekdayChange}
          input={<OutlinedInput label="Day" />}
        >
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
