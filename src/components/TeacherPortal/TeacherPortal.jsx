import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material/';
import { Typography, IconButton, Container } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import getMMYY from '../../utility/getMMYY';

//function for handling Teacher Portal page
function TeacherPortal() {

    //UseDispatch and UseHistory hooks
    const dispatch = useDispatch();
    const history = useHistory();

    //UseSelector hooks to access the user, programsByTeacher, and occurrenceByTeacher from the Redux stores   
    const user = useSelector(store => store.user);
    const programs = useSelector(store => store.programsByTeacher);
    const occurrence = useSelector(store => store.occurrenceByTeacher);

    //UseEffect runs on page load
    //these dispatchers gather programs by teacher, and attendances taken
    useEffect(() => {
        dispatch({ type: 'FETCH_PROGRAMS_BY_TEACHER'});
        dispatch({ type: 'FETCH_TEACHER_OCCURRENCES', payload: {id: user.id}});
    }, [])

    //function for submitting attendance
    const onAttendanceButton = (id) => {
        dispatch({ type: 'SET_PROGRAM_OCCURRENCE', payload: { id, history } })
    }

    //navigates to specific attendance record 
    const onEditAttendance = (id) => {
        history.push(`/attendance/${id}`)
    }

    return (
        <>
        <Container sx={{ width: 370, borderBottom: 3, borderColor: 'grey.500' }}>
            <img src="design_a.png" width="400" height="250"/>
            <Typography variant="h4" align="left" sx={{ marginLeft: 2, marginBottom: 2}}>{user.first_name} {user.last_name}</Typography>
        </Container>
        <center>
            <Paper elevation={12} sx={{ width: 370 }}>
            <Typography variant="h5" sx={{ marginBottom: -4, marginTop: 3 }}>MY PROGRAMS</Typography>
            <TableContainer sx={{ maxWidth: 350, marginBottom: 5, marginTop: 5 }}>
                <Table aria-label="program list">
                    <TableHead sx={{ border: 3, borderColor: 'grey.500', backgroundColor: "#9acde3" }}>
                        <TableRow>
                            <TableCell sx={{ fontSize: 18}}>PROGRAM</TableCell>
                            <TableCell align="center" sx={{ fontSize: 18 }}>LOCATION</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { Object.keys(programs).length > 0 && programs.map((prg) => (
                            <TableRow
                                key={prg.id}
                                sx={{ '&:last-child td, &:last-child th': { borderBottom: 3, borderColor: 'grey.500' } }}
                                >
                                <TableCell align="left" sx={{ fontSize: 16 }}>{prg.name}</TableCell>
                                <TableCell align="left" sx={{ fontSize: 16 }}>{prg.location}</TableCell>
                                <TableCell ><IconButton onClick={() => onAttendanceButton(prg.assignment_id)}><PlaylistAddCheckIcon/></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>

            <Paper elevation={12} sx={{ width: 370 }}>
                <Typography variant="h5" sx={{ marginBottom: -4, marginTop: 2 }}>RECENT ATTENDANCE</Typography>
                <TableContainer sx={{ maxWidth: 350, marginBottom: 5, marginTop: 5 }}>
                <Table aria-label="recent attendance">
                    <TableHead sx={{ border: 3, borderColor: 'grey.500', backgroundColor: "#9acde3" }}>
                        <TableRow>
                            <TableCell sx={{ fontSize: 18}}>DATE</TableCell>
                            <TableCell sx={{ fontSize: 18}}>PROGRAM</TableCell>
                            <TableCell align="center" sx={{ fontSize: 18 }}>LOCATION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { Object.keys(occurrence).length > 0 && occurrence.map((occ) => (
                            <TableRow
                                key={occ.id}
                                sx={{ '&:last-child td, &:last-child th': { borderBottom: 3, borderColor: 'grey.500' } }}
                                onClick={()=>onEditAttendance(occ.id)}
                                >
                                <TableCell align="left" sx={{ fontSize: 16 }}>{getMMYY(occ.at_date)}</TableCell>
                                <TableCell align="left" sx={{ fontSize: 16 }}>{occ.name}</TableCell>
                                <TableCell align="left" sx={{ fontSize: 16 }}>{occ.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
            <LogOutButton />
        </center>
        </>
    )
}

export default TeacherPortal;