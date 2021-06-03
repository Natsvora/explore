import React from 'react';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Transaction from './component/Transaction/Transaction';
import Block from './component/Block/Block';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#1976d2',
    },
    background: {
      default: '#f7f7f7',
    },
  },
  typography: {
    fontSize: 16,
  },
});

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/block' />} />
          <Route exact path='/block'>
            <Block />
          </Route>
          <Route path='/txn/:id?'>
            <Transaction />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
