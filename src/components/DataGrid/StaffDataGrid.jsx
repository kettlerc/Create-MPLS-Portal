import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const StaffDataGrid = () => {

    //UseSelector hook to access the teacher from the Redux stores   
    const staffList = useSelector(store => store.teacher);

    //defining the column fields for the data grid   
    const columns = [
        { field: 'first_name', headerName: 'First Name', width: 175 },
        { field: 'last_name', headerName: 'Last Name', width: 175 },
    ]

    return (
        <>
            <center>
                <div style={{ height: 250, width: '75%' }}>
                    <DataGrid 
                        rows={staffList} 
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

export default StaffDataGrid;