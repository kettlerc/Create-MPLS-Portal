const express = require('express');
//body-parser is depreciated
//const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const configRouter = require('./routes/configuration.route');
const studentRouter = require('./routes/student.route');
const programRoute = require('./routes/program.route');
const occurrenceRoute = require('./routes/occurrence.route');
const attendanceRouter = require('./routes/attendance.route');
const dashboardRouter = require('./routes/dashboard.route');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// leaving as a note, below is the depreciated practice
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/config', configRouter);
app.use('/api/student', studentRouter);
app.use('/api/program', programRoute);
app.use('/api/occurrence', occurrenceRoute);
app.use('/api/attendance', attendanceRouter);
app.use('/api/dashboard', dashboardRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
