import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AttendeeCard from './AttendeeCard';
import TripLineItem from './TripLineItem';
import { makeStyles } from '@material-ui/core';
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

export default function TripSection(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const sectionName = props.sectionName || '';
  const handleClick = () => {
    setOpen(!open);
  };
  console.log('tripscetion', props);
  const trips = props.trips || [];
  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={sectionName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {trips.map((trip) => {
            return (
              <ListItem button className={classes.nested}>
                <TripLineItem trip={trip} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
