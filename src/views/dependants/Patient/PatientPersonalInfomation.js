import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, TextField, Divider, Typography, FormControl, InputLabel, Select, Button} from '@material-ui/core';
import { PatientsContext } from 'contexts/patient/PatientsContext';
import { API } from 'helpers/index';
import {LoadingComponent} from 'components/common/loading';
import {Add, Edit, Delete} from '@material-ui/icons';

const titleArray = ["Mr","Ms","Mrs","Dr"];
const maritalStatusArray = ["Married","Divorced","Single","Widowed","Separated","Domestic Partner"];
const stateArray = ["QLD","VIC","NSW","ACT","WA","TAS","SA","NT"];

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  rootNew: {
    backgroundColor: "#edf4ff"
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
    marginLeft:'25%',
    width: '50%'
  },
  headerButton: {
    margin: theme.spacing(1),
  },
  message:{
    //width: '100%',
    textAlign: 'center',
    color: 'red'
  }
}));

export const PatientPersonalInfomation = () =>{
  const classes = useStyles();
  const {listPatients, setListPatients} = useContext(PatientsContext);
  const {selectedPatient, setSelectedPatient} = useContext(PatientsContext);
  const {editFlag, setEditFlag} = useContext(PatientsContext);
  const {refresh, setRefresh} = useContext(PatientsContext);
  const [contact, setContact] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateIdentitySuccess, setUpdateIdentitySuccess] = useState(false);
  const [updateContactSuccess, setUpdateContactSuccess] = useState(false);
  const [updateInsuranceSuccess, setUpdateInsuranceSuccess] = useState(false);
  //check if data is done loading
  const [indentityResponse, setIndentityResponse] = useState(false);
  const [contactResponse, setContactResponse] = useState(false);
  const [insuranceResponse, setInsuranceResponse] = useState(false);

  //patient basic info
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
      //console.log("111111111111111");
      setUpdateContactSuccess(false);
      setUpdateInsuranceSuccess(false);
      setUpdateMessage("");
    }
  },[editFlag])

  //only turn off edit mode if all info is updated successfully
  useEffect(()=>{
    //console.log(updateIdentitySuccess + " " + updateContactSuccess);
    if(updateIdentitySuccess && updateContactSuccess && updateInsuranceSuccess)
      setEditFlag(false);
  }, [updateIdentitySuccess, updateContactSuccess, updateInsuranceSuccess])

  useEffect(()=>{
    //console.log("use effect 111111111");
    setIdentityInfo();
    setContactInfo();
    setInsuranceInfo();
    if (selectedPatient!==null)
    {
      //console.log("setIdentity & contact & insurance");
      //setIdentityInfo();
      setContactResponse(false);
      setInsuranceResponse(false);
      API.getPatientContact(selectedPatient.id, setContact, setContactResponse);
      API.getPatientInsurance(selectedPatient.id, setInsurance, setInsuranceResponse);  
    }
    else
    { //this case happen when create new patient
      setContact(null);
      setInsurance(null);
      setContactResponse(true);
      setInsuranceResponse(true);
    }    
  },[selectedPatient])

  useEffect(()=>{
    setContactInfo()
  },[contact])
  
  useEffect(()=>{
    setInsuranceInfo()
  },[insurance])

  const setIdentityInfo = () => {
    setPatientTitle(selectedPatient===null?"Mr":selectedPatient.title);
    setPatientFirstName(selectedPatient===null?"":selectedPatient.firstName);
    setPatientMiddleName(selectedPatient===null?"":selectedPatient.middleName);
    setPatientLastName(selectedPatient===null?"":selectedPatient.lastName);
    setPatientDoB(selectedPatient===null?"":selectedPatient.dateOfBirth.substring(0,10));//to convert to date input type
    setPatientSex(selectedPatient===null?"Male":selectedPatient.sex);
    setPatientMaritalStatus(selectedPatient===null?"Single":selectedPatient.maritalStatus);
    setPatientMedNumber(selectedPatient===null?"":selectedPatient.medicareNumber);
  }
  const setContactInfo = () => {
    console.log(contact);
    setContactAddress(contact===null?"":contact.address);
    setContactSuburb(contact===null?"":contact.suburb);
    setContactPostcode(contact===null?"":contact.postcode);
    setContactState(contact===null?"VIC":contact.state);
    setContactCountry(contact===null?"":contact.country);
    setContactHomePhone(contact===null?"":contact.homePhone);
    setContactMobileNumber(contact===null?"":contact.mobileNumber);
    setContactEmail(contact===null?"":contact.email);
    setContactEmergencyContact(contact===null?"":contact.emergencyContact);
    setContactEmergencyPhone(contact===null?"":contact.emergencyPhone);
  }
  const setInsuranceInfo = () => {
    console.log(insurance);
    setInsuranceProvider(insurance===null?"":insurance.insuranceProvider);
    setInsuranceNumber(insurance===null?"":insurance.insuranceNumber);
    setInsuranceEffectiveDate(insurance===null?"":insurance.effectiveDate.substring(0,10));//to convert to date input type
    setInsuranceExpiryDate(insurance===null?"":insurance.expiryDate.substring(0,10));//to convert to date input type
  }

  const updatePatientInfo = () => {
    updateIdentity();
    if (contact!==null) updateContact();
    else createNewContact();
    if (insurance!=null) updateInsurance();
    else createNewInsurance();
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
        //update the whole list of patient
        let updatedListPatients = JSON.parse(JSON.stringify(listPatients));//clone object
        let updatedPatientIndex = listPatients.findIndex((p)=> p.id === selectedPatient.id)
        updatedListPatients[updatedPatientIndex] = updatedIdentity;
        setListPatients(updatedListPatients);
      },
      (error)=>{ //errCallback
        setUpdateIdentitySuccess(false);
        setUpdateMessage("Update error. Error detail:" + error.response.data.error.message);
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
        setUpdateMessage("Update error. Error detail: " + error.response.data.error.message);
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
        setUpdateMessage("Update error. Error detail: " + error.response.data.error.message);
      })
  }

  const deletePatient = () => {
    API.deletePatient(selectedPatient.id, ()=>{
      setSelectedPatient(null);
      setRefresh(true);
      setEditFlag(true);
    })
  }
  const createNewPatient = () => {
    let newPatient = {};
    newPatient.title = patientTitle;
    newPatient.firstName = patientFirstName;
    newPatient.middleName = patientMiddleName;
    newPatient.lastName = patientLastName;
    newPatient.dateOfBirth = patientDoB;
    newPatient.sex = patientSex;
    newPatient.maritalStatus = patientMaritalStatus;
    newPatient.medicareNumber = patientMedNumber;
    newPatient.height = 0;
    API.createPatient(newPatient, ()=>{
      setRefresh(true);
      setIdentityInfo();
      setUpdateMessage("");
    }, (error) => {
      setUpdateMessage("Can not create new patient. Error detail: " + error.response.data.error.message);
    }) 
  }

  const createNewContact = () => {
    console.log("create new Contact");
    let newContact = {};
    newContact.address = contactAddress;
    newContact.suburb = contactSuburb;
    newContact.postcode = contactPostcode;
    newContact.state = contactState;
    newContact.country = contactCountry;
    newContact.homePhone = contactHomePhone;
    newContact.mobileNumber = contactMobileNumber;
    newContact.email = contactEmail;
    newContact.emergencyContact = contactEmergencyContact;
    newContact.emergencyPhone = contactEmergencyPhone;
    API.createContact(newContact, selectedPatient.id,
      () =>{ //callback
        setContact(newContact);
        setUpdateContactSuccess(true);
      },
      (error)=>{ //errCallback
        setUpdateContactSuccess(false);
        setUpdateMessage("Update error. Error detail: " + error.response.data.error.message);
      })
    
  }
  const createNewInsurance = () => {
    console.log("createNewInsurance");
    let newInsurance = {};
    newInsurance.insuranceProvider = insuranceProvider;
    newInsurance.insuranceNumber = insuranceNumber;
    newInsurance.effectiveDate = insuranceEffectiveDate;
    newInsurance.expiryDate = insuranceExpiryDate;
    API.createInsurance(newInsurance, selectedPatient.id,
      () =>{ //callback
        setInsurance(newInsurance);
        setUpdateInsuranceSuccess(true);
      },
      (error)=>{ //errCallback
        setUpdateInsuranceSuccess(false);
        setUpdateMessage("Update error. Error detail: " + error.response.data.error.message);
      })
  }

  // console.log("PatientPersonalInfomation");
  // console.log(selectedPatient);
  // console.log(contactResponse);
  //handle first name change
  return (
    <div>
      {!selectedPatient?"":
          <Button className = {classes.headerButton} variant="contained" color="primary" onClick={()=>setEditFlag(!editFlag)}>
            Edit
            <Edit />
          </Button>
      }
      {!selectedPatient?"":
          <Button className = {classes.headerButton} variant="contained" color="secondary" onClick={()=>deletePatient()}>
            Remove
            <Delete />
          </Button>
      }
      <h3>Identity</h3>
      <Grid //className = {selectedPatient!==null? classes.root: classes.rootNew} 
      container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="patient-id"
            label="Patient ID"
            value={selectedPatient===null?"":selectedPatient.id}
            className={classes.textField}
            fullWidth
            margin="normal"
            disabled
            variant="outlined"
            InputLabelProps={{shrink: true}}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl required variant="outlined" 
            className={selectedPatient!==null&&patientTitle!==selectedPatient.title?classes.formControlEdit:classes.formControl}>
            <InputLabel shrink={true}>Title</InputLabel>
            <Select
              native
              value={patientTitle}
              onChange={(e)=>{setPatientTitle(e.target.value)}}
              labelWidth={40}
              disabled= {!editFlag}
              //InputLabelProps={{shrink: true}}
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
            className={selectedPatient!==null&&patientFirstName!==selectedPatient.firstName?classes.textFieldEdit:classes.textField}
            fullWidth
            margin="normal"
            disabled= {!editFlag}
            variant="outlined"
            InputLabelProps={{shrink: true}}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="middle-name"
            label="Middle Name"
            value={patientMiddleName}
            onChange = {(e)=>setPatientMiddleName(e.target.value)}
            className={selectedPatient!==null&&patientMiddleName!==selectedPatient.middleName?classes.textFieldEdit:classes.textField}
            fullWidth
            margin="normal"
            disabled= {!editFlag}
            variant="outlined"
            InputLabelProps={{shrink: true}}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="last-name"
            label="Last Name"
            value={patientLastName}
            onChange = {(e)=>setPatientLastName(e.target.value)}
            className={selectedPatient!==null&&patientLastName!==selectedPatient.lastName?classes.textFieldEdit:classes.textField}
            fullWidth
            margin="normal"
            disabled= {!editFlag}
            variant="outlined"
            InputLabelProps={{shrink: true}}
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
            className={selectedPatient!==null&&patientSex!==selectedPatient.sex?classes.formControlEdit:classes.formControl}>
            <InputLabel shrink={true}>Sex</InputLabel>
            <Select
              native
              value={patientSex}
              onChange={(e)=>{setPatientSex(e.target.value)}}
              labelWidth={35}
              disabled= {!editFlag}
              //InputLabelProps={{shrink: true}}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl required variant="outlined" 
            className={selectedPatient!==null&&patientMaritalStatus!==selectedPatient.maritalStatus?classes.formControlEdit:classes.formControl}>
            <InputLabel shrink={true}>Marital Status</InputLabel>
            <Select
              native
              value={patientMaritalStatus}
              onChange={(e)=>{setPatientMaritalStatus(e.target.value)}}
              labelWidth={110}
              disabled= {!editFlag}
              //InputLabelProps={{shrink: true}}
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
            className={selectedPatient!==null&&patientMedNumber!==selectedPatient.medicareNumber?classes.textFieldEdit:classes.textField}
            fullWidth
            margin="normal"
            disabled= {!editFlag}
            variant="outlined"
            InputLabelProps={{shrink: true}}
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} variant="middle" />

      {selectedPatient === null? "":
        <div>
          <h3>Contact</h3>      
          {!contactResponse? <LoadingComponent/>:
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  label="Adress"
                  value={contactAddress}
                  onChange = {(e)=>setContactAddress(e.target.value)}
                  className={contact!==null&&contactAddress!==contact.address?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="suburb"
                  label="Suburb"
                  value={contactSuburb}
                  onChange = {(e)=>setContactSuburb(e.target.value)}
                  className={contact!==null&&contactSuburb!==contact.suburb?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="postcode"
                  label="Postcode"
                  value={contactPostcode}
                  onChange = {(e)=>setContactPostcode(e.target.value)}
                  className={contact!==null&&contactPostcode!==contact.postcode?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl required variant="outlined" 
                  className={contact!==null&&contactState!==contact.state?classes.formControlEdit:classes.formControl}>
                  <InputLabel shrink={true}>State</InputLabel>
                  <Select
                    native
                    value={contactState}
                    onChange={(e)=>{setContactState(e.target.value)}}
                    labelWidth={40}
                    disabled= {!editFlag}
                    //InputLabelProps={{shrink: true}}
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
                  className={contact!==null&&contactCountry!==contact.country?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="home-phone"
                  label="Home Phone"
                  value={contactHomePhone}
                  onChange = {(e)=>setContactHomePhone(e.target.value)}
                  className={contact!==null&&contactHomePhone!==contact.homePhone?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="mobile-number"
                  label="Mobile Number"
                  value={contactMobileNumber}
                  onChange = {(e)=>setContactMobileNumber(e.target.value)}
                  className={contact!==null&&contactMobileNumber!==contact.mobileNumber?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  value={contactEmail}
                  onChange = {(e)=>setContactEmail(e.target.value)}
                  className={contact!==null&&contactEmail!==contact.email?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="emergency-contact"
                  label="Emergency Contact"
                  value={contactEmergencyContact}
                  onChange = {(e)=>setContactEmergencyContact(e.target.value)}
                  className={contact!==null&&contactEmergencyContact!==contact.emergencyContact?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="emergency-phone"
                  label="Emergency Phone"
                  value={contactEmergencyPhone}
                  onChange = {(e)=>setContactEmergencyPhone(e.target.value)}
                  className={contact!==null&&contactEmergencyPhone!==contact.emergencyPhone?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
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
                  className={insurance!==null&&insuranceProvider!==insurance.insuranceProvider?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="insurance-number"
                  label="Insurance Number"
                  value={insuranceNumber}
                  onChange = {(e)=>setInsuranceNumber(e.target.value)}
                  className={insurance!==null&&insuranceNumber!==insurance.insuranceNumber?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="effective-date"
                  label="Effective Date"
                  value={insuranceEffectiveDate}
                  onChange = {(e)=>setInsuranceEffectiveDate(e.target.value)}
                  className={insurance!==null&&insuranceEffectiveDate!==insurance.effectiveDate.substring(0,10)?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputProps = {{type: 'date'}}
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="expiry-date"
                  label="Expiry Date"
                  value={insuranceExpiryDate}
                  onChange = {(e)=>setInsuranceExpiryDate(e.target.value)}
                  className={insurance!==null&&insuranceExpiryDate!==insurance.expiryDate.substring(0,10)?classes.textFieldEdit:classes.textField}
                  fullWidth
                  margin="normal"
                  disabled= {!editFlag}
                  variant="outlined"
                  InputProps = {{type: 'date'}}
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
            </Grid>
          }
        </div>
      }
      {!editFlag?"":      
      <Grid container justify="center" spacing = {1}>
        <Grid item xs = {6}>
          <Button variant="contained" color="primary" 
            className={classes.button}
            onClick={selectedPatient===null?createNewPatient:updatePatientInfo}>
            {selectedPatient===null?"Create patient":"Update"}
          </Button>
          <p className={classes.message}>{updateMessage}</p>
        </Grid>
      </Grid>
      }
    </div>
  )
}