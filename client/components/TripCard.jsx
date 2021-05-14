import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import deleteTrip from '../store/actions/deleteTrip';
import { connect } from 'react-redux';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      deleteTrip: (userId, tripId) => dispatch(deleteTrip(userId, tripId)),
    };
  }
)(function TripCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.trip.photo}
          title="trip-image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.trip.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.trip.location}
            {props.trip.departureDate}
            {props.trip.returnDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit Trip
        </Button>
        <Button
          onClick={() => props.deleteTrip(props.user.id, props.trip.id)}
          size="small"
          color="primary"
        >
          Delete Trip
        </Button>
      </CardActions>
    </Card>
  );
});
