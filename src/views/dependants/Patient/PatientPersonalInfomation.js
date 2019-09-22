import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, TextField, Divider, Typography} from '@material-ui/core';
import { PatientsContext } from 'contexts/patient/PatientsContext';
import { API } from 'helpers/index';
import {LoadingComponent} from 'components/common/loading';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

export const PatientPersonalInfomation = () =>{
  const classes = useStyles();
  const {selectedPatient} = useContext(PatientsContext);
  const [contact, setContact] = useState({});
  const [insurance, setInsurance] = useState({});
  const [contactResponse, setContactResponse] = useState(false);
  const [insuranceResponse, setInsuranceResponse] = useState(false);
  useEffect(()=>{
    setContactResponse(false);
    setInsuranceResponse(false);
    API.getPatientContact(selectedPatient.id, setContact, setContactResponse);
    API.getPatientInsurance(selectedPatient.id, setInsurance, setInsuranceResponse);
  },[selectedPatient])
  console.log(contact);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="patient-id"
            label="Patient ID"
            value={selectedPatient.id}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="patient-title"
            label="Title"
            value={selectedPatient.title}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <TextField
            id="first-name"
            label="First Name"
            value={selectedPatient.firstName}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="middle-name"
            label="Middle Name"
            value={selectedPatient.middleName}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="last-name"
            label="Last Name"
            value={selectedPatient.lastName}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="dob"
            label="Date of Birth"
            value={selectedPatient.dateOfBirth}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="sex"
            label="Sex"
            value={selectedPatient.sex}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="marial-status"
            label="Marial Status"
            value={selectedPatient.maritalStatus}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="medical-number"
            label="Medical Number"
            value={selectedPatient.medicareNumber}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} variant="middle" />
      <Typography component="h3" variant="h5">
            Contact
      </Typography>
      {!contactResponse? <LoadingComponent/>:
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="address"
              label="Adress"
              value={contact.address}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="suburb"
              label="Suburb"
              value={contact.suburb}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="postcode"
              label="Postcode"
              value={contact.postcode}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="state"
              label="State"
              value={contact.state}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="country"
              label="Country"
              value={contact.country}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="home-phone"
              label="Home Phone"
              value={contact.homePhone}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="mobile-number"
              label="Mobile Number"
              value={contact.mobileNumber}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              value={contact.email}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="emergency-contact"
              label="Emergency Contact"
              value={contact.emergencyContact}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="emergency-phone"
              label="Emergency Phone"
              value={contact.emergencyPhone}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      }
      <Divider className={classes.divider} variant="middle" />
      <Typography component="h3" variant="h5">
          Insurance
      </Typography>
      {!insuranceResponse? <LoadingComponent/>:
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="insurance-provider"
              label="Insurance Provider"
              value={insurance.insuranceProvider}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="insurance-number"
              label="Insurance Number"
              value={insurance.insuranceNumber}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="effective-date"
              label="Effective Date"
              value={insurance.effectiveDate}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="expiry-date"
              label="Expiry Date"
              value={insurance.expiryDate}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      }    
    </div>
  )
}