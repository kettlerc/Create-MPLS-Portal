const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const {  rejectUnauthenticated } = require('../modules/authentication-middleware');


//get /api/student/by-assignment/:id
router.get('/by-assignment/:id', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    SELECT 
      s.id,
      s.first_name,
      s.last_name
    FROM student s
    JOIN student_program_assignment spa
      ON ( s.id = spa.student_id)
    WHERE spa.program_id = $1
    AND s.is_active = TRUE
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

/**** GET /api/student/record/:id ****/
// Fetch student record based on id
router.get('/record/:id', rejectUnauthenticated, (req, res) => {
  
    const statement = `
      SELECT
        s.first_name,
        s.last_name,
        s.gender_id,
        s.age,
        ge.name gender,
        s.grade_id,
        gr.name grade,
        s.ethnicity_id,
        e.name ethnicity,
        is_active,
        updated_on,
        created_on
      FROM student s
      JOIN gender ge
        ON ( ge.id = s.gender_id )
      JOIN grade gr
        ON ( gr.id = s.grade_id )
      JOIN ethnicity e
        ON ( e.id = s.ethnicity_id )
      WHERE s.id = $1
      AND is_active = TRUE;
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

/**** GET /api/student/records ****/
// Fetch all student records
router.get('/records', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    SELECT
      s.id,
      s.first_name,
      s.last_name,
      s.gender_id,
      ge.name gender_name,
      s.age,
      s.grade_id,
      gr.name grade_name,
      gr.abbrev grade_abbrev,
      s.ethnicity_id,
      et.name ethnicity_name,
      s.is_active,
      s.updated_on,
      s.created_on,
      (SELECT
        SUM(duration) as total_minutes
        FROM student_program_attendance spa2
        JOIN program_occurrence po
        ON (po.id = spa2.occurrence_id)
        GROUP BY spa2.student_id
        HAVING spa2.student_id = s.id) 
        AS total_minutes
      FROM student s
      JOIN grade gr
        ON (gr.id = s.grade_id)
      JOIN gender ge
        ON (ge.id = s.gender_id)
      JOIN ethnicity et
        ON (et.id = s.ethnicity_id)
      WHERE is_active = TRUE;
        `;

  db.query(statement)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/api/student/record/:id', err);
    res.sendStatus(500)
  });
});
/**** POST /api/student/add ****/
// Add new student
router.post('/add', rejectUnauthenticated, (req, res) => {
  
  let params = [ 
    req.body.firstName, 
    req.body.lastName,
    req.body.genderId,
    req.body.gradeId,
    req.body.ethnicityId,
    req.body.age 
  ];

  const statement = `
    INSERT INTO student
      ( first_name, last_name, gender_id, grade_id, ethnicity_id, age )
    VALUES
      ( $1, $2, $3, $4, $5, $6 );
  `;

  db.query(statement, params)
  .then( result => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('ERROR - post:/api/student/add', err);
    res.sendStatus(500);
  });
});

/**** PUT /api/student/update/:id ****/
// Update student
 router.put('/update/:id', rejectUnauthenticated, (req, res) => {
  
  let params = [ 
    req.body.first_name, 
    req.body.last_name,
    req.body.gender_id,
    req.body.grade_id,
    req.body.ethnicity_id,
    req.body.age,
    req.params.id 
  ];

  const statement = `
    UPDATE student
    SET
      first_name = $1, 
      last_name = $2, 
      gender_id = $3, 
      grade_id = $4, 
      ethnicity_id = $5,
      age = $6,
      updated_on = NOW()
    WHERE id = $7
  `;

  db.query(statement, params)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/api/student/update/:id', err);
    res.sendStatus(500);
  });
});


/**** Post /api/student/toggle-active/:id ****/
// Toggles-Changes active state
router.put('/toggle-active/:id', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    UPDATE student
    SET
      is_active = NOT is_active
    WHERE id = $1
  `;

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('ERROR - get:/api/student/update/:id', err);
    res.sendStatus(500);
  });
});

module.exports = router;
