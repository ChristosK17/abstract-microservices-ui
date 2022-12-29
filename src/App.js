import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Box, Tab, Tabs, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material/";

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

function PostSensor(props) {

  return (
    <p>Post Sensor</p>
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
    <p>Post Measurement</p>
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
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
        <PostSensor/>
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