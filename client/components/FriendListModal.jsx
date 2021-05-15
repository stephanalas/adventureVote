import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Paper, Typography } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import List from '@material-ui/core/List';
import FriendLineItem from './FriendLineItem';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
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
  },
}));

export default connect((state) => state)(function FriendListModal(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [attendees, setAttendees] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    const attendeesList = [];
    for (let attender in attendees) {
      if (attendees[attender]) attendeesList.push(attender);
    }
    const newAttendeeList = props.user.user.friends.filter((friend) => {
      if (attendeesList.includes(friend.username)) return friend;
    });
    props.setSelectedAttendees(newAttendeeList.concat(props.selectedAttendees));
    setOpen(false);
  };
  let friends;
  if (props.user.user) {
    friends = props.user.user.friends;
  } else friends = [];
  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Add Friends to trip
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            <Typography id="transition-modal-title">
              <PeopleIcon />
              Friends
              <Button onClick={handleClick}>Add friends</Button>
            </Typography>
            <List dense className={classes.root}>
              {friends.map((friend) => (
                <FriendLineItem
                  friend={friend}
                  key={friend.id}
                  setAttendees={setAttendees}
                  attendees={attendees}
                />
              ))}
            </List>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
});
