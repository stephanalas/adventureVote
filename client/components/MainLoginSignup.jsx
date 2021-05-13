import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './Login';
import SignUp from './SignUp';
import { CardMedia, Container } from '@material-ui/core';
import './style.css';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    padding: '0',
    backgroundImage: 'url(forest.jpg)',
    backgroundSize: 'cover',
    resize: 'both',
  },
  section: {
    backgroundColor: theme.palette.background.paper,
    width: '30rem',
    height: '27rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    padding: '0',
    position: 'relative',
    left: '2rem',
    top: '2rem',
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    if (index === 2) {
      setValue(1);
    } else {
      setValue(index);
    }
  };
  return (
    <Container
      component="div"
      maxWidth="xs"
      id="homepage-container"
      className={classes.root}
      maxWidth={false}
    >
      <Container component="section" maxWidth="xs" className={classes.section}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Login history={props.history} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <SignUp history={props.history} />
          </TabPanel>
        </SwipeableViews>
      </Container>
    </Container>
  );
}
