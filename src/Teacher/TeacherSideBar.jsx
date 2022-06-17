import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import {Avatar} from '@mui/material'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard'
import ChapterControl from './ChapterControl/ChapterControl';
import MarksControl from './MarksControl/MarksControl'
import {useState,useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 2px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 2px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const TeacherSideBar = () => {
  const [browse,setBrowse] = useState('Dashboard');

  function broswsingPage(page) {
    switch(page) {
      case 'Dashboard':
        return  <TeacherDashboard />
      case 'Chapters management':
        return  <ChapterControl />
      case 'Marks management':
        return <MarksControl />
      default: 
        return
    }
  }

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentTeacher,setCurrentUser] = useState({})
    useEffect(() => {
      if(localStorage.getItem('loginStatus')){
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
        setCurrentUser(loginStatus.currentUser);
      }
    },[])
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const [exitOpen,setExitOpen] = React.useState(false);
    const handleClickOpen = () => {
      setExitOpen(true);
    };
  
    const handleClose = () => {
      setExitOpen(false);
    };

    const handleExit = async () => {
      const loginSucceeded = false
      localStorage.setItem('loginStatus',JSON.stringify({loginSucceeded}));
      handleClose();
      window.location.reload();
  }
  
    return (
      <Box sx={{ display: 'flex' }}>
        <Drawer
        PaperProps={{
          sx: {
          backgroundColor: "#007AFF",
          background: 'linear-gradient(177.14deg, #007AFF 78.29%, #BBE1FA 105.35%)',
          color: "white",
          }
      }}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
        },
        }}
        anchor="left"
        variant="permanent" open={open}>
        <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "auto",
                marginLeft:"auto",
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          <DrawerHeader>
            {open &&<IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>}
          </DrawerHeader>
          <Toolbar style={{margin:"-5px"}}>
                <Avatar 
                  sx={{ bgcolor: 'white',color: '#266fff',width:32,height:32}}     
                  alt="admin image"
                  src={currentTeacher?currentTeacher.profileImage?`https://schoolsystemmanagement-production-9724.up.railway.app/teacher/profile-images/${currentTeacher.profileImage}`:'':''}
                />
                <Typography style={{ marginLeft:'20px'}}>
                    {currentTeacher.name + ' ' + currentTeacher.lastName}
                </Typography>
            </Toolbar>
          <Divider />
          <List
          sx={{
          '& .MuiListItem-root': {
              '&, & .MuiListItemIcon-root': {
                  color: 'white',
              },
          },
          //change the background color of item when it clicked
          '& .MuiListItem-root:focus': {
              bgcolor: 'white',
              borderRadius: 2,
              '&, & .MuiListItemIcon-root': {
                  color: '#266fff',
              },
          },
          }}>
            {['Dashboard','Chapters management','Marks management'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={e => setBrowse(text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 ? <DashboardIcon /> : index === 1 ? <BookmarksIcon/> : <LibraryBooksIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List style={{ marginTop:'auto',marginBottom:'10px'}}
          sx={{
            '& .MuiListItem-root': {
                '&, & .MuiListItemIcon-root': {
                    color: 'white',
                },
            },
            //change the background color of item when it clicked
            '& .MuiListItem-root:focus': {
                bgcolor: 'white',
                borderRadius: 2,
                '&, & .MuiListItemIcon-root': {
                    color: '#266fff',
                },
            },
            }}>
              
            {['Exit'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <LogoutIcon onClick={handleClickOpen}/>
                    <Dialog
                        open={exitOpen}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Exit
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            are you sure to Exit the application?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleExit} autoFocus>
                            Confirm
                        </Button>
                        </DialogActions>
                    </Dialog>
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} onClick={handleClickOpen}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {broswsingPage(browse)}
        </Box>
      </Box>
    );
}

export default TeacherSideBar
