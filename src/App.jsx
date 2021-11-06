import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Movies from './components/Movies/Movies';
import Navbar from './components/Navbar/Navbar';
import People from './components/People/People';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Register from './components/Register/Register';
import Tv from './components/Tv/Tv';
import {  MoviesContextProvider } from './MoviesContext';


function App() {

  let history =  useHistory();

  const [loginUser, setLoginUser] = useState(null);

  
  function getUserInfo(){
      let encodedToken =localStorage.getItem('userToken');
      let userData = jwtDecode(encodedToken);
      setLoginUser(userData)
  }


  function logOut(){
    localStorage.removeItem("userToken");
    setLoginUser(null);
    history.push('/login');

  }

  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      getUserInfo();
    }
  },[])

  return (
    <div>
      
      <Navbar loginUser={loginUser} logOut={logOut}/>
      <div className="container"> 
        <Switch>
    
          <ProtectedRoute path='/movies' component={Movies} contex={MoviesContextProvider}/>
          <ProtectedRoute path='/tv' component={Tv} contex={MoviesContextProvider}/>
          <ProtectedRoute path='/people' component={People} contex={MoviesContextProvider}/> 
          <ProtectedRoute path='/home' component={Home} loginUser={loginUser} contex={MoviesContextProvider}/> 
          <ProtectedRoute path='/moviedetails' component={MovieDetails}/> 
          <Route path='/register' render={(props) => <Register {...props} />} />
          <Route path='/login' render={(props) => <Login {...props} getUserInfo={getUserInfo} />} />
          <Redirect from='/' exact to='/home' />

        </Switch>
      </div>
      
    </div>
  );
}

export default App;
