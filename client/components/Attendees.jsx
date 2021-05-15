import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AttendeeCard from './AttendeeCard';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default connect((state) => state)(function Attendees(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  // const [readyAttendees, setReadyAttendees] = useState(props.attendees);
  const handleClick = () => {
    setOpen(!open);
  };
  const attendees = props.attendees;
  let update;
  if (props.update) {
    update = props.update;
  } else update = false;
  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Trip Attendees" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {attendees
            ? attendees.map((attendee) => {
                return (
                  <ListItem button className={classes.nested}>
                    <AttendeeCard
                      attendee={attendee}
                      key={attendee.id}
                      update={update}
                    />
                  </ListItem>
                );
              })
            : null}
        </List>
      </Collapse>
    </List>
  );
});
