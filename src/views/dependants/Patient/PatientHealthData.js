import React, { useContext } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from "recharts";
import { makeStyles } from '@material-ui/core/styles';
import {Switch, Collapse, FormControlLabel, TextField, Container, Divider} from '@material-ui/core';
import { SelectedPatientContext } from '../../../contexts/patient/SelectedPatientContext';



const useStyles = makeStyles(theme => ({
  root: {
    height: 180,
  },
  text: {
    marginTop: 0,
    marginBottom: 0
  },
  switch: {
    marginTop: 20,
  },
  smallTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: 100,
  },
}));

const DisplayChart = (props) => {
  let data = props.data;
  let chartData = [];
  for (let i = 0; i < data.length; i++)
  {
    let displayData = {};
    displayData.time = data.length - i;
    displayData.value = data[i];
    console.log(displayData);
    chartData.push(displayData);
  }
  return (
    <LineChart
      width={600}
      height={350}
      data={chartData}
      margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <Tooltip/>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <XAxis dataKey="time">
        <Label value="hour(s) ago" offset={0} position="bottom" />
      </XAxis> />
      <YAxis />
    </LineChart>
  )

}
export const PatientHealthData = () => {
  const classes = useStyles();
  const [pulseRateChecked, setpulseRateChecked] = React.useState(false);
  const [bloodGlucoseChecked, setbloodGlucoseChecked] = React.useState(false);
  const [bloodOxygenChecked, setbloodOxygenChecked] = React.useState(false);
  const {selectedPatient} = useContext(SelectedPatientContext);

  let pulseRates = selectedPatient.healthData.pulseRates;
  let bloodGlucoses = selectedPatient.healthData.bloodGlucoses;
  let bloodOxygens = selectedPatient.healthData.bloodOxygens;
  

  function handlePulseRateSwitchChange() {
    setpulseRateChecked(prev => !prev);
  }
  function handleBloodGlucoseSwitchChange() {
    setbloodGlucoseChecked(prev => !prev);
  }
  function handleBloodOxygenSwitchChange() {
    setbloodOxygenChecked(prev => !prev);
  }

  return (
    <div>
      <Container>
        <p className = {classes.text}>Pulse rate</p>
        <TextField
          id="pulse-rate"
          value={pulseRates[pulseRates.length - 1]}
          className={classes.smallTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant = "outlined"
        />
        <FormControlLabel className = {classes.switch}
          control={<Switch checked={pulseRateChecked} onChange={handlePulseRateSwitchChange} />}
          label="Show chart"
        />
        <div className={classes.container}>
          <Collapse in={pulseRateChecked} collapsedHeight="0px">
            <DisplayChart data = {pulseRates}/>
          </Collapse>
        </div>
      </Container>
      <Divider/>
      <Container>
        <p className = {classes.text}>Blood Glucose</p>
        <TextField
          id="blood-glucose"
          value={bloodGlucoses[bloodGlucoses.length - 1]}
          className={classes.smallTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant = "outlined"
        />
        <FormControlLabel className = {classes.switch}
          control={<Switch checked={bloodGlucoseChecked} onChange={handleBloodGlucoseSwitchChange} />}
          label="Show chart"
        />
        <div className={classes.container}>
          <Collapse in={bloodGlucoseChecked} collapsedHeight="0px">
            <DisplayChart data = {bloodGlucoses}/>
          </Collapse>
        </div>
      </Container>
      <Divider/>
      <Container>
        <p className = {classes.text}>Blood Oxygen</p>
        <TextField
          id="blood-oxygen"
          value={bloodOxygens[bloodOxygens.length - 1]}
          className={classes.smallTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant = "outlined"
        />
        <FormControlLabel className = {classes.switch}
          control={<Switch checked={bloodOxygenChecked} onChange={handleBloodOxygenSwitchChange} />}
          label="Show chart"
        />
        <div className={classes.container}>
          <Collapse in={bloodOxygenChecked} collapsedHeight="0px">
            <DisplayChart data = {bloodOxygens}/>
          </Collapse>
        </div>
      </Container>
    </div>
  );
}
