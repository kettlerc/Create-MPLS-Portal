import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css'
import { Pie, Line } from 'react-chartjs-2';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import getMMDDYY from '../../utility/getMMDDYY';
import { Typography } from '@mui/material';
import getMonthDDYYYY from '../../utility/getMonthDDYYYY';
import AdminViewConfig from './AdminViewConfig';

//This function handles everything for the Dashboard page
function Dashboard() {

  //useDispatch hook
  const dispatch = useDispatch();

  //UseSelector hook to access various properties and grids from the Redux stores
  const { 
    ethnicity, 
    gender, 
    minutesByMonth,
    occurrenceGrid,
    studentGrid,
    teacherGrid 
  } = useSelector(store => store.charts);
  
  //UseEffect hook runs on page load
  //this dispatch fetches all of the relevant data for the dashboard
  useEffect(() => {
    dispatch({ type: 'FETCH_DASHBOARD'});
  }, [])

  //Function for handling the Ethnicity pie graph
  const ethnicityPieGraph = () => {
    const ethnicityNames = ethnicity.map( (e) => e.name );
    const ethnicityTotals = ethnicity.map( (e) => e.total );

    const ethnicityData = {
      labels: ethnicityNames,
      datasets: [
        {
          label: 'Ethnicity Data',
          data: ethnicityTotals,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(122, 69, 50, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(122, 69, 50, 1)',

          ],
          borderWidth: 1,
        },
      ],
    };
    return <Pie id = "ethnicityPie" data={ethnicityData} />
  } //end ethnicityPieGraph
  
  //Function for handling the Gender pie graph
  const genderPieGraph = () => {
    const genderNames = gender.map( (g) => g.name );
    const genderTotals = gender.map( (g) => g.total );
    const genderData = {
      labels: genderNames,
      datasets: [
        {
          label: 'Gender Data',
          data: genderTotals,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return <Pie id = "genderPie" data={genderData} />
  } //end genderPieGraph

    //Function for handling Minutes by Month chart
    const minutesByMonthLineGraph = () => {
      let totalMonths = 12; // Twelve months a year on earth.
      let recordIndex = 0; // Need to start the process somewhere, 
      let monthlyMinutes = [] // Payload for sending data to graph
      
      //Cycle through each month
      for (let month = 1; month <= totalMonths; month++) {
        //Check if there is a record to compare, and check if the month number matches
        if (minutesByMonth[recordIndex] && minutesByMonth[recordIndex].month_number === month){
          //If so push info to array and increment the array index
          monthlyMinutes.push(minutesByMonth[recordIndex].total_minutes);
          recordIndex++;
        } else {
          //If no record is found push 0 minutes
          monthlyMinutes.push(0);
        }
      }

      const enrollmentData = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: 'Student Total Minutes by Month',
            data: monthlyMinutes,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
      const barOptions = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      return <Line id ="studentEnrollment" data={enrollmentData} options={barOptions} style={{width: "20em", height: "100em"}} />
    } //end minutesByMonthLineGraph   

    //Recent Programs Data Grid
    const occurrenceDataGrid = () => {

      let formattedOccurrenceGrid = occurrenceGrid.map((object) => {
        return { ...object, date: getMMDDYY(object.date) }
      });
      const columns = [
        { field: 'date', headerName: 'Date', width: 100 },
        { field: 'program_name', headerName: 'Name', width: 170 },
        { field: 'program_location', headerName: 'Location', width: 150 },
        { field: 'teacher_first_name', headerName: 'First Name', width: 100 },
        { field: 'teacher_last_name', headerName: 'Last Name', width: 100 },
        { field: 'duration', headerName: 'Duration', width: 100 },
        { field: 'volunteers', headerName: 'Volunteers', width: 100 },
        { field: 'student_count', headerName: 'Students', width: 100 },
      ];
      return (
        <div style={{ height: 500, width: '90%' }}>
          <DataGrid  
            rows={formattedOccurrenceGrid} 
            columns={columns} 
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>)
    } //end occurrenceDataGrid
    
    //All students Data Grid
    const studentDataGrid = () => {

      const columns = [
        { field: 'last_name', headerName: 'Last Name', width: 175 },
        { field: 'first_name', headerName: 'First Name', width: 175 },
        { field: 'ethnicity', headerName: 'Ethnicity', width: 175 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'grade', headerName: 'Grade', width: 100 },
        { field: 'total_minutes', headerName: 'Total Minutes', width: 200 },
      ];
      return (
        <div style={{ height: 500, width: '90%' }}>
          <DataGrid  
            rows={studentGrid} 
            columns={columns} 
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>)
    } //end studentDataGrid

    //All teachers Data Grid
    const teacherDataGrid = () => {

      const columns = [
        { field: 'last_name', headerName: 'Last Name', width: 200 },
        { field: 'first_name', headerName: 'First Name', width: 200 },
        { field: 'total_minutes', headerName: 'Total Minutes', width: 200 },
      ];
      return (
        <div style={{ height: 300, width: '90%' }}>
          <DataGrid  
            rows={teacherGrid} 
            columns={columns} 
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>)
    } //end teacherDataGrid


return(  
  <>
  <center>
    <div id = "flex-chart-container" style={{justifyContent: 'center'}}>
        <div class ="flex-child" style={{width: "20em", height: "20em", margin: 10}}>
        <Typography variant="h6">ETHNICITY</Typography>
        {ethnicity && ethnicityPieGraph()}
        
        </div>

        <div div class ="flex-child" style={{width: "20em", height: "20em", margin: 10}}>
        <Typography variant="h6">GENDER</Typography>
        {gender && genderPieGraph()}
        </div>

        <div div class ="flex-child" style={{width: "20em", height: "20em", margin: 10}}>
        <Typography variant="h6">TOTAL MINUTES PER MONTH</Typography>
        {minutesByMonth && minutesByMonthLineGraph()}
        </div>

    </div>
    <div style={{ height: 500, width: '80%', marginTop: 100 }}>
      <Typography variant="h5" sx={{ marginBottom: 5}}>RECENT PROGRAMS</Typography>
      {occurrenceGrid && occurrenceDataGrid()}
    </div>
    <div style={{ height: 500, width: '80%', marginTop: 125 }}>
      <Typography variant="h5" sx={{ marginBottom: 5}}>STUDENT ATTENDANCE</Typography>
      {studentGrid && studentDataGrid()}
    </div>
    <div style={{ height: 300, width: '80%', marginTop: 125, marginBottom: 125 }}>
      <Typography variant="h5" sx={{ marginBottom: 5}}>STAFF ATTENDANCE</Typography>
      {teacherGrid && teacherDataGrid()}
    </div>
    <div>
        <AdminViewConfig />
    </div>
  </center>
  </>
);
}

export default Dashboard;