import { green, purple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2BAE66FF',
    },
    secondary: {
      main: '#FCF6F5FF',
    },
  },
  status: {
    danger: 'orange',
  },
});

export default theme;
