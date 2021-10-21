const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const {  rejectUnauthenticated } = require('../modules/authentication-middleware');
const { default: axios } = require('axios');


// Gets all the information in one go for the dashboard page
// ROUTE: /api/dashboard/charts
router.get('/charts', rejectUnauthenticated, async (req,res) => {

    // Grabs ethnicity information for the pie graph
    const ethnicityStatement = `
        SELECT
	        e.name as name,
            COUNT(s.ethnicity_id) total
        FROM student s
        JOIN ethnicity e
            ON ( s.ethnicity_id = e.id )
        GROUP BY e.name;
        `;
        
    // Grabs the gender information for the gender graph
    const genderStatement = `
        SELECT
            g.name as name,
            COUNT(s.gender_id) total
        FROM student s
        JOIN gender g
            ON ( s.gender_id = g.id )
        GROUP BY g.name;
        `;

    // Grabs total minutes for the minutes graph
    const minutesStatement = `
        SELECT
            EXTRACT( MONTH FROM po.at_date ) AS month_number,
            SUM(duration) AS total_minutes
        FROM program_occurrence po
        JOIN student_program_attendance spa
            ON ( po.id = spa.occurrence_id )
        WHERE EXTRACT( YEAR FROM po.at_date ) = EXTRACT( YEAR FROM NOW())
        GROUP BY month_number
        ORDER BY month_number;
        `;

    // Grab list of students for DataGrid
    const studentGridDataStatement = `
        SELECT
            s.id id,
            s.last_name,
            s.first_name,
            e.name ethnicity,
            gen.name gender,
            gr.name grade,
            SUM(COALESCE(po.duration, 0)) total_minutes
        FROM student s
        JOIN ethnicity e
            ON ( s.ethnicity_id = e.id )
        JOIN gender gen
            ON ( s.gender_id = gen.id )
        JOIN grade gr
            ON ( s.grade_id = gr.id )
        LEFT JOIN student_program_attendance spa
            ON ( s.id = spa.student_id )
        LEFT JOIN program_occurrence po
            ON (spa.occurrence_id = po.id )
        WHERE s.is_active
        GROUP BY s.id, e.name, gen.name, gr.name
        ORDER BY last_name, first_name;
    `;
    
    // Grab list of programs for Datagrid
    const programOccurrenceDataStatement = `
        SELECT
            po.id id,
            po.at_date date,
            p.name program_name,
            p.location program_location,
            po.duration duration,
            po.volunteers volunteers,
            u.first_name teacher_first_name,
            u.last_name teacher_last_name,
            (SELECT 
                COUNT(sta2.id) 
                FROM student_program_attendance sta2 
                WHERE sta2.occurrence_id = po.id) 
                AS student_count
        FROM program_occurrence po
        JOIN staff_program_assignment spa
            ON ( po.assignment_id = spa.id )
        JOIN "user" u
            ON ( spa.user_id = u.id )
        JOIN "program" p
            ON ( spa.program_id = p.id )
        ORDER BY po.at_date DESC;
    `;

    // Grad list of teachers and their minutes
    const teacherMinutesDataStatement = `
        SELECT
            u.id,
            u.last_name,
            u.first_name,
            SUM(COALESCE(po.duration, 0)) total_minutes
        FROM "user" u
        JOIN staff_program_assignment spa
            ON ( u.id = spa.user_id )
        JOIN program_occurrence po
            ON ( po.assignment_id = spa.id )
        GROUP BY u.id;
    `;

    try {

        // Query the above statements
        const ethnicity = await db.query(ethnicityStatement);
        const gender = await db.query(genderStatement);
        const minutesByMonth = await db.query(minutesStatement);
        const studentData = await db.query(studentGridDataStatement);
        const occurrenceData = await db.query(programOccurrenceDataStatement);
        const teacherData = await db.query(teacherMinutesDataStatement);

        // Send a formatted object to be used.
        res.send({ 
            ethnicity: ethnicity.rows, 
            gender: gender.rows,
            minutesByMonth: minutesByMonth.rows,
            studentGrid: studentData.rows,
            occurrenceGrid: occurrenceData.rows,
            teacherGrid: teacherData.rows,
        });

    } catch (error) {
        console.log('ERROR: dashboard', error);
        res.sendStatus(500);
    }

});

module.exports = router;
