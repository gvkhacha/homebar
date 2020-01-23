/*
Layout template copied from "Mini Drawer" example on Material UI.
*/
import React from 'react';
import clsx from 'clsx';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../actions/userActions';

import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Person from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    marginRight: 36,
  },
  hide: {
    display: 'none',
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
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuText: {
    textAlign: 'left',
    width: '100%',
    marginLeft: '10px'
  }
}));


const SidebarList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const redirect = (href) => {
    history.push(href);
  }
  const items = [
    //first section of items, likely main navigation
    [
      {
        text: 'Inbox', 
        click: () => redirect(''), 
        iconElement: <InboxIcon />
      },
      {
        text: 'Mail', 
        click: () => redirect('login'), 
        iconElement: <MailIcon />
      }
    ],
    [
      {
        text: 'All Mail', 
        click: () => redirect(''), 
        iconElement: <InboxIcon />
      },
      {
        text: 'Spam', 
        click: () => redirect('login'), 
        iconElement: <MailIcon />
      },
      {
        text: 'Outbox',
        click: () => redirect(''),
        iconElement: <InboxIcon />
      }
    ],
    [
      {
        text: 'Profile',
        click: () => redirect(''),
        iconElement: <Person />
      },
      {
        text: 'Settings',
        click: () => redirect(''),
        iconElement: <Settings />
      },
      {
        text: 'Logout',
        click: () => dispatch(logoutUser()),
        iconElement: <ExitToApp />
      }
    ]
  ]

  return items.map((list, index) => (
    <>
      <List>
        {list.map((obj) => (
          <ListItem button key={obj.text} onClick={obj.click}>
            <ListItemIcon>{obj.iconElement}</ListItemIcon>
            <ListItemText primary={obj.text} />
          </ListItem>
        ))}
      </List>
      {index === items.length - 1 ? <></> : <Divider /> }
    </>
  ))
}


const Layout = ({children}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            HomeBar
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography variant='h6' className={classes.menuText}>Menu</Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SidebarList />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}


export default Layout;