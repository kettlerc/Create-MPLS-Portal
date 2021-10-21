import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Button, TextField, Typography, Paper } from '@mui/material';


function LoginForm() {

  //UseDispatch hook
  const dispatch = useDispatch();

  //UseSelector hook to access the errors from the Redux stores    
  const errors = useSelector(store => store.errors);

  //Local state for form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Function for checking if username and password match credentials in the database
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <center>
    <Paper elevation={24} sx={{ width: 350, marginBottom: 15 }}>
      <form className="formPanel" onSubmit={login}>
        <Typography variant="h4" sx={{ margin: 1 }}>LOGIN</Typography>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            <TextField
              label="Username"
              variant="outlined"
              sx={{ margin: 1 }}
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              sx={{ margin: 1 }}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <Button
            size="large"
            variant="contained"
            sx={{ margin: 1 }}
            type="submit"
            name="submit"
          >LOG IN</Button>      
        </div>
      </form>
    </Paper>
    </center>
  );
}

export default LoginForm;
