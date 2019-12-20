import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [ credentials, setCredentials ] = useState({ username: '', password: '' })

  const handleChanges = event => {
    setCredentials(
      {...credentials, [event.target.name]: event.target.value}
    )
    console.log('new credentials from login component', credentials);
  }

  const login = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.payload);
        props.history.push('/bubbles');
      })
      .catch(err=> console.log(err));
  }

  return (
    <form onSubmit={login}>
      <input 
        type="username" 
        name="username" 
        placeholder="username"
        value={credentials.username} 
        onChange={handleChanges} 
        />
      <input 
        type="password" 
        name="password"
        placeholder="password"
        value={credentials.password} 
        onChange={handleChanges}/>
      <button>Log In</button>
    </form>
  );  
};

export default Login;
