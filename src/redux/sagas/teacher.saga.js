import axios from "axios";
const {takeLatest, put } = require("redux-saga/effects");

// GETS a list of staff.
function* getStaff(){
    try {
        const response = yield axios.get(`/api/user/staff-records`);
        yield put({ type: 'GET_STAFF_COMPLETED', payload: response.data });
    } catch (error) {
        console.log('error getting Students', error);
        yield put({ type: 'GET_STAFF_FAILED' });
    }
}

// GETS the Programs for a teacher.
function* getProgramsByTeacher(){
   try {
      const response = yield axios.get(`/api/program/by-assignment`);
      yield put({ type: 'SET_PROGRAMS_BY_TEACHER', payload: response.data});
   } catch (error) {
       console.log('error getting Programs', error);
       yield put({ type: 'GET_PROGRAM_FAILED' });
   }
}

// ADDS the Attendance of a given program. 
function* addAttendance(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.post(`api/attendance/toggle`, action.payload);
        let { occurrenceId } = action.payload;
        yield put({ type: 'FETCH_STUDENT_ATTENDANCE', payload: {id: occurrenceId}})
    } catch (error) {
        console.log('Error with adding Attendance', error);
        yield put({ type: 'ADD_ATTENDANCE_FAILED' });
    }
}

// ADD New occurrence, returns id, sends to page
function* addOccurrence(action){
    try {
        const response = yield axios.post(`api/occurrence/add`, action.payload);
        const { history } = action.payload;
        history.push(`/attendance/${response.data[0].id}`);
    } catch (error) {
        console.log('Error with adding new Occurrence', error);
    }
}

// GETS a program occurrence
function* getOccurrence(action){
    try {
        const response = yield axios.get(`api/occurrence/record/${action.payload.id}`);
        yield put({ type: 'SET_OCCURRENCE_TO_EDIT', payload: response.data[0]})
        yield put({ type:'FETCH_ASSIGNED_STUDENTS', payload: response.data[0].program_id  });
    } catch (error) {
        console.log('Error with adding new Occurrence', error);
    }
}

// GETS students assigned to a particular program
function* getAssignedStudents(action){
    try {
        const response = yield axios.get(`api/student/by-assignment/${action.payload}`);
        yield put({ type: 'SET_OCCURRENCE_STUDENTS', payload: response.data });
    } catch (error) {
        console.log('Error with adding new Occurrence', error);
    }
}

// GETS student attendance
function* getStudentAttendance(action){
    try {
        const response = yield axios.get(`api/attendance/by-occurrence/${action.payload.id}`);
        yield put({ type: 'SET_ATTENDANCE', payload: response.data[0].array_agg})
    } catch (error) {
        console.log('Error with fetching student attendance', error);
    }
}

// Edits occurrence data (aka change attendance)
function* putOccurrenceData(action){
    try {
        yield axios.put(`api/occurrence/${action.payload.id}`, action.payload);
        let { history } = action.payload;
        yield history.push('/teacher');
    } catch (error) {
        console.log('Error with saving student attendance', error);
    }
}

// GETS the teacher for a specific occurrence
function* getTeacherOccurrences(action){    
    try {
        const response = yield axios.get(`api/occurrence/by-teacher/${action.payload.id}`);
        console.log('response is', response);
        
        yield put({ type: 'SET_OCCURRENCE_BY_TEACHER', payload: response.data})
    } catch (error) {
        console.log('Error with saving student attendance', error);
    }
}

function* teacherSaga(){
    yield takeLatest('FETCH_STAFF', getStaff);
    yield takeLatest('FETCH_PROGRAMS_BY_TEACHER', getProgramsByTeacher);
    yield takeLatest('FETCH_ASSIGNED_STUDENTS', getAssignedStudents)
    yield takeLatest('FETCH_OCCURRENCE', getOccurrence)
    yield takeLatest('ADD_ATTENDANCE', addAttendance);
    yield takeLatest('SET_PROGRAM_OCCURRENCE', addOccurrence);
    yield takeLatest('FETCH_STUDENT_ATTENDANCE', getStudentAttendance);
    yield takeLatest('SAVE_OCCURRENCE', putOccurrenceData);
    yield takeLatest('FETCH_TEACHER_OCCURRENCES', getTeacherOccurrences)
}
export default teacherSaga;