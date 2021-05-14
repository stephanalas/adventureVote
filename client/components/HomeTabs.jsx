import React from 'react';
import {
  Paper,
  Grid,
  Typography,
  Button,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  List,
} from '@material-ui/core';
import NotificationLineItem from './NotificationLineItem';
import { connect } from 'react-redux';
const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: 'green',
    height: '100%',
    marginTop: '3rem',
    marginLeft: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  typography: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: '100%',
    height: '100%',
  },
  option: {
    backgroundColor: 'white',
    height: '4rem',
    margin: '0',
  },
}));
const otherStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '300px',
    maxWidth: '400px',
    overflow: 'auto',
    width: '100%',
    zIndex: '100',
  },
}));

export default connect((state) => state)((props) => {
  const classes = useStyles();
  const modal = otherStyles();
  const [open, setOpen] = React.useState(false);
  let notifications, invites, friendRequests;
  if (props.user.user) notifications = props.user.notifications;
  else notifications = {};
  invites = notifications.tripInvites || [];
  friendRequests = notifications.friendRequests || [];
  const handleOpen = () => {
    setOpen(true);
    console.log(open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper className={classes.paper}>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button onClick={props.redirectCreateTrip} className={classes.button}>
            Create A Trip
          </Button>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button} onClick={props.handleFriendsClick}>
            My friends
          </Button>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button}>Past Trips</Button>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button} onClick={handleOpen}>
            Notifications
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={modal.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Paper className={modal.paper}>
                <Typography id="transition-modal-title">
                  Notifications
                </Typography>
                <List dense className={modal.root}>
                  {friendRequests.length
                    ? friendRequests.map((request) => (
                        <NotificationLineItem notification={request} />
                      ))
                    : null}
                  {invites.length
                    ? invites.map((invite) => (
                        <NotificationLineItem notication={invite} />
                      ))
                    : null}
                  hello
                </List>
              </Paper>
            </Fade>
          </Modal>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button}>Events</Button>
        </Typography>
      </Grid>
      <Grid item className={classes.option}>
        <Typography className={classes.typography}>
          <Button className={classes.button}>Settings</Button>
        </Typography>
      </Grid>
    </Paper>
  );
});
