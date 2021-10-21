import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import settings from './settings.reducer';
import student from './student.reducer';
import teacher from './teacher.reducer';
import program from './program.reducer';
import studentToEdit from './studentToEdit.reducer';
import studentToAdd from './studentToAdd.reducer';
import studentAssignments from './studentAssignments.reducer';
import programToEdit from './programToEdit.reducer';
import staffToEdit from './staffToEdit.reducer';
import staffToAdd from './staffToAdd.reducer';
import staffAssignments from './staffAssignments.reducer';
import occurrenceToEdit from './occurrenceToEdit.reducer';
import programsByTeacher from './programsByTeacher.reducer';
import occurrenceStudents from './occurrenceStudents.reducer';
import occurrenceAttendance from './occurrenceAttendance.reducer';
import occurrenceByTeacher from './occurrencesByTeacher.reducer';
import charts from './charts.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // Contains registrationMessage and loginMessage
  user, // Will have an id and username if someone is logged in
  settings, // Provides registration code to front end
  student, // Holds the list of students to be sent to the front end. 
  teacher, // Holds the list of teachers to be sent to the front end. 
  program, // Holds the list of programs to be sent to the front end. 
  studentToEdit, // Holds the student from search to edit
  studentToAdd, // Holds the student to add them to program
  studentAssignments, // Holds assigning a student to a program
  programToEdit, // Holds the program from search to edit
  staffToEdit, // Holds the staff from search to edit
  staffToAdd, // Holds the staff to add them to the program
  staffAssignments, // Holds assigning staff to a program
  programsByTeacher, // Holds the list of programs that the teacher is assigned.
  occurrenceToEdit, // Holds the occurrence to edit,
  occurrenceStudents, // Holds the students for occurrence attendance
  occurrenceAttendance, // Holds the current student attendance for the occurrence
  charts, // Stores information for displaying charts
  occurrenceByTeacher, // Stores the teachers previous occurrences
});

export default rootReducer;
