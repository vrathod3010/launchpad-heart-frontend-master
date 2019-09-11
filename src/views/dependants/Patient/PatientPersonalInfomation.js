import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Divider, Typography} from '@material-ui/core';
import { SelectedPatientContext } from '../../../contexts/patient/SelectedPatientContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  smallTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: 100,
  },
  mediumTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: 200,
  },
  fullTextField: {
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
  const {selectedPatient} = useContext(SelectedPatientContext);
  return (
    <div>
      <TextField
          id="patient-id"
          label="Patient ID"
          value={selectedPatient.id}
          className={classes.fullTextField}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="patient-title"
          label="Title"
          value={selectedPatient.title}
          className={classes.smallTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="first-name"
          label="First Name"
          value={selectedPatient.firstName}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="middle-name"
          label="Middle Name"
          value={selectedPatient.middleName}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="last-name"
          label="Last Name"
          value={selectedPatient.lastName}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <Divider className={classes.divider} variant="middle" />
        <TextField
          id="dob"
          label="Date of Birth"
          value={selectedPatient.dob}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="sex"
          label="Sex"
          value={selectedPatient.sex}
          className={classes.smallTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="marial-status"
          label="Marial Status"
          value={selectedPatient.marialStatus}
          className={classes.smallTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="medical-number"
          label="Medical Number"
          value={selectedPatient.medNumber}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <Divider className={classes.divider} variant="middle" />
        <Typography component="h3" variant="h5">
            Contact
        </Typography>
        <TextField
          id="address"
          label="Adress"
          value={selectedPatient.contact.address}
          className={classes.fullTextField}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="suburb"
          label="Suburb"
          value={selectedPatient.contact.suburb}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="postcode"
          label="Postcode"
          value={selectedPatient.contact.postcode}
          className={classes.smallTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="state"
          label="State"
          value={selectedPatient.contact.state}
          className={classes.smallTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="country"
          label="Country"
          value={selectedPatient.contact.country}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="home-phone"
          label="Home Phone"
          value={selectedPatient.contact.homePhone}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="mobile-number"
          label="Mobile Number"
          value={selectedPatient.contact.mobileNumber}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          value={selectedPatient.contact.email}
          className={classes.fullTextField}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="emergency-contact"
          label="Emergencyy Contact"
          value={selectedPatient.contact.emergencyContact}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="emergency-phone"
          label="Emergencyy Phone"
          value={selectedPatient.contact.emergencyPhone}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <Divider className={classes.divider} variant="middle" />
        <Typography component="h3" variant="h5">
            Insurance
        </Typography>
        <TextField
          id="insurance-provider"
          label="Insurance Provider"
          value={selectedPatient.insurance.insuranceProvider}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="insurance-number"
          label="Insurance Number"
          value={selectedPatient.insurance.insuranceNumber}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="effective-date"
          label="Effective Date"
          value={selectedPatient.insurance.effectiveDate}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="expiry-date"
          label="Expiry Date"
          value={selectedPatient.insurance.expiryDate}
          className={classes.mediumTextField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
    </div>
  )
}