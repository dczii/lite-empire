import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { useGlobalContext } from '../providers/stateProvider' 
import { columnListTranslate } from '../data/filters'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const globalState = useGlobalContext()
  const { dispatch, state } = globalState;

  const visibleColumns = state.visibleColumns as IColumnList || []

  console.log(visibleColumns)

  function handleColumnVisibility(value: columnKeys, isChecked: boolean){
    dispatch({
      type: 'Set__Loading',
    })
    
    const newValues = {
      ...visibleColumns,
      [value]: !isChecked
    }

    dispatch({
      type: 'Set__Visible_Columns',
      data: newValues
    })
  }
  
  return (
    <>
      <AppBar position="fixed"  className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
        <Toolbar>
          <Typography variant="h4" noWrap className={classes.title}>
            Lite-Empire
          </Typography>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={() => setOpen(!open)}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button={false}>
            <Typography variant="h6" noWrap>
              Visible Columns
            </Typography>
          </ListItem>
          {Object.keys(visibleColumns).map((text: any, idx: any) => {
            const columnText = text as columnKeys
            const isChecked = visibleColumns[columnText]
            const translatedText = columnListTranslate[columnText]
            return (
              <ListItem button key={idx} 
                onClick={() => handleColumnVisibility(columnText, isChecked)}
              >
                <Checkbox
                    checked={isChecked}
                    onChange={() =>{}}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                <ListItemText primary={translatedText} />
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    </>
  );
}
