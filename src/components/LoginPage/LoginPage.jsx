import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';


function LoginPage() {

  //UseHistory hook for navigating to another page
  const history = useHistory();

  return (
    <div>
      <img src="design_a.png" width="300" height="225"/>
      <LoginForm />
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          New user? Register here
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
