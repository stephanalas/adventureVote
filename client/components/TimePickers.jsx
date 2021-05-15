import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function TimePickers(props) {
  const handleDepartureDateChange = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formatDate = month + '/' + day + '/' + year;
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
  let user;
  if (props.user) {
    user = props.user.user;
  } else user = {};
  const trip = props.trip || {};
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <Grid item>
          <KeyboardDatePicker
            inputValue={props.create ? props.departureDate : trip.departureDate}
            disablePast
            autoOk
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="depature-date"
            label="Departure Date"
            disabled={trip.creatorId !== user.id}
            onChange={handleDepartureDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            inputValue={props.create ? props.returnDate : trip.returnDate}
            autoOk
            disabled={trip.creatorId !== user.id}
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
              inputValue={props.startTime}
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
              inputValue={props.endTime}
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
