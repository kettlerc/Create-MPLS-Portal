import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

//function handling the data grid showing all of the programs
const ClassListDataGrid = () => {

    //UseDispatch hook
    const dispatch = useDispatch()

    //UseSelector hook to access the studentAssignments and programToEdit from the Redux stores   
    const classList = useSelector(store => store.studentAssignments);
    const programId = useSelector(store => store.programToEdit);

    //UseEffect hook runs on page load
    //this dispatch fetches the data on which programs students are assigned to
    useEffect(()=> {
        dispatch({
            type: 'FETCH_STUDENT_ASSIGNMENTS',
            payload: {
                id: programId.id
            }
        })
    }, [programId])

    //defining the column fields for the data grid
    const columns = [
        { field: 'first_name', headerName: 'Student(s)', width: 150 },
        { field: 'last_name', headerName: '', width: 150}
    ]

    return (
        <>
        <center>
            <div style={{ height: 350, width: 400 }}>
                <DataGrid
                    rows={classList}
                    columns={columns}
                />
            </div>
        </center>
        </>
    )
}

export default ClassListDataGrid;