import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { List, ListItemText, ListItem } from '@material-ui/core';
import WidgetsIcon from '@material-ui/icons/Widgets';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    grow: {
      flexGrow: 0.9,
    },
    list: {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    },
    link: {
      margin: theme.spacing(1),
    },
    icon: {
      color: fade(theme.palette.common.white, 0.85),
    },
  })
);

const Navbar = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Block Explore
          </Typography>
          <div className={classes.grow} />
          <List className={classes.list}>
            <ListItem
              button
              component={NavLink}
              to='/block'
              className={classes.link}
              activeClassName='Mui-selected'
              exact
            >
              <ListItemIcon>
                <WidgetsIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={'Blocks'} />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to='/txn?'
              className={classes.link}
              activeClassName='Mui-selected'
              exact
            >
              <ListItemIcon>
                <SendIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={'Transactions'} />
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
