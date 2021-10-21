import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ Box, TextField, InputLabel, MenuItem, FormControl, Select, Button, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

//Function for adding students to the database
function AddStudent() {
  let dispatch = useDispatch();

  //NewStuent object for storing data from the form
  let newStudent = {
    firstName: '',
    lastName: '',
    genderId: '',
    gradeId: '',
    ethnicityId: '',
    age: ''
  };

  //Creating local states for drop down data storage
  const settings = useSelector(store => store.settings);
  const [addStudent, setAddStudent] = React.useState(newStudent);
  
  //Handles changes to the form and packs them into a single object.
  const handleAddStudentChange = (event) => {
    setAddStudent({...addStudent, [event.target.name]:event.target.value});
  }

  //Submitting new student to the database
  const handleAddStudent = () => {
    dispatch({
      type: 'ADD_STUDENT',
      payload: addStudent
    })
    setAddStudent(newStudent);
  }

  return (
    <>
      <center>
        <Paper>
        <Box style={{ width: '50%', paddingTop: "1px", paddingBottom: "20px", marginTop: -30}}>
        <Typography variant="h5" style={{marginTop: 20, marginBottom: 20}}>ADD STUDENT FORM</Typography>
          <div>
            <TextField 
              required 
              name="firstName"
              variant="outlined"
              style={{ margin: 5, width: '45%' }}
              label="First Name"
              value={addStudent.firstName}
              onChange={handleAddStudentChange}
            />
            <TextField 
              required 
              name="lastName"
              variant="outlined"
              style={{ margin: 5, width: '45%' }} 
              label="Last Name" 
              value={addStudent.lastName}
              onChange={handleAddStudentChange}
            />
          </div>
          <div>
            <TextField 
              required 
              name="age"
              variant="outlined"
              style={{ margin: 5, width: 100 }}
              label="Age" 
              value={addStudent.age}
              onChange={handleAddStudentChange}
            />
            <FormControl>
              <InputLabel id="gradeSelect">Grade</InputLabel>
              <Select
                name="gradeId"
                id="demo-simple-select"
                style={{ margin: 5 }}
                value={addStudent.gradeId}
                onChange={handleAddStudentChange}
              >
                {(Object.keys(settings).length > 0 ) ? settings.grade.map((gr)=> (
                    <MenuItem key={gr.id} value={gr.id}>{gr.name}</MenuItem>
                )) :
                    <MenuItem value={0}>Loading....</MenuItem>
                }
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="ethnicitySelect">Ethnicity</InputLabel>
              <Select
                labelId="ethnicity"
                name="ethnicityId"
                id="demo-simple-select"
                style={{ margin: 5 }}
                value={addStudent.ethnicityId}
                label="Ethnicity"
                onChange={handleAddStudentChange}
              >
                {(Object.keys(settings).length > 0 ) ? settings.ethnicity.map((e)=> (
                    <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                )) :
                <MenuItem value={0}>Loading....</MenuItem>
                }
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="genderSelect">Gender</InputLabel>
              <Select
                labelId="gender"
                name="genderId"
                id="demo-simple-select"
                style={{ margin: 5 }}
                value={addStudent.genderId}
                label="Gender"
                onChange={handleAddStudentChange}
              >
                {(Object.keys(settings).length > 0 ) ? settings.gender.map((ge)=> (
                    <MenuItem key={ge.id} value={ge.id}>{ge.name}</MenuItem>
                )) :
                <MenuItem value={0}>Loading....</MenuItem>
                }
              </Select>
            </FormControl>
          </div>
          <div>
            <Button 
              id="addBttn" 
              variant="outlined"
              style={{ margin: 5, marginBottom: 30, width: 400 }}
              endIcon={<AddIcon />}
              onClick={handleAddStudent}
            >
              Add Student
            </Button>
          </div>
        </Box>
        </Paper>
      </center>
    </>
  );
}

export default AddStudent;
