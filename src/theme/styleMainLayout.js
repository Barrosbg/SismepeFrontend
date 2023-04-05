import { useTheme } from '@mui/material/styles';

const drawerWidth = 280;

const styles = (theme) => ({
  root: {
    [theme.breakpoints.down('lg')]: {
      display: 'block', 
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block', 
    },
    [theme.breakpoints.down('xl')]: {
      display: 'block', 
    },
    [theme.breakpoints.up('md')]: {
      display: 'block', 
      marginLeft: 48
    },    
  },
  theme: useTheme(),
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#3c8dbc',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: '#222d32',
    color: '#b8c7ce'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(0),
    backgroundColor: 'white',
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#222d32',
      width: theme.spacing(6) + 1,
    },
    [theme.breakpoints.down('xl')]: {
      width: theme.spacing(0), 
    },
    background: '#222d32',
    color: '#b8c7ce'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(1, 3),
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bolder',
    minHeight: 48,
  },
  avatarOpen:{
    margin: theme.spacing(2),
  },
  avatarClose:{
  },
  toolbarHidden: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    minHeight: 48,
  },
  content: {
    flexGrow: 1,
    minHeight: '100vh'
  },
  menuIcons:{
    color: '#b8c7ce',
    fontSize: '1rem'
  }

});

export default styles;


