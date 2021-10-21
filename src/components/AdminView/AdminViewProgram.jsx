import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Program.css'
import "./StudentSearch.css";
import AddProgram from './AddProgram';
import EditProgram from './EditProgram';
import ProgramDataGrid from '../DataGrid/ProgramDataGrid';
import ProgramSearch from '../Search/ProgramSearch';
import Typography from "@mui/material/Typography";

//This function handles everything for the Programs page
function AdminViewProgram() {
  //UseDispatch hook
  const dispatch = useDispatch();

  //UseSelector hook to access the program and programToEdit Redux stores
  const programList = useSelector(store => store.program);
  const programToEdit = useSelector(store => store.programToEdit);

  //UseEffect hook runs on page load
  //these dispatches fetch the lists of programs, students, and staff
  useEffect(() => {
    dispatch({ type: 'FETCH_PROGRAM'});
    dispatch({ type: 'FETCH_STUDENT' });
    dispatch({ type: 'FETCH_STAFF' });
  }, [])

  return (
    <>
      <AddProgram />
      
      <Typography variant="h5" style={{ marginTop: 20, marginBottom: 20 }}>EDIT PROGRAM FORM</Typography>
        <ProgramSearch />
        {Object.keys(programToEdit).length > 0 &&
          <EditProgram /> //Displays only when there is a program to edit
        }
      <Typography variant="h5" style={{ marginTop: 40, marginBottom: 20 }}>PROGRAMS</Typography>
        { Object.keys(programList).length > 0 &&
          <ProgramDataGrid /> //Displays only when there is a program to edit
        }
    </>
  )
}

export default AdminViewProgram;