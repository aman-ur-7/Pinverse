import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

// import memories from '../../images/star4.png';
import memoriesLogo from '../../images/star4.png';
import memoriesText from '../../images/pinverseText1.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
  
    // const logout = () => {
    //   dispatch({ type: actionType.LOGOUT });
  
    //   history.push('/auth');
  
    //   setUser(null);
    // };
  
    // useEffect(() => {
    //   const token = user?.token;
  
    //   if (token) {
    //     const decodedToken = decode(token);
  
    //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    //   }
  
    //   setUser(JSON.parse(localStorage.getItem('profile')));
    // }, [location]);

    const logout = useCallback(() => {
      dispatch({ type: actionType.LOGOUT });
  
      history.push('/auth');
  
      setUser(null);
    }, [dispatch, history]);
  
    useEffect(() => {
      const token = user?.token;
  
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, logout, user?.token]);
              
    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          {/* <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" /> */}
          <img component={Link} to="/" src={memoriesText} alt="icon" height="55px" />
          <img className={classes.image} src={memoriesLogo} alt="icon" height="55px" />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user?.result ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Navbar;