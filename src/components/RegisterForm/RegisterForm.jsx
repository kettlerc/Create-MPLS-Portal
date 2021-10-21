import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, TextField, Typography, Paper } from '@mui/material';


function RegisterForm() {

  //UseDispatch and UseHistory hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // local state for form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');

  //Selectors to get errors and registration code from Redux stores
  const errors = useSelector((store) => store.errors);
  const settings = useSelector((store) => store.settings);


  //Function for registering new user and storing their credentials in the database
  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
          first_name: firstName,
          last_name: lastName,
          registrationCode: registrationCode,
        },
    });
  }; // end registerUser

  //Navigates back to login page
  const cancelReg = () => {
    history.push('/login')
  }

  return (
    <center>
      <Paper elevation={24} sx={{ width: 350, marginTop: 5 }}>
        <form className="formPanel" onSubmit={registerUser}>
          <Typography variant="h4">REGISTER USER</Typography>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <div>
            <label htmlFor="username">
              <TextField
                variant="outlined"
                name="username"
                placeholder="username"
                size="small"
                sx={{ margin: 1 }}
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <TextField
                variant="outlined"
                type="password"
                name="password"
                placeholder="password"
                size="small"
                sx={{ margin: 1 }}
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="firstName">
              <TextField
                variant="outlined"
                name="firstName"
                placeholder="first name"
                size="small"
                sx={{ margin: 1 }}
                value={firstName}
                required
                onChange={(event) => setFirstName(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="lastName">
              <TextField
                variant="outlined"
                name="lastName"
                placeholder="last name"
                size="small"
                sx={{ margin: 1 }}
                value={lastName}
                required
                onChange={(event) => setLastName(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="registrationCode">
              <TextField
                variant="outlined"
                name="registrationCode"
                placeholder="registration code"
                size="small"
                sx={{ margin: 1 }}
                value={registrationCode}
                required
                onChange={(event) => setRegistrationCode(event.target.value)}
              />
            </label>
          </div>
          <div>
            <Button
              variant="outlined"
              size="large"
              sx={{ margin: 1 }}
              className="btn"
              onClick={cancelReg}
            >Cancel
            </Button>
            <Button 
              variant="contained"
              size="large"
              sx={{ margin: 1 }}
              className="btn" 
              type="submit" 
              name="submit" 
              value="Register" 
              >Submit & Login
            </Button>
          </div>
        </form>
      </Paper>
    </center>
  );
}

export default RegisterForm;
