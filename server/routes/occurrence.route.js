const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const {  rejectUnauthenticated } = require('../modules/authentication-middleware');

router.put('/:id', rejectUnauthenticated, (req, res) => {

  const params = [ req.body.duration, req.body.volunteers, req.body.at_date, req.params.id ];

  const statement = `
    UPDATE program_occurrence 
    SET
      duration = $1,
      volunteers = $2,
      at_date = $3
    WHERE id = $4
  `;

  db.query(statement, params)
  .then( result => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('ERROR - put:/api/occurrence/:id', err);
    res.sendStatus(500)
  });
});

/**** GET /api/occurrence/record/:id ****/
// Update occurrence record by id
router.get('/record/:id', rejectUnauthenticated, (req, res) => {
  
  const statement =  `
  SELECT
    po.id,
    po.assignment_id,
    po.duration,
    po.at_date,
    po.volunteers,
    po.created_on,
    po.updated_on,
    p.name,
    p.location,
    spa.program_id
  FROM program_occurrence po
  JOIN staff_program_assignment spa
    ON ( po.assignment_id = spa.id )
  JOIN program p
    ON ( p.id = spa.program_id )
  WHERE po.id = $1;
  `;

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/api/occurrence/record/:id', err);
    res.sendStatus(500)
  });
});

/**** GET /api/occurrence/by-teacher/:id ****/
// Update occurrence record by id
router.get('/by-teacher/:id', rejectUnauthenticated, (req, res) => {
  console.log('what is id', req.params.id);
  
  const statement =  `
  SELECT
    po.id,
    po.assignment_id,
    po.duration,
    po.at_date,
    po.volunteers,
    po.created_on,
    po.updated_on,
    p.name,
    p.location,
    spa.program_id
  FROM program_occurrence po
  JOIN staff_program_assignment spa
    ON ( po.assignment_id = spa.id )
  JOIN program p
    ON ( p.id = spa.program_id )
  WHERE spa.user_id = $1
  ORDER BY at_date DESC;
  `;  

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.send(result.rows);    
  })
  .catch(err => {
    console.log('ERROR - get:/api/occurrence/record/:id', err);
    res.sendStatus(500)
  });
});

/**** GET /api/occurrence/records ****/
// Get all records from occurrence
 router.get('/records', rejectUnauthenticated, (req, res) => {
  
  const statement = `
    SELECT
      po.id,
      po.assignment_id,
      po.duration,
      po.at_date,
      po.volunteers,
      po.created_on,
      po.updated_on,
      p.name,
      p.location,
      spa.program_id
    FROM program_occurrence po
    JOIN staff_program_assignment spa
      ON ( po.assignment_id = spa.id )
    JOIN program p
      ON ( p.id = spa.program_id );
    `;

  db.query(statement)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/api/occurrence/records', err);
    res.sendStatus(500)
  });
});

/**** POST /api/occurrence/add ****/
// Add new occurrence
 router.post('/add', rejectUnauthenticated, (req, res) => {
  
  let params = [ req.body.id ];

  const statement = `
    INSERT INTO program_occurrence
      ( assignment_id, duration, at_date, volunteers )
    VALUES
      ( $1, 15, NOW(), 0 )
    RETURNING id;
  `;

  db.query(statement, params)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - post:/api/program_occurrence/add', err);
    res.sendStatus(500);
  });
});

module.exports = router;
