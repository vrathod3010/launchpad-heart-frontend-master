import React, { useState, useContext, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from "recharts";
import { makeStyles } from '@material-ui/core/styles';
import {Switch, Collapse, FormControlLabel, TextField, Container, Divider} from '@material-ui/core';
import { PatientsContext } from '../../../contexts/patient/PatientsContext';
import { API } from 'helpers/index';
import {LoadingComponent} from 'components/common/loading';


const maximumDisplay = 10; //the maximum sensor display in realtime mode

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

let pulseRates = [];
let bloodGlucoses = [];
let bloodOxygens = [];

const SetData = (sensorData) => {
  pulseRates = [];bloodGlucoses = [];bloodOxygens = [];
  for (let index = sensorData.length - maximumDisplay; index < sensorData.length; index ++)
  {
    pulseRates.push(sensorData[index].pulseRate);
  }
  console.log(pulseRates);
  // setPulseRatesList(pulseRates);

  for (let index = sensorData.length - maximumDisplay; index < sensorData.length; index ++)
  {
    bloodGlucoses.push(sensorData[index].bloodGlucose);
  }
  console.log(bloodGlucoses);
  // setbloodGlucoseList(bloodGlucoses);

  for (let index = sensorData.length - maximumDisplay; index < sensorData.length; index ++)
  {
    bloodOxygens.push(sensorData[index].bloodOxygen);
  }
  console.log(bloodOxygens);
  // setBloodOxygenList(bloodOxygens);

}
const DisplayChart = (props) => {
  let data = props.data;
  let chartData = [];
  let value = "";
  switch (props.type)
  {
    case "pulseRate": value = "bpm";break;
    case "bloodGlucose": value = "mmol/L"; break;
    case "bloodOxygen": value = "mm/Hg"; break;
  }
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
      margin={{ top: 5, right: 20, bottom: 20, left: 10 }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <Tooltip/>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <XAxis dataKey="time">
        <Label value="min(s) ago" offset={0} position="bottom" />
      </XAxis> />
      <YAxis>
        <Label value = {value} angle = {-90} position = "left"/>
      </YAxis>/>
    </LineChart>
  )
}
export const PatientHealthData = () => {
  const classes = useStyles();

  const {selectedPatient} = useContext(PatientsContext);

  const [sensorData, setSensorData] = useState([]);
  const [sensorResponse, setSensorResponse] = useState(false);

  const [pulseRateList, setPulseRatesList] = useState([]);
  const [pulseRateChecked, setpulseRateChecked] = useState(false);

  const [bloodGlucoseList, setbloodGlucoseList] = useState([]);
  const [bloodGlucoseChecked, setbloodGlucoseChecked] = useState(false);

  const [bloodOxygenList, setBloodOxygenList] = useState([]);
  const [bloodOxygenChecked, setbloodOxygenChecked] = useState(false);
  

  useEffect(()=>{
    console.log("111111111111111111");
    setSensorResponse(false);
    API.getPatientSensorData(selectedPatient.id, setSensorData, setSensorResponse);
  },[selectedPatient])

  useEffect(()=>{
    if (sensorData.length != 0)
      SetData(sensorData);
  },[sensorData])
  

  const handlePulseRateSwitchChange = () => {
    setpulseRateChecked(prev => !prev);
  }
  const handleBloodGlucoseSwitchChange = () => {
    setbloodGlucoseChecked(prev => !prev);
  }
  const handleBloodOxygenSwitchChange = () => {
    setbloodOxygenChecked(prev => !prev);
  }

  return (
    (!sensorResponse)? <LoadingComponent/>:
    <div>
      <Container>
        <p className = {classes.text}>Pulse rate</p>
        <TextField
          id="pulse-rate"
          label = "Last value"
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
            <DisplayChart data = {pulseRates} type = "pulseRate"/>
          </Collapse>
        </div>
      </Container>
      <Divider/>
      <Container>
        <p className = {classes.text}>Blood Glucose</p>
        <TextField
          id="blood-glucose"
          label = "Last value"
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
            <DisplayChart data = {bloodGlucoses} type = "bloodGlucose"/>
          </Collapse>
        </div>
      </Container>
      <Divider/>
      <Container>
        <p className = {classes.text}>Blood Oxygen</p>
        <TextField
          id="blood-oxygen"
          label = "Last value"
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
            <DisplayChart data = {bloodOxygens} type = "bloodOxygen"/>
          </Collapse>
        </div>
      </Container>
    </div>
  );
}
