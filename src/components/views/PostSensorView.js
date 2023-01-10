import { Grid, Typography, Paper } from "@mui/material/";
import { useState } from "react";
import axios from 'axios';
import FormSensor from "../widgets/FormSensors";
import CardJSON from "../widgets/CardJSON";


const PostSensorView = () => {
  const [sensorId, type, vendorName, vendorEmail, description, lat, lon] = [1,2,3,4,5,6,7];

  return (
    <Grid container>
        <Grid item md={6}>
          <FormSensor/>
        </Grid>
        <Grid item md={6}>
          <CardJSON sensorId={sensorId} type={type} vendorName={vendorName} vendorEmail={vendorEmail} description={description} lat={lat} lon={lon}/>
        </Grid>
    </Grid>
  );
  
}

export default PostSensorView;