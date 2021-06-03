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
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: '#7c43bd',
    },
  },
});

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className='App'>
          <Navbar></Navbar>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/block' />} />
            <Route exact path='/block'>
              <Block />
            </Route>
            <Route exact path='/txn/:id?'>
              <Transaction />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
