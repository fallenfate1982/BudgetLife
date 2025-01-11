import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

// Components
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#fff',
    color: '#000',
    minHeight: '60px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
  },
  logo: {
    fontFamily: 'Georgia, serif',
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '#000',
    textDecoration: 'none',
  },
  navLink: {
    color: '#1A1F36',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'transparent',
      opacity: 0.8,
    },
  },
  authButtons: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  signUpButton: {
    backgroundColor: '#000',
    color: '#fff',
    textTransform: 'none',
    padding: '8px 16px',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: '#000',
      opacity: 0.9,
    },
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#1A1F36',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1F36',
      secondary: '#697386',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Georgia, serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: 'Georgia, serif',
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: 'Georgia, serif',
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: 'Georgia, serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  spacing: factor => `${0.25 * factor}rem`,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    // ... keep existing shadows
  ],
});

const Header = () => {
  const classes = useStyles();
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" elevation={0} className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Typography component="a" href="/" className={classes.logo}>
          BudgetLife
        </Typography>
        {user ? (
          <Box className={classes.authButtons}>
            <Button href="/dashboard" className={classes.navLink}>
              Dashboard
            </Button>
            <Button onClick={logout} className={classes.navLink}>
              Log out
            </Button>
          </Box>
        ) : (
          <Box className={classes.authButtons}>
            <Button href="/login" className={classes.navLink}>
              Log in
            </Button>
            <Button href="/register" className={classes.signUpButton}>
              Sign up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
