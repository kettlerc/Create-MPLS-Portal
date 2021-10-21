const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const {  rejectUnauthenticated } = require('../modules/authentication-middleware');

/**** GET /api/program/record/:id ****/
// Get program record by id
router.get('/record/:id', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    SELECT
      p.id program_id,
      p.name,
      p.location,
      p.type_id,
      t.name type_name
    FROM program p
    JOIN type t
      ON ( t.id = p.type_id )
    WHERE p.id = $1
    AND p.is_active = TRUE;
    `;

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/api/program/record/:id', err);
    res.sendStatus(500)
  });
  
});

/**** GET /api/program/records ****/
// Get all program records
router.get('/records', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    SELECT
      p.id id,
      p.name,
      p.location,
      p.type_id,
      t.name type_name
    FROM program p
    JOIN type t
      ON ( t.id = p.type_id )
    WHERE p.is_active = TRUE;
    `;

  db.query(statement)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/api/program/record/:id', err);
    res.sendStatus(500)
  });
});

/**** GET /by-assignment ****/
// Get all program records
router.get('/by-assignment', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    SELECT
      p.id id,
      spa.id assignment_id,
      p.name,
      p.location,
      p.type_id,
      t.name type_name
    FROM program p
    JOIN type t
      ON ( t.id = p.type_id )
    JOIN staff_program_assignment spa
      ON ( spa.program_id = p.id )
    WHERE p.is_active = TRUE
    AND user_id = $1;
    `;

  db.query(statement, [ req.user.id ])
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/api/program/record/:id', err);
    res.sendStatus(500)
  });
});

/**** POST /api/program/records ****/
// Add program to the records
router.post('/add', rejectUnauthenticated, (req, res) => {
  
  let params = [ 
    req.body.programName, 
    req.body.programLocation,
    req.body.programType
  ];

  const statement = `
    INSERT INTO program
      ( name, location, type_id )
    VALUES
      ( $1, $2, $3 );
  `;

  db.query(statement, params)
  .then( result => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('ERROR - post:/api/program/add', err);
    res.sendStatus(500);
  });
});

/**** POST /api/program/assign-staff ****/
// Post a new staff assignment
 router.post('/assign-staff', rejectUnauthenticated, (req, res) => {
  
  let params = [ 
    req.body.userId, 
    req.body.programId
  ];

  const statement = `
    INSERT INTO staff_program_assignment
      ( user_id, program_id )
    VALUES
      ( $1, $2 );
  `;

  db.query(statement, params)
  .then( result => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('ERROR - post:/api/program/add', err);
    res.sendStatus(500);
  });
});

/**** POST /api/program/toggle-teacher-assignment ****/
// Soft deletes a teacher assignment
 router.post('/toggle-teacher-assignment', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    UPDATE staff_program_assignment
    SET
      is_active = NOT is_active
    WHERE id = $1
  `;

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('ERROR - get:/api/program/update/:id', err);
    res.sendStatus(500)
  });
});

/**** POST /api/program/assign-student ****/
// Assigns student to program
router.post('/assign-student', rejectUnauthenticated, (req, res) => {
  
  let params = [ 
    req.body.studentId, 
    req.body.programId
  ];

  const statement = `
    INSERT INTO student_program_assignment
      ( student_id, program_id )
    VALUES
      ( $1, $2 );
  `;

  db.query(statement, params)
  .then( result => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('ERROR - post:/api/program/add', err);
    res.sendStatus(500);
  });

});

/**** POST /api/program/toggle-active ****/
// Soft deletes program - makes inactive
router.put('/toggle-active/:id', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    UPDATE program
    SET
      is_active = NOT is_active
    WHERE id = $1
  `;

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('ERROR - get:/api/program/update/:id', err);
    res.sendStatus(500)
  });
});

/** PUT /api/program/by-id/:id */
router.put('/by-id/:id', rejectUnauthenticated, (req, res) => {
  console.log('req', req.body, req.params.id);
  const statement = `
    UPDATE "program"
    SET
      name = $1,
      location = $2,
      type_id = $3
    WHERE id = $4`;

  const params = [ 
    req.body.name, 
    req.body.location, 
    req.body.type_id, 
    req.params.id
  ];

  db.query(statement, params)
  .then( result => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('ERROR - put:/api/program/by-id/:id', err);
    res.sendStatus(500)
  });
});

module.exports = router;
