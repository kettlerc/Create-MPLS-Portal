const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const {  rejectUnauthenticated } = require('../modules/authentication-middleware');

/**** GET api/attendance/by-occurrence/:id ****/
// All records by a program occurrence's id
router.get('/by-occurrence/:id', rejectUnauthenticated, (req, res) => {
    
    const statement = `
        SELECT
            ARRAY_AGG(student_id)
        FROM student_program_attendance
        WHERE occurrence_id = $1;`

  db.query(statement, [ req.params.id ])
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR - get:/attendance/records/by-program-occurrence/:id', err);
    res.sendStatus(500)
  });

});


/**** POST api/attendance/toggle ****/
// Student ID and Occurrence ID toggles adds or removes record based on current
// state. Takes in studentId and occurrenceId
router.post('/toggle', rejectUnauthenticated, async (req, res) => {
    //Same params for all queries
    const params = [ req.body.studentId, req.body.occurrenceId ];
    
    try {
        // Find out if record exists, 
            // delete statement if true, 
            // create statement if false
        
        const statement = `
            SELECT id 
            FROM student_program_attendance
            WHERE student_id = $1
            AND occurrence_id = $2;
            `;

        const results = await db.query(statement, params);

        // Contains the decided query
        let queryStatement = '';

        if ( results.rows.length > 0 ) {
            queryStatement = `
                DELETE FROM student_program_attendance
                WHERE student_id = $1
                AND occurrence_id = $2`;
        } else {
            queryStatement = `
                INSERT INTO student_program_attendance
                    ( student_id, occurrence_id )
                VALUES
                    ( $1, $2 )`;
        }
        // Finalize the decided query.
        const toggledAttendance = await db.query(queryStatement, params);
        res.sendStatus(200);
        
    } catch (error) {
        console.log('Error on attendance check', error);
        res.sendStatus(500);
    }
    
    
});

module.exports = router;
