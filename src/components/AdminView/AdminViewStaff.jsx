import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./Staff.css";
import "./StudentSearch.css";
import EditStaff from "./EditStaff";
import StaffSearch from "../Search/StaffSearch";
import StaffDataGrid from "../DataGrid/StaffDataGrid";
import Typography from "@mui/material/Typography";

//This function handles everything for the Staff page
function AdminViewStaff() {

  //UseSelector hook to access the teacher and staffToEdit Redux stores
  const staffList = useSelector(store => store.teacher)
  const staffToEdit = useSelector(store => store.staffToEdit)

  //UseEffect hook runs on page load
  //this dispatch fetches the list of staff
  let dispatch = useDispatch();
    useEffect(() => { 
        dispatch({ type: 'FETCH_STAFF' });
    }, [])

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: 20, marginBottom: 20 }}>EDIT STAFF FORM</Typography>
      <StaffSearch />
        { Object.keys(staffToEdit).length > 0 &&
            <EditStaff/> //Displays only when there is a staff to edit
        }
      <Typography variant="h5" style={{ marginTop: 40, marginBottom: 20 }}>STAFF</Typography>
        { Object.keys(staffList).length > 0 &&
          <StaffDataGrid /> //Displays only when there is a staff to edit
        }
    </div>
  )
}

export default AdminViewStaff;
