import React, { useState, useContext, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip} from "recharts";
import { makeStyles } from '@material-ui/core/styles';
import {Switch, Collapse, FormControlLabel, TextField, Container, Divider, FormControl, InputLabel, Select} from '@material-ui/core';
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
  formControl: {
    marginTop: 15,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: 150
  },
}));


const DisplayChart = (props) => {
  let data = props.data;
  let viewMode = props.viewMode;
  //console.log("DisplayChart " + viewMode + " " + props.type);
  //console.log(data);
  let chartData = [];
  let value = "";
  switch (props.type)
  {
    case "pulseRate": value = "bpm";break;
    case "bloodGlucose": value = "mmol/L"; break;
    case "bloodOxygen": value = "mm/Hg"; break;
  }
  
  //let sum = 0;
  const period = (viewMode == 0)?1:10;
  for (let i = 0; i < data.length; i++)
  {
    let displayData = {};
    if ((i+1)%period==0)
    {
      let time = new Date(data[i].time);
      //console.log(time);
      displayData.time = time.getHours() + ":" + time.getMinutes();
      displayData.value = data[i].rate;
      //console.log(displayData);
      chartData.unshift(displayData);
    }
  }
  //console.log(chartData);
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
        <Label value="time (hh:mm)" offset={0} position="bottom" />
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
  const [minutes, setMinutes] = useState(0);

  const [sensorData, setSensorData] = useState([]);
  const [sensorResponse, setSensorResponse] = useState(false);

  const [pulseRateList, setPulseRatesList] = useState([]);
  const [recentPulseRateList, setRecentPulseRatesList] = useState([]);
  const [prViewMode, setPrViewMode] = useState(0);
  const [pulseRateChecked, setpulseRateChecked] = useState(false);

  const [bloodGlucoseList, setbloodGlucoseList] = useState([]);
  const [recentBloodGlucoseList, setRecentBloodGlucoseList] = useState([]);
  const [bgViewMode, setBgViewMode] = useState(0);
  const [bloodGlucoseChecked, setbloodGlucoseChecked] = useState(false);

  const [bloodOxygenList, setBloodOxygenList] = useState([]);
  const [recentBloodOxygenList, setRecentBloodOxygenList] = useState([]);
  const [boViewMode, setBoViewMode] = useState(0);
  const [bloodOxygenChecked, setbloodOxygenChecked] = useState(false);
  

  useEffect(()=>{
    if (selectedPatient!==null)
    {
      //console.log("111111111111111111");
      setSensorResponse(false);
      API.getPatientSensorData(selectedPatient.id, setSensorData, setSensorResponse);
    }
    else
    {//free memory when no patient is selected
      setSensorData([]);
    }
  },[selectedPatient])

  useEffect(()=>{
    //console.log("useEffect minutes");
    let interval = setInterval(()=>{
      setMinutes(minutes => minutes + 1);
    }, 60000);
    API.getPatientSensorData(selectedPatient.id, setSensorData, setSensorResponse);
    return () => {
      //console.log("after use effect");
      clearInterval(interval);
    }
  },[minutes])

  useEffect(()=>{
    if (sensorData.length !== 0)
      SetData(sensorData);
  },[sensorData])

  useEffect(()=>{
    

  }, minutes)
  

  const SetData = (sensorData) => {
    let pulseRates = []; let recentPulseRates = [];
    let bloodGlucoses = []; let recentBloodGlucoses = [];
    let bloodOxygens = []; let recentBloodOxygen = [];
    for (let index = 0; index < sensorData.length; index ++)
    {
      //console.log("Set Data");
      //console.log(new Date(sensorData[index].logTime));
      pulseRates.push({rate:sensorData[index].pulseRate, time: sensorData[index].logTime});
      bloodGlucoses.push({rate:sensorData[index].bloodGlucose, time:sensorData[index].logTime});
      bloodOxygens.push({rate:sensorData[index].bloodOxygen, time:sensorData[index].logTime});
      if (index < maximumDisplay)
      {
        recentPulseRates.push({rate:sensorData[index].pulseRate, time: sensorData[index].logTime});
        recentBloodGlucoses.push({rate:sensorData[index].bloodGlucose, time:sensorData[index].logTime});
        recentBloodOxygen.push({rate:sensorData[index].bloodOxygen, time:sensorData[index].logTime});
      }
    }
    //console.log(pulseRates);
    setPulseRatesList(pulseRates);
    setRecentPulseRatesList(recentPulseRates);
    //console.log(bloodGlucoses);
    setbloodGlucoseList(bloodGlucoses);
    setRecentBloodGlucoseList(recentBloodGlucoses);
    //console.log(bloodOxygens);
    setBloodOxygenList(bloodOxygens);
    setRecentBloodOxygenList(recentBloodOxygen);
  
  }

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
          value={sensorData[0].pulseRate}
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
        {!pulseRateChecked?"":
          <FormControl
            className = {classes.formControl}
            >
            <InputLabel shrink={true}>View mode</InputLabel>
            <Select
              native
              value={prViewMode}
              onChange={(e)=>{setPrViewMode(e.target.value)}}
              labelWidth={50}
              //disabled= {!editFlag}
              //InputLabelProps={{shrink: true}}
            >
              <option value={0}>Recent data</option>
              <option value={1}>Older data</option>
            </Select>
          </FormControl>
        }
        <div className={classes.container}>
          <Collapse in={pulseRateChecked} collapsedHeight="0px">
            <DisplayChart data = {prViewMode == 0?recentPulseRateList:pulseRateList} type = "pulseRate" viewMode = {prViewMode}/>
          </Collapse>
        </div>
      </Container>
      <Divider/>
      <Container>
        <p className = {classes.text}>Blood Glucose</p>
        <TextField
          id="blood-glucose"
          label = "Last value"
          value={sensorData[0].bloodGlucose}
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
        {!bloodGlucoseChecked?"":
          <FormControl
            className = {classes.formControl}
            >
            <InputLabel shrink={true}>View mode</InputLabel>
            <Select
              native
              value={bgViewMode}
              onChange={(e)=>{setBgViewMode(e.target.value)}}
              labelWidth={50}
              //disabled= {!editFlag}
              //InputLabelProps={{shrink: true}}
            >
              <option value={0}>Recent data</option>
              <option value={1}>Older data</option>
            </Select>
          </FormControl>
        }
        <div className={classes.container}>
          <Collapse in={bloodGlucoseChecked} collapsedHeight="0px">
            <DisplayChart data = {bgViewMode==0?recentBloodGlucoseList:bloodGlucoseList} type = "bloodGlucose" viewMode = {bgViewMode}/>
          </Collapse>
        </div>
      </Container>
      <Divider/>
      <Container>
        <p className = {classes.text}>Blood Oxygen</p>
        <TextField
          id="blood-oxygen"
          label = "Last value"
          value={sensorData[0].bloodOxygen}
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
        {!bloodOxygenChecked?"":
          <FormControl
            className = {classes.formControl}
            >
            <InputLabel shrink={true}>View mode</InputLabel>
            <Select
              native
              value={boViewMode}
              onChange={(e)=>{setBoViewMode(e.target.value)}}
              labelWidth={50}
              //disabled= {!editFlag}
              //InputLabelProps={{shrink: true}}
            >
              <option value={0}>Recent data</option>
              <option value={1}>Older data</option>
            </Select>
          </FormControl>
        }
        <div className={classes.container}>
          <Collapse in={bloodOxygenChecked} collapsedHeight="0px">
            <DisplayChart data = {boViewMode==0?recentBloodOxygenList:bloodOxygenList} type = "bloodOxygen" viewMode={boViewMode}/>
          </Collapse>
        </div>
      </Container>
    </div>
  );
}
