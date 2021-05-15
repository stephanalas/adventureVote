import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function EventTimePickers(props) {
  const handleDepartureDateChange = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formatDate = month + '/' + day + '/' + year;
    console.log(formatDate);
    props.setDepartureDate(formatDate);
  };
  const handleReturnDateChange = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formatDate = month + '/' + day + '/' + year;
    props.setReturnDate(formatDate);
  };
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  const handleStartTimeChange = (time) => {
    props.setStartTime(formatAMPM(time));
  };
  const handleEndTimeChange = (time) => {
    props.setEndTime(formatAMPM(time));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <Grid item>
          <KeyboardDatePicker
            disablePast
            autoOk
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="depature-date"
            label="Departure Date"
            onChange={handleDepartureDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            autoOk
            margin="normal"
            variant="inline"
            id="return-date"
            label="Return Date"
            format="MM/dd/yyyy"
            onChange={handleReturnDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        <Grid item>
          {props.event ? (
            <KeyboardTimePicker
              margin="normal"
              id="start-time-picker"
              label="Start Time"
              autoOk
              onChange={handleStartTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          ) : null}
          {props.event ? (
            <KeyboardTimePicker
              autoOk
              margin="normal"
              id="end-time-picker"
              label="End Time"
              onChange={handleEndTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          ) : null}
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
