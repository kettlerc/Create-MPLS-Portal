import axios from "axios";
const {takeLatest, put } = require("redux-saga/effects");

// ADDS a student to the database.
function* addStudent(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.post(`api/student/add`, action.payload);
        yield put({ type: 'FETCH_STUDENT' });
    } catch (error) {
        console.log('Error with adding Student', error);
        yield put({ type: 'ADD_STUDENT_FAILED' });
    }
}

// GETS a list of students.
function* getStudent(){
    try {
        const response = yield axios.get(`/api/student/records`);
        yield put({ type: 'GET_STUDENT_COMPLETED', payload: response.data });
    } catch (error) {
        console.log('error getting Students', error);
        yield put({ type: 'GET_STUDENT_FAILED' });
    }
}

// PUTS(edit) a student's info.
function* editStudent(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.put(`api/student/update/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_STUDENT' });
        //yield put({ type: 'UNSET_STUDENT_TO_EDIT' });
    } catch (error) {
         console.log('Error Editing a Students info', error);
        yield put({ type: 'EDIT_STUDENT_FAILED' });
    }
}

// DELETES a student from the database (soft delete).
function* deleteStudent(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.put(`api/student/toggle-active/${action.payload}`);
        yield put({ type: 'FETCH_STUDENT' });
        //yield put({ type: 'UNSET_STUDENT_TO_EDIT' });
    } catch (error) {
        console.log('Error deleting Student', error);
        yield put({ type: 'DELETE_STUDENT_FAILED' });
    }
}

// PUTS(edit) a teacher's programs.
function* editAssignedPrograms(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.put(`api/program/assign-teacher`,action.payload)
    } catch (error) {
        console.log('Error Editing a Teachers Programs', error);
        yield put({ type: 'EDIT_ASSIGNED_PROGRAMS_FAILED' });
    }
}

//Edit a staff member
function* editStaff(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.put(`api/user/staff/update/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_STAFF' });
        //yield put({ type: 'UNSET_STUDENT_TO_EDIT' });
    } catch (error) {
         console.log('Error Editing a Staffs info', error);
        yield put({ type: 'EDIT_STAFF_FAILED' });
    }
}

// DELETES a teacher from the database (soft delete). 
function* deleteStaff(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.put(`api/user/toggle-staff/${action.payload}`);
        yield put({ type: 'FETCH_STAFF' });
    } catch (error) {
        console.log('Error deleting Staff', error);
        yield put({ type: 'DELETE_STAFF_FAILED' });
    }
}

// PUTS(edit) the registration code.
function* editTeacherCode(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.put(`api/config/setting/teacherCode`, action.payload)
    } catch (error) {
        console.log('Error Editing the Registration Code', error);
        yield put({ type: 'EDIT_CODE_FAILED' });
    }
}

// PUTS(edit) the registration code.
function* editAdminCode(action) {
    console.log('action.payload', action.payload);
    try {
        yield axios.put(`api/config/setting/adminCode`, action.payload)
    } catch (error) {
        console.log('Error Editing the Registration Code', error);
        yield put({ type: 'EDIT_CODE_FAILED' });
    }
}

// ADDS a new program to the database.
function* addProgram(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.post(`api/program/add`, action.payload);
        yield put({ type: 'FETCH_PROGRAM' });
    } catch (error) {
        console.log('Error with adding Program', error);
        yield put({ type: 'ADD_PROGRAM_FAILED' });
    }
}

//GETS a list of all the programs. 
function* getProgram(){
    try {
        const result = yield axios.get(`api/program/records`);
        yield put({ type: 'GET_PROGRAM_COMPLETED', payload: result.data });
    } catch (error) {
        console.log('error getting Programs', error);
        yield put({ type: 'GET_PROGRAM_FAILED' });
    }
}

//DELETES a program (soft).
function* deleteProgram(action){
    try {
        yield axios.delete(`api/program/toggle-active/${action.payload}`);
        yield put({ type: 'FETCH_PROGRAM' });
    } catch (error) {
        console.log('Error deleting Program', error);
        yield put({ type: 'DELETE_PROGRAM_FAILED' });
    }
}

//ADDS a staff to a program.
function* addStaffProgram(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.post(`api/program/assign-staff`, action.payload);
        yield put({ type: 'FETCH_STAFF_ASSIGNMENTS', payload: { id: action.payload.programId}});
    } catch (error) {
        console.log('Error with adding a Student to a Program', error);
        yield put({ type: 'ADD_STAFF_PROGRAM_FAILED' });
    }
}

//ADDS a student to a program.
function* addStudentProgram(action){
    console.log('action.payload', action.payload);
    try {
        yield axios.post(`api/program/assign-student`, action.payload);
        yield put({ type: 'FETCH_STUDENT_ASSIGNMENTS', payload: { id: action.payload.programId }});
    } catch (error) {
        console.log('Error with adding a Student to a Program', error);
        yield put({ type: 'ADD_STUDENT_PROGRAM_FAILED' });
    }
}

function* getDashboardData(){
    try {
        const results = yield axios.get('api/dashboard/charts');
        yield put({ type: 'SET_CHARTS', payload: results.data })
    } catch (error) {
        console.log('Error: get dashboard data', error)
    }
}

function* getStudentAssignments(action) {
    try {
        const result = yield axios.get(`api/student/by-assignment/${action.payload.id}`);
        yield put({ type: 'SET_STUDENT_ASSIGNMENTS', payload: result.data})  
    } catch (error) {
        console.log('Error with fetching student assignments', error);
    }
}

function* getStaffAssignments(action) {
    try {
        const result = yield axios.get(`api/user/by-assignment/${action.payload.id}`);
        yield put({ type: 'SET_STAFF_ASSIGNMENTS', payload: result.data})  
    } catch (error) {
        console.log('Error with fetching staff assignments', error);
    }
}

function* editProgram(action) {
    try {
        yield axios.put(`api/program/by-id/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_PROGRAM' })
    } catch (error) {
        console.log('Error with updating a program', error);
    }
}

function* adminSaga() {
    yield takeLatest('ADD_STUDENT', addStudent);
    yield takeLatest('FETCH_STUDENT', getStudent);
    yield takeLatest('EDIT_STUDENT', editStudent);
    yield takeLatest('DELETE_STUDENT', deleteStudent);
    yield takeLatest('EDIT_TEACHER_PROGRAMS', editAssignedPrograms);
    yield takeLatest('EDIT_STAFF', editStaff);
    yield takeLatest('DELETE_STAFF', deleteStaff);
    yield takeLatest('EDIT_ADMIN_CODE', editAdminCode);
    yield takeLatest('EDIT_TEACHER_CODE', editTeacherCode);
    yield takeLatest('ADD_PROGRAM', addProgram);
    yield takeLatest('FETCH_PROGRAM', getProgram);
    yield takeLatest('DELETE_PROGRAM', deleteProgram);
    yield takeLatest('ADD_STUDENT_PROGRAM', addStudentProgram);
    yield takeLatest('ADD_STAFF_PROGRAM', addStaffProgram);
    yield takeLatest('FETCH_STUDENT_ASSIGNMENTS', getStudentAssignments),
    yield takeLatest('FETCH_STAFF_ASSIGNMENTS', getStaffAssignments)
    yield takeLatest('FETCH_DASHBOARD', getDashboardData)
    yield takeLatest('EDIT_PROGRAM', editProgram)
//    yield takeLatest('FETCH_ALL_DATA', getAllData);
}
export default adminSaga;