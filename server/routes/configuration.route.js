const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const {  rejectUnauthenticated } = require('../modules/authentication-middleware');

/**** GET api/config ****/
// Fetching multiple queries, and packaging it up to one object
// NOTE: this route is unprotected to retrieve registration code 
router.get('/', async (req, res) => {
     let config = {};

    // Fetch Gender
    try {
        const statement = `
            SELECT id, name FROM gender`;

        const result = await db.query(statement);
        config = {...config, gender: result.rows }
    } catch (error) {
        console.log('ERROR - get:/config/ gender', error);
        res.sendStatus(500);
    }

    // Fetch Grade
    try {
        const statement = `
            SELECT id, name, abbrev FROM grade`;

        const result = await db.query(statement);
        config = {...config, grade: result.rows }
    } catch (error) {
        console.log('ERROR - get:/config/ grade', error);
        res.sendStatus(500);
    }

    // Fetch Ethnicity
    try {
        const statement = `
            SELECT id, name FROM ethnicity`;

        const result = await db.query(statement);
        config = {...config, ethnicity: result.rows }
    } catch (error) {
        console.log('ERROR - get:/config/ ethnicity', error);
        res.sendStatus(500);
    }

    // Fetch Stored Settings
    try {
        const statement = `
            SELECT variable, value FROM settings`;

        const result = await db.query(statement);
        config = {...config, settings: result.rows }
    } catch (error) {
        console.log('ERROR - get:/config/ settings', error);
        res.sendStatus(500);
    }

    // Fetch Program Types
    try {
        const statement = `
            SELECT id, name FROM type`;

        const result = await db.query(statement);
        config = {...config, type: result.rows }
    } catch (error) {
        console.log('ERROR - get:/config/ type', error);
        res.sendStatus(500);
    }

    // Sending compiled payload
    // Format { grade:[], ethnicity:[], gender:[], types:[], settings:[] }
    res.send(config);
});


/**** PUT api/config/setting/:settingVariable ****/
router.put('/setting/:settingVariable', rejectUnauthenticated, (req, res) => {

    const statement = `
        UPDATE settings 
        SET 
            value = $1,
            updated_on = NOW()
        WHERE variable = $2`;

    db.query(statement, [ req.body.settingValue, req.params.settingVariable ])
    .then( result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('ERROR - post:/config/setting:settingVariable', err);
      res.sendStatus(500)
    });
});

module.exports = router;
