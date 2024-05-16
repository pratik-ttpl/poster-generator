import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomePageStyle from '../../assets/css/homePageStyle/HomePageStyle';

const HomePageHeader = () => {
    const classes = HomePageStyle();

  return (
    <AppBar className={classes.header} position="static" >
      <Toolbar>
        <Typography variant="h6">App Header</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HomePageHeader;
