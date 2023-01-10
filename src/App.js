import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { InputLabel, Select, MenuItem, Grid, FormControl, FormGroup, FormControlLabel, Button, Box, Tab, Tabs, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material/";
import { styled } from '@mui/material/styles';
import PostSensorView from "./components/views/PostSensorView";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  height: 100,
  width: 100,
  lineHeight: '60px',
}));

function GetSensor(props) {

  const [data, setData] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const getData = async ()=>{
    const response = await axios.get("http://localhost:5000/sensors")
    setData(response.data)
  }

  useEffect(()=>{
    getData()
   },[refreshData])

  return (
    <div>

      <Button onClick={() => setRefreshData(!refreshData)}>
          Refresh
      </Button>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
          <TableCell>Sensor ID</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Vendor Name</TableCell>
          <TableCell>Vendor Email</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(item => (
            //  key={item.sensorId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableRow>
              <TableCell component="th" scope="row">{item.sensorId}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.vendorName}</TableCell>
              <TableCell>{item.vendorEmail}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );

}

function GetMeasurement(props) {

  const [data, setData] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const getData = async ()=>{
    const response = await axios.get("http://localhost:5000/measurements")
    setData(response.data)
  }

  useEffect(()=>{
    getData()
   },[refreshData])

  return (
    <div>
      <Button onClick={() => setRefreshData(!refreshData)}>
          Refresh
      </Button>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
          <TableCell>Sensor ID</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Value</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(item => (
            //  key={item.sensorId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableRow>
              <TableCell component="th" scope="row">{item.sensorId}</TableCell>
              <TableCell>{item.measurementType}</TableCell>
              <TableCell>{item.measurementValue}</TableCell>
              <TableCell>{item.measurementDate}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );

}

function PostMesurement(props) {

  return (
    <Box sx={{ ml: '1rem', mt: '1px' }}>
      <Grid container spacing={2}>
        <FormControl component="fieldset" >
          <FormGroup aria-label="postSensor" id="postSensor" name="postSensor">
            <Grid item xs={20}>
              <h2>Provide Sensor ID and Sensor Type</h2>
              <FormControlLabel control={<TextField id="sensorId" label="Sensor ID" variant="outlined" />}/>
              <FormControlLabel control={<TextField id="type" label="Sensor Type" variant="outlined" />}/>
            </Grid>
            <Grid item xs={20}>
              <h2>Provide measurement characteristics</h2>
              <FormControlLabel control={<TextField id="measurementValue_val" label="Value" variant="outlined" />}/>
              <InputLabel id="measurementValue_unit">Unit</InputLabel>
              <Select id="measurementValue_unit" value="1" label="Age" >
                <MenuItem value={1}>Celcius</MenuItem>
                <MenuItem value={2}>Fahrenheit</MenuItem>
                <MenuItem value={3}>Kelvin</MenuItem>
                <MenuItem value={4}>Absolute Humidity(gr/m3)</MenuItem>
                <MenuItem value={5}>Absolute Humidity(gr/kg)</MenuItem>
                <MenuItem value={6}>Relative Humidity</MenuItem>
                <MenuItem value={7}>Specific Humidity</MenuItem>
                <MenuItem value={8}>Acoustic UNIT1</MenuItem>
                <MenuItem value={9}>Acoustic UNIT2</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={20}>
              <h2>Provide the location of the sensor and any additional information</h2>
              <FormControlLabel control={<TextField id="latitude" label="Latitude" variant="outlined" />}/>
              <FormControlLabel control={<TextField id="longitude" label="Longitude" variant="outlined" />}/>
              <br></br><br></br>
              <FormControlLabel control={<TextField id="description" label="Description" variant="outlined" multiline rows={4}  />}/>
            </Grid>
          </FormGroup>
        </FormControl>
      </Grid>
      <br></br>
      <Button variant="contained">Post</Button>
    </Box>
  );

}

function GetMeasurementByType(props) {

  return (
    <p>Get Measurement by Type</p>
  );

}

function GetMeasurementByLocation(props) {

  return (
    <p>Get Measurement by Location</p>
  );

}

function GetMeasurementByTimestamp(props) {

  return (
    <p>Get Measurement by Timestamp</p>
  );

}

export default function AbstractMicroservices() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Get Sensor" />
          <Tab label="Post Sensor" />
          <Tab label="Get Measurements" />
          <Tab label="Post Measurement" />
          <Tab label="Get Measurement by Type" />
          <Tab label="Get Measurement by Location" />
          <Tab label="Get Measurement by Timestamp" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GetSensor/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PostSensorView/>        
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GetMeasurement/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PostMesurement/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <GetMeasurementByType/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <GetMeasurementByLocation/>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <GetMeasurementByTimestamp/>
      </TabPanel>
    </Box>
  );
}