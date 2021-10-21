const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const db = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  //Pre-assigned code to create a user based on the code used.
  const registrationCode = req.body.registrationCode;
  console.log('in', registrationCode);
  
  //Fetch code for teacher assignment
  let tc = await db.query(`SELECT value FROM settings WHERE variable = 'teacherCode'`);
  const teacherCode = tc.rows[0].value;

  //Fetch code for admin assignment
  let ac = await db.query(`SELECT value FROM settings WHERE variable = 'adminCode'`);
  const adminCode = ac.rows[0].value;
  
  
  let is_staff = false;
  let is_admin = false;

  //Control access based on code giving to user registering.
  switch (registrationCode) {

    case teacherCode:
      is_staff = true;
      is_admin = false;
      break;

    case adminCode:
      is_staff = false;
      is_admin = true;
      break;

    default:
      res.sendStatus(500);
      return;
  }
  
  //Set Params
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  let params = [username, password, first_name, last_name, is_staff, is_admin];
  const statement = `INSERT INTO "user" (username, password, first_name, last_name, is_staff, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  
  try {

    const response = await db.query(statement, params);
    res.sendStatus(201);

  } catch (err) {

    console.log('User registration failed: ', err);
    res.sendStatus(500);

  }

});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/toggle-staff/:id', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    UPDATE "user"
    SET
      is_staff = NOT is_staff
    WHERE id = $1
  `;

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('ERROR - get:/api/user/toggle-staff/:id', err);
    res.sendStatus(500)
  });
});

router.put('/toggle-admin/:id', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    UPDATE "user"
    SET
      is_admin = NOT is_admin
    WHERE id = $1
  `;

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('ERROR - get:/api/user/toggle-admin/:id', err);
    res.sendStatus(500)
  });
});

router.get('/staff-records', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    SELECT
      u.id,
      u.username,
      u.first_name,
      u.last_name,
      u.is_staff,
      u.is_admin,
      u.updated_on,
      u.created_on
    FROM "user" u
    WHERE NOT u.is_admin;
    `;

  db.query(statement)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/api/student/record/:id', err);
    res.sendStatus(500);
  });

});

router.put('/staff/update/:id', rejectUnauthenticated, (req, res) => {
  console.log('is this working???');
  
  const params = [
    req.body.first_name,
    req.body.last_name,
    req.body.id
  ]

  const statement =`
    UPDATE "user"
    SET
      first_name = $1,
      last_name = $2 
    WHERE id = $3
  `;

  db.query(statement, params)
   .then( result => {
     res.sendStatus(200);
   })
   .catch(err => {
     console.log('ERROR - update staff failed', err);
     res.sendStatus(500)
   });
});

router.get('/by-assignment/:id', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    SELECT 
      u.id,
      u.first_name,
      u.last_name
    FROM "user" u
    JOIN staff_program_assignment spa
      ON ( u.id = spa.user_id)
    WHERE spa.program_id = $1
    `;

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/api/student/record/:id', err);
    res.sendStatus(500)
  });
});

module.exports = router;
