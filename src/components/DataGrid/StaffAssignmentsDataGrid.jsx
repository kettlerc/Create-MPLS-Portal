import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';


const StaffAssignmentsDataGrid = () => {

    //UseDispatch hook
    const dispatch = useDispatch()

    //UseSelector hook to access the staffAssignments and programToEdit from the Redux stores   
    const staffList = useSelector(store => store.staffAssignments);
    const programId = useSelector(store => store.programToEdit);

    //UseEffect hook runs on page load
    //this dispatch fetches the data on which programs staff are assigned to
    useEffect(()=> {
        dispatch({
            type: 'FETCH_STAFF_ASSIGNMENTS',
            payload: {
                id: programId.id
            }
        })
    }, [programId])

    //defining the column fields for the data grid
    const columns = [
        { field: 'first_name', headerName: 'Staff', width: 150 },
        { field: 'last_name', headerName: '', width: 150}
    ]

    return (
        <>
        <center>
            <div style={{ height: 350, width: 400 }}>
                <DataGrid
                    rows={staffList}
                    columns={columns}
                />
            </div>
        </center>
        </>
    )
}

export default StaffAssignmentsDataGrid;