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
    console.log(date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formatDate = month + '/' + day + '/' + year;
    props.setDepartureDate(formatDate);
    console.log('dates should be saved in state');
  };
  const handleReturnDateChange = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formatDate = month + '/' + day + '/' + year;
    props.setReturnDate(formatDate);
    console.log('dates should be saved in state');
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          inputValue={props.departureDate}
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
          inputValue={props.returnDate}
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
    </MuiPickersUtilsProvider>
  );
}
