import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AdminViewStudent from '../AdminView/AdminViewStudent';
import AdminViewStaff from '../AdminView/AdminViewStaff';
import AdminViewProgram from '../AdminView/AdminViewProgram';
import AdminViewConfig from '../AdminView/AdminViewConfig';
import TeacherPortal from '../TeacherPortal/TeacherPortal';
import AttendancePage from '../AttendancePage/AttendancePage';
import Dashboard from '../AdminView/Dashboard';
import './App.css';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  // Gets the registration code to the registration page
  useEffect(() => {
    dispatch({ type: 'GET_SETTINGS'});``
  }, []);

  // Checks to see if user is logged in
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {user.is_admin && <Nav />}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/login */}
          <Redirect exact from="/" to="/login" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            {/* recognizes if user is an admin or teacher and redirects appropriately */}
            {user.is_admin ?
              <Redirect to="/dashboard" />
              :
              <Redirect to="/teacher" />
            }
          </ProtectedRoute>

          <Route
            // logged in shows AddStudent else shows LoginPage
            exact
            path="/add-student"
          >
            {user.id ?
              <AdminViewStudent />
              :
              <Redirect to="/login" />
            }
          </Route>

          <Route
            // logged in shows Dashboard else shows LoginPage
            exact
            path="/dashboard"
          >
            {user.id ?
              <Dashboard/>
              :
              <Redirect to="/login" />
            }
          </Route>

          <Route
            // logged in shows AddStudent else shows LoginPage
            exact
            path="/program"
          >
            {user.id ?
              <AdminViewProgram />
              :
              <Redirect to="/login" />
            }
          </Route>

          <Route
            // logged in shows Staff else shows LoginPage
            exact
            path="/staff"
          >
            {user.id ?
              <AdminViewStaff />
              :
              <Redirect to="/login" />
            }
          </Route>

          <Route
            // logged in shows AdminConfig else shows LoginPage
            exact
            path="/config"
          >
            {user.id ?
              <AdminViewConfig />
              :
              <Redirect to="/login" />
            }
          </Route>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/teacher"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /teacher page
              <TeacherPortal />
              :
              // Otherwise, show the login page
              <Redirect to="/login" />
            }
          </Route>

          <Route
            exact
            path="/attendance/:id"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /attendance/:id page
              <AttendancePage />
              :
              // Otherwise, show the login page
              <Redirect to="/login" />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {user.is_admin && <Footer />}
      </div>
    </Router>
  );
}

export default App;
