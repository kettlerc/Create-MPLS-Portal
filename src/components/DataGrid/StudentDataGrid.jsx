import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const StudentDataGrid = () => {

    //UseSelector hook to access the student from the Redux stores   
    const studentList = useSelector(store => store.student);
    
    //defining the column fields for the data grid
    const columns = [
        { field: 'first_name', headerName: 'First Name', width: 175 },
        { field: 'last_name', headerName: 'Last Name', width: 175 },
        { field: 'age', headerName: 'Age', width: 75, align: "center" },
        { field: 'grade_abbrev', headerName: 'Grade', width: 75, align: "center" },
        { field: 'ethnicity_name', headerName: 'Ethnicity', width: 300 },
        { field: 'gender_name', headerName: 'Gender', width: 100, align: "center" },
        { field: 'total_minutes', headerName: 'min', width : 75, align: 'center' },
    ]

    return (
        <>
            <center>
                <div style={{ height: 500, width: '75%' }}>
                    <DataGrid 
                        rows={studentList} 
                        columns={columns} 
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </div>
            </center>
        </>
    )
}

export default StudentDataGrid;
