import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ Box, TextField, Button, Paper } from "@mui/material";

//Function for handling the Edit Staff form
const EditStaff = () => {

    //UseDispatch hook
    const dispatch = useDispatch()

   //UseSelector hook to access the staffToEdit Redux store   
    const staffToEdit = useSelector(store => store.staffToEdit);
    // const settings = useSelector(store => store.settings);

    //Sets the staff to edit when a name is selected from the drop down
    const handleChange = (event) => {
        dispatch({
            type: 'SET_STAFF_TO_EDIT',
            payload: { ...staffToEdit, [event.target.name]:event.target.value }
        })
    }

    //Updates the staff in the database
    const handleUpdate = () => {
        console.log('TIME TO UPDATE', staffToEdit);
        dispatch({
            type: 'EDIT_STAFF',
            payload: staffToEdit
        })
    }

    //Deletes the staff from the database
    //NOTE: this is a "soft delete", the staff will be set to "inactive"
    //all records for that staff will still be available
    const handleDelete = () => {
        if(confirm('This will make the staff unavailable')){
            dispatch({ type: 'DELETE_STAFF', payload: staffToEdit.id })

            dispatch({
            type: 'SET_STAFF_TO_EDIT',
            payload: { ...staffToEdit, is_staff : !staffToEdit.is_staff }
        })
        }  
    }

    return (
        <>
        <center>
            <Paper>
            <Box style={{ width: '50%', paddingTop: "1px", paddingBottom: "20px", marginTop: -30 }}>
                <div>
                    <TextField 
                        required 
                        name="first_name"
                        variant="outlined"
                        style={{ margin: 5 }}
                        label="First Name"
                        value={staffToEdit.first_name}
                        onChange={handleChange}
                    />
                    <TextField 
                        required 
                        name="last_name"
                        variant="outlined"
                        style={{ margin: 5 }}
                        label="Last Name" 
                        value={staffToEdit.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Button 
                        id="addBttn" 
                        variant="outlined"
                        style={{ margin: 5, marginBottom: 20 }}
                        onClick={handleUpdate}
                    >
                        Update Staff
                    </Button>
                    <Button 
                        id="addBttn" 
                        color="error" 
                        variant="outlined"
                        style={{ margin: 5, marginBottom: 20 }}
                        onClick={handleDelete}
                    >
                        {staffToEdit.is_staff ? "Deactivate" : "Activate"}
                    </Button>
                </div>
            </Box>
            </Paper>
        </center>
    </>    
    );
}

export default EditStaff;
