import { Paper, Typography } from "@mui/material";

function CardJSON(sensorId, type, vendorName, vendorEmail, description, lat, lon){
    return (
        <Paper elevation={3}>
            <Typography>
                {`{
                    "sensorId": ${sensorId},
                    "type": ${type},
                    "vendorName": ${vendorName},
                    "vendorEmail": ${vendorEmail},
                    "description": ${description},
                    "location": "{'latitude': ${lat}, 'longitude': ${lon}}"
                }`};
            </Typography>
        </Paper>
    );
}

export default CardJSON;