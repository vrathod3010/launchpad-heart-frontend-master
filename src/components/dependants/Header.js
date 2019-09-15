import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Typography, makeStyles, Drawer, Divider, IconButton,Badge,Popover, List, ListItem,ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
import { LoginContext, LayoutContext } from 'contexts';
import { SideMenuItems } from './SideMenuItems';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
  menuButtonHidden: {
    display: 'none',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(6)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    margin: theme.spacing(1),
  }
}))

export const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { setAccessToken, setLoginStatus } = useContext(LoginContext)
  const { pageTitle } = useContext(LayoutContext)
  const [showPopOver,setShowPopOver] = useState(null);
  const [notifications, setNotifications] = useState([{patient:"Dave",condition:"Blood pressure high"},{patient:"John Doe",condition:"High fever"},
  {patient:"Sadia",condition:"Headache, Back pain etc"},{patient:"Imam",condition:"Insomnia"},{patient:"Safat",condition:"Heart Palpitations"},{patient:"Ancoln",condition:"Dead"}]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    window.localStorage.clear();
    setLoginStatus(false);
    setAccessToken('')
  }
  const openNotification = Boolean(showPopOver);
  const id = openNotification ? 'notification-popover' : undefined;
  
  let content = (
    <div style={{ display: "flex" }}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {pageTitle}
          </Typography>
          <IconButton color={"inherit"}
                                    onClick={(event)=>{setShowPopOver(event.currentTarget)}}
                                    aria-describedby={id}
                        >
                            <Badge badgeContent={notifications.length} color={"secondary"}>
                                <NotificationsIcon/>
                            </Badge>
            </IconButton>
            <Popover
                            id={id}
                            open={openNotification}
                            anchorEl={showPopOver}
                            onClose={()=>{setShowPopOver(null)}}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        ><List
                          style={{
                            width: '100%',
                            maxWidth: '20em'
                        }}
                          >
                              {notifications.map((obj,i)=>{
                                return <ListItem>
                                   <ListItemAvatar>
                                              <Avatar style={{margin:'10'}}>{obj.patient.charAt(0)}</Avatar>
                                          </ListItemAvatar>
                                          <ListItemText primary={obj.patient} secondary={obj.condition}/>
                                </ListItem>;
                              })}
                          </List></Popover>
          <IconButton color="inherit" onClick={() => logout()}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SideMenuItems />
      </Drawer>
    </div>
  )
  return content;
}
