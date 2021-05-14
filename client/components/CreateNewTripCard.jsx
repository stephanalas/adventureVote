import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  makeStyles,
} from '@material-ui/core';
const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    height: '10rem',
  },
}));
export default (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} raised>
      <CardContent>
        <Typography>Create a new Trip!</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={props.redirectCreateTrip}
          size="small"
          variant="contained"
        >
          create Trip
        </Button>
      </CardActions>
    </Card>
  );
};
