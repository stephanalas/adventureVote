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
    const day = date.getDay();
    const year = date.getFullYear();
    const formatDate = month + '/' + day + '/' + year;
    props.setDepartureDate(formatDate);
  };
  const handleReturnDateChange = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const year = date.getFullYear();
    const formatDate = month + '/' + day + '/' + year;
    props.setReturnDate(formatDate);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="depature-date"
          label="Departure Date"
          // value={new Date()}
          onChange={handleDepartureDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="return-date"
          label="Return Date"
          format="MM/dd/yyyy"
          // value={new Date()}
          onChange={handleReturnDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
