import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, Grid, Paper, Typography, Button } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4)
    },
    buttons: {
        marginTop: theme.spacing(2)
    },
}));

export default function OutlinedTextFields() {
    const classes = useStyles();
    const addUser = () => {
        console.log("add user")
    }
    const [values, setValues] = React.useState({
        name: '',
        age: '',
        bloodPressure: 0,
        heartRate: 0,
        multiline: 'Controlled'
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <Grid container spacing={0} justify="center">
            <Grid className={classes.loginBox} item xs={15} lg={10}>
                <Paper className={classes.paper}>
                    <Typography component="h3" variant="h5">
                        Add New User
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="on">
                        <TextField
                            id="outlined-name"
                            label="Name"
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange('name')}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-name"
                            label="Age"
                            className={classes.textField}
                            value={values.age}
                            onChange={handleChange('age')}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            type="number"
                            id="outlined-name"
                            label="Blood Pressure"
                            className={classes.textField}
                            value={values.bloodPressure}
                            onChange={handleChange('bloodPressure')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            type="number"
                            label="Heart Rate"
                            className={classes.textField}
                            value={values.heartRate}
                            onChange={handleChange('heartRate')}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button fullWidth variant="contained" color="primary" className={classes.buttons} onClick={addUser}>Login</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>

    );
}
