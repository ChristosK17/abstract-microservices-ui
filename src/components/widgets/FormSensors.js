import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, FormControl, FormGroup, FormControlLabel, Button, Box, Tab, Tabs, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material/";


const FormSensors = () => {
    const [sensorId, setSensorId] = useState();
    const [type, setType] = useState();
    const [vendorName, setVendorName] = useState();
    const [vendorEmail, setVendorEmail] = useState();
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [description, setDescription] = useState();

    function getValues() {
        return [sensorId, type, vendorName, vendorEmail, description, lat, lon];
    }
    
    const handlePostButton = async () => {
        const post = {
            "sensorId": sensorId,
            "type": type,
            "vendorName": vendorName,
            "vendorEmail": vendorEmail,
            "description": description,
            "location": `{'latitude': ${lat}, 'longitude': ${lon}}`
          };

        await axios.post('http://localhost:5000/sensors/', post);
    }

    return (
        <Box ml= '1rem' mt= '1px'>
          <Grid item md={10}>          
            <Grid container spacing={2}>
                <FormControl component="fieldset" >
                    <FormGroup aria-label="postSensor" id="postSensor" name="postSensor">
                    <Grid item xs={20}>
                        <h2>Provide Sensor ID and Sensor Type</h2>
                        <TextField id="sensorId" label="Sensor ID" variant="outlined" value={sensorId} onChange={(e) => setSensorId(e.target.value)} />
                        <TextField id="type" label="Sensor Type" variant="outlined" value={type} onChange={(e) => setType(e.target.value)} />
                    </Grid>
                    <Grid item xs={20}>
                        <h2>Provide vendors information</h2>
                        <TextField id="vendorName" label="Vendor Name" variant="outlined" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
                        <TextField id="vendorEmail" label="Vendor Email" variant="outlined" value={vendorEmail} onChange={(e) => setVendorEmail(e.target.value)} />
                    </Grid>
                    <Grid item xs={20}>
                        <h2>Provide the location of the sensor and any additional information</h2>
                        <FormControlLabel control={<TextField id="latitude" label="Latitude" variant="outlined" value={lat} onChange={(e) => setLat(e.target.value)} />}/>
                        <FormControlLabel control={<TextField id="longitude" label="Longitude" variant="outlined" value={lon} onChange={(e) => setLon(e.target.value)} />}/>
                        <br></br><br></br>
                        <FormControlLabel control={<TextField id="description" label="Description" variant="outlined" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)}  />}/>
                    </Grid>
                    </FormGroup>
                </FormControl>
                </Grid>
                <br></br>
                <Button variant="contained" onClick={handlePostButton}>Post</Button>
            </Grid>
      </Box>
    );
}

export default FormSensors;