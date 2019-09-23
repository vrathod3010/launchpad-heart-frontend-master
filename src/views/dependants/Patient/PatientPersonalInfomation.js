import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, TextField, Divider, Typography, FormControl, InputLabel, Select, Button} from '@material-ui/core';
import { PatientsContext } from 'contexts/patient/PatientsContext';
import { API } from 'helpers/index';
import {LoadingComponent} from 'components/common/loading';

const titleArray = ["Mr","Ms","Mrs","Dr"];
const maritalStatusArray = ["Married","Divorced","Single","Widowed","Separated","Domestic Partner"];
const stateArray = ["QLD","VIC","NSW","ACT","WA","TAS","SA","NT"];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  },
  textFieldEdit: {
    margin: theme.spacing(1),
    backgroundColor: "#edf4ff"
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  formControlEdit: {
    margin: theme.spacing(1),
    width: '100%',
    backgroundColor: "#edf4ff"
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button:{
    marginTop: 50,
    // marginLeft:'35%',
    width: '100%'
  }, 
  message:{
    //width: '100%',
    textAlign: 'center',
    color: 'red'
  }
}));

export const PatientPersonalInfomation = () =>{
  const classes = useStyles();
  const {selectedPatient, setSelectedPatient} = useContext(PatientsContext);
  const {editFlag, setEditFlag} = useContext(PatientsContext);
  const [contact, setContact] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateIdentitySuccess, setUpdateIdentitySuccess] = useState(false);
  const [updateContactSuccess, setUpdateContactSuccess] = useState(false);
  const [updateInsuranceSuccess, setUpdateInsuranceSuccess] = useState(false);
  //patient basic info
  const [contactResponse, setContactResponse] = useState(false);
  const [insuranceResponse, setInsuranceResponse] = useState(false);
  const [patientTitle, setPatientTitle] = useState("");
  const [patientFirstName, setPatientFirstName] = useState("");
  const [patientMiddleName, setPatientMiddleName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");
  const [patientDoB, setPatientDoB] = useState("");
  const [patientSex, setPatientSex] = useState("");
  const [patientMaritalStatus, setPatientMaritalStatus] = useState("");
  const [patientMedNumber, setPatientMedNumber] = useState("");
  //patient contact info
  const [contactAddress, setContactAddress] = useState("");
  const [contactSuburb, setContactSuburb] = useState("");
  const [contactPostcode, setContactPostcode] = useState("");
  const [contactState, setContactState] = useState("");
  const [contactCountry, setContactCountry] = useState("");
  const [contactHomePhone, setContactHomePhone] = useState("");
  const [contactMobileNumber, setContactMobileNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactEmergencyContact, setContactEmergencyContact] = useState("");
  const [contactEmergencyPhone, setContactEmergencyPhone] = useState("");
  //insurance info
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [insuranceEffectiveDate, setInsuranceEffectiveDate] = useState("");
  const [insuranceExpiryDate, setInsuranceExpiryDate] = useState("");

  //everytime user enter edit mode, set update status to false
  useEffect(()=>{
    if (editFlag)
    {
      setUpdateIdentitySuccess(false);
      console.log("111111111111111");
      setUpdateContactSuccess(false);
      setUpdateInsuranceSuccess(false);
    }
  },[editFlag])

  //only turn off edit mode if all info is updated successfully
  useEffect(()=>{
    if(updateIdentitySuccess && updateContactSuccess)
      setEditFlag(false);
  }, [updateIdentitySuccess, updateContactSuccess, updateInsuranceSuccess])

  useEffect(()=>{
    setIdentityInfo();
    setContactResponse(false);
    setInsuranceResponse(false);
    API.getPatientContact(selectedPatient.id, setContact, setContactResponse);
    API.getPatientInsurance(selectedPatient.id, setInsurance, setInsuranceResponse);    
  },[selectedPatient])
  useEffect(()=>{
    setContactInfo()
  },[contact])
  useEffect(()=>{
    setInsuranceInfo()
  },[insurance])

  const setIdentityInfo = () => {
    setPatientTitle(selectedPatient.title);
    setPatientFirstName(selectedPatient.firstName);
    setPatientMiddleName(selectedPatient.middleName);
    setPatientLastName(selectedPatient.lastName);
    setPatientDoB(selectedPatient.dateOfBirth.substring(0,10));//to convert to date input type
    setPatientSex(selectedPatient.sex);
    setPatientMaritalStatus(selectedPatient.maritalStatus);
    setPatientMedNumber(selectedPatient.medicareNumber);
  }
  const setContactInfo = () => {
    if (contact)
    {
      console.log(contact);
      setContactAddress(contact.address);
      setContactSuburb(contact.suburb);
      setContactPostcode(contact.postcode);
      setContactState(contact.state);
      setContactCountry(contact.country);
      setContactHomePhone(contact.homePhone);
      setContactMobileNumber(contact.mobileNumber);
      setContactEmail(contact.email);
      setContactEmergencyContact(contact.emergencyContact);
      setContactEmergencyPhone(contact.emergencyPhone);
    }
  }
  const setInsuranceInfo = () => {
    if (insurance)
    {
      console.log(insurance);
      setInsuranceProvider(insurance.insuranceProvider);
      setInsuranceNumber(insurance.insuranceNumber);
      setInsuranceEffectiveDate(insurance.effectiveDate.substring(0,10));//to convert to date input type
      setInsuranceExpiryDate(insurance.expiryDate.substring(0,10));//to convert to date input type
    }
  }

  const updatePatientInfo = () => {
    updateIdentity();
    updateContact();
    updateInsurance();
  }

  const updateIdentity = () => {
    console.log("updateIdentityInfo");
    let updatedIdentity = JSON.parse(JSON.stringify(selectedPatient));//clone object
    updatedIdentity.title = patientTitle;
    updatedIdentity.firstName = patientFirstName;
    updatedIdentity.middleName = patientMiddleName;
    updatedIdentity.lastName = patientLastName;
    updatedIdentity.dateOfBirth = patientDoB;
    updatedIdentity.sex = patientSex;
    updatedIdentity.maritalStatus = patientMaritalStatus;
    updatedIdentity.medicareNumber = patientMedNumber;    
    API.updatePatient(updatedIdentity, selectedPatient.id, 
      () =>{ //callback
        setSelectedPatient(updatedIdentity);
        setUpdateIdentitySuccess(true);
      },
      (error)=>{ //errCallback
        setUpdateIdentitySuccess(false);
        setUpdateMessage("Update error. Please check all fields again");
      })
  }

  const updateContact = () => {
    console.log("updateContactInfo");
    let updatedContact = JSON.parse(JSON.stringify(contact));//clone object
    updatedContact.address = contactAddress;
    updatedContact.suburb = contactSuburb;
    updatedContact.postcode = contactPostcode;
    updatedContact.state = contactState;
    updatedContact.country = contactCountry;
    updatedContact.homePhone = contactHomePhone;
    updatedContact.mobileNumber = contactMobileNumber;
    updatedContact.email = contactEmail;
    updatedContact.emergencyContact = contactEmergencyContact;
    updatedContact.emergencyPhone = contactEmergencyPhone;
    API.updateContact(updatedContact, selectedPatient.id,
      () =>{ //callback
        setContact(updatedContact);
        setUpdateContactSuccess(true);
      },
      (error)=>{ //errCallback
        setUpdateContactSuccess(false);
        setUpdateMessage("Update error. Please check all fields again");
      })
    
  }

  const updateInsurance = () => {
    console.log("updateInsuranceInfo");
    let updatedInsurance = JSON.parse(JSON.stringify(insurance));//clone object
    updatedInsurance.insuranceProvider = insuranceProvider;
    updatedInsurance.insuranceNumber = insuranceNumber;
    updatedInsurance.effectiveDate = insuranceEffectiveDate;
    updatedInsurance.expiryDate = insuranceExpiryDate;
    API.updateInsurace(updatedInsurance, selectedPatient.id,
      () =>{ //callback
        setInsurance(updatedInsurance);
        setUpdateInsuranceSuccess(true);
      },
      (error)=>{ //errCallback
        setUpdateInsuranceSuccess(false);
        setUpdateMessage("Update error. Please check all fields again");
      })
  }
  //handle first name change
  return (
    <div>
      <h3>Identity</h3>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="patient-id"
            label="Patient ID"
            value={selectedPatient.id}
            className={classes.textField}
            fullWidth
            margin="normal"
            disabled
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl required variant="outlined" 
            className={patientTitle!==selectedPatient.title?classes.formControlEdit:classes.formControl}>
            <InputLabel>Title</InputLabel>
            <Select
              native
              value={patientTitle}
              onChange={(e)=>{setPatientTitle(e.target.value)}}
              labelWidth={40}
              disabled= {!editFlag}
            >
              {titleArray.map((value,i)=>{
                return <option key={i} value = {value}>{value}</option>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="first-name"
            label="First Name"
            value={patientFirstName}
            onChange = {(e)=>setPatientFirstName(e.target.value)}
            className={patientFirstName!==selectedPatient.firstName?classes.textFieldEdit:classes.textField}
            fullWidth
            margin="normal"
            disabled= {!editFlag}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="middle-name"
            label="Middle Name"
            value={patientMiddleName}
            onChange = {(e)=>setPatientMiddleName(e.target.value)}
            className={patientMiddleName!==selectedPatient.middleName?classes.textFieldEdit:classes.textField}
            fullWidth
            margin="normal"
            disabled= {!editFlag}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="last-name"
            label="Last Name"
            value={patientLastName}
            onChange = {(e)=>setPatientLastName(e.target.value)}
            className={patientLastName!==selectedPatient.lastName?classes.textFieldEdit:classes.textField}
            fullWidth
            margin="normal"
            disabled= {!editFlag}
            variant="outlined"
          />
        </Grid>
        <Grid item xs = {3}>
          <TextField
            id="dob"
            label="Date of Birth"
            value={patientDoB}
            onChange = {(e)=>setPatientDoB(e.target.value)}
            className={classes.textField}
            fullWidth
            margin="normal"
            disabled= {!editFlag}
            variant="outlined"
            InputProps = {{type: 'date'}}
            InputLabelProps={{shrink: true}}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl required variant="outlined" 
            className={patientSex!==selectedPatient.sex?classes.formControlEdit:classes.formControl}>
            <InputLabel>Sex</InputLabel>
            <Select
              native
              value={patientSex}
              onChange={(e)=>{setPatientSex(e.target.value)}}
              labelWidth={35}
              disabled= {!editFlag}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl required variant="outlined" 
            className={patientMaritalStatus!==selectedPatient.maritalStatus?classes.formControlEdit:classes.formControl}>
            <InputLabel>Marital Status</InputLabel>
            <Select
              native
              value={patientMaritalStatus}
              onChange={(e)=>{setPatientMaritalStatus(e.target.value)}}
              labelWidth={110}
              disabled= {!editFlag}
            >
              {maritalStatusArray.map((value,i)=>{
                return <option key={i} value={value}>{value}</option>
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="medical-number"
            label="Medical Number"
            value={patientMedNumber}
            onChange = {(e)=>setPatientMedNumber(e.target.value)}
            className={patientMedNumber!==selectedPatient.medicareNumber?classes.textFieldEdit:classes.textField}
            fullWidth
            margin="normal"
            disabled= {!editFlag}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} variant="middle" />
      <h3>Contact</h3>      
      {!contactResponse? <LoadingComponent/>:
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="address"
              label="Adress"
              value={contactAddress}
              onChange = {(e)=>setContactAddress(e.target.value)}
              className={contactAddress!==contact.address?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="suburb"
              label="Suburb"
              value={contactSuburb}
              onChange = {(e)=>setContactSuburb(e.target.value)}
              className={contactSuburb!==contact.suburb?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="postcode"
              label="Postcode"
              value={contactPostcode}
              onChange = {(e)=>setContactPostcode(e.target.value)}
              className={contactPostcode!==contact.postcode?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl required variant="outlined" 
              className={contactState!==contact.state?classes.formControlEdit:classes.formControl}>
              <InputLabel>State</InputLabel>
              <Select
                native
                value={contactState}
                onChange={(e)=>{setContactState(e.target.value)}}
                labelWidth={40}
                disabled= {!editFlag}
              >
                {stateArray.map((value,i)=>{
                  return <option key={i} value={value}>{value}</option>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="country"
              label="Country"
              value={contactCountry}
              onChange = {(e)=>setContactCountry(e.target.value)}
              className={contactCountry!==contact.country?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="home-phone"
              label="Home Phone"
              value={contactHomePhone}
              onChange = {(e)=>setContactHomePhone(e.target.value)}
              className={contactHomePhone!==contact.homePhone?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="mobile-number"
              label="Mobile Number"
              value={contactMobileNumber}
              onChange = {(e)=>setContactMobileNumber(e.target.value)}
              className={contactMobileNumber!==contact.mobileNumber?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              value={contactEmail}
              onChange = {(e)=>setContactEmail(e.target.value)}
              className={contactEmail!==contact.email?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="emergency-contact"
              label="Emergency Contact"
              value={contactEmergencyContact}
              onChange = {(e)=>setContactEmergencyContact(e.target.value)}
              className={contactEmergencyContact!==contact.emergencyContact?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="emergency-phone"
              label="Emergency Phone"
              value={contactEmergencyPhone}
              onChange = {(e)=>setContactEmergencyPhone(e.target.value)}
              className={contactEmergencyPhone!==contact.emergencyPhone?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
        </Grid>
      }
      <Divider className={classes.divider} variant="middle" />
      <h3>Insurance</h3>
      {!insuranceResponse? <LoadingComponent/>:
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="insurance-provider"
              label="Insurance Provider"
              value={insuranceProvider}
              onChange = {(e)=>setInsuranceProvider(e.target.value)}
              className={insuranceProvider!==insurance.insuranceProvider?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="insurance-number"
              label="Insurance Number"
              value={insuranceNumber}
              onChange = {(e)=>setInsuranceNumber(e.target.value)}
              className={insuranceNumber!==insurance.insuranceNumber?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="effective-date"
              label="Effective Date"
              value={insuranceEffectiveDate}
              onChange = {(e)=>setInsuranceEffectiveDate(e.target.value)}
              className={insuranceEffectiveDate!==insurance.effectiveDate.substring(0,10)?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
              InputProps = {{type: 'date'}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="expiry-date"
              label="Expiry Date"
              value={insuranceExpiryDate}
              onChange = {(e)=>setInsuranceExpiryDate(e.target.value)}
              className={insuranceExpiryDate!==insurance.expiryDate.substring(0,10)?classes.textFieldEdit:classes.textField}
              fullWidth
              margin="normal"
              disabled= {!editFlag}
              variant="outlined"
              InputProps = {{type: 'date'}}
            />
          </Grid>
        </Grid>
      }
      {!editFlag?"":      
      <Grid container justify="center" spacing = {1}>
        <Grid item xs = {3}>
          <Button variant="contained" color="primary" 
            className={classes.button}
            onClick={updatePatientInfo}>
            Update
          </Button>
          <p className={classes.message}>{updateMessage}</p>
        </Grid>
      </Grid>
      }
    </div>
  )
}