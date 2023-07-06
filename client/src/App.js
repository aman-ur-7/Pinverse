import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Auth from './components/Auth/Auth';

const App = () => {

  return (
  <GoogleOAuthProvider clientId={`${process.env.REACT_APP_API_KEY}`}>
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
        
        <Footer />
      
      </Container>
    </BrowserRouter>
  </GoogleOAuthProvider>
  );
};
export default App;