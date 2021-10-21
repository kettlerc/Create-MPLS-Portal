import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const ProgramDataGrid = () => {

    //UseSelector hook to access the program from the Redux stores      
    const programList = useSelector(store => store.program);

    //defining the column fields for the data grid
    const columns = [
        { field: 'name', headerName: 'Program Name', width: 200 },
        { field: 'location', headerName: 'Location', width: 200 },
        { field: 'type_name', headerName: 'Type', width: 150 },
    ]

    return (
        <>
            <center>
                <div style={{ height: 300, width: '75%' }}>
                    <DataGrid
                        rows={programList}
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

export default ProgramDataGrid;
