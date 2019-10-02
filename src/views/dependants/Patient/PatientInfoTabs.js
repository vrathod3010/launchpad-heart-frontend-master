import React, {useContext}from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {PatientPersonalInfomation} from './PatientPersonalInfomation';
import {PatientHealthData} from './PatientHealthData';
import { PatientsContext } from 'contexts/patient/PatientsContext';

const TabPanel = (props)=>{
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index)=>{
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    backgroundColor: "#edf4ff"
  },
  smallTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  mediumTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));

export const PatientInfoTabs = ()=>{
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {selectedPatient} = useContext(PatientsContext);

  const handleChange = (event, newValue)=>{
    setValue(newValue);
  }
  // if (!selectedPatient) return (<div></div>);
  // else 
  return (
    <div className={classes.root}>
      
      <Tabs variant="fullWidth" className={classes.tab} value={value} onChange={handleChange} aria-label="patient data tabs">
        <Tab label="Personal Infomation" {...a11yProps(0)} />
        {selectedPatient===null?<div></div>:
        <Tab label="Health record" {...a11yProps(1)} />}
        {/* <Tab label="Realtime data" {...a11yProps(2)} /> */}
      </Tabs>
      
      <TabPanel value={value} index={0}>
        <PatientPersonalInfomation/>
      </TabPanel>
      {selectedPatient===null?<div></div>:
      <TabPanel value={value} index={1}>
        <PatientHealthData/>
      </TabPanel>
      }
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
}