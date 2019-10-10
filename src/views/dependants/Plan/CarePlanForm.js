import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

//require('../../../styles/common.css'); //wl

const classes = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
	},
	button: {
		marginTop: 50,
	}
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#79d669',
    //color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

// const GreenButton = withStyles(theme => ({
//   root: {
//     color: 'white',
//     backgroundColor: green[500],
//     '&:hover': {
//       backgroundColor: green[700],
//     },
//   },
// }))(Button);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

class CarePlanForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open:false,
      day: 'Monday',
      rows : [
        createData('Monday', 159, 6.0, 24, 4.0),
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange1 = this.handleInputChange1.bind(this);
    this.handleInputChange2 = this.handleInputChange2.bind(this);
    this.handleInputChange3 = this.handleInputChange3.bind(this);
    this.handleInputChange4 = this.handleInputChange4.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAdd() {
    this.setState({open: true});
  }
  handleChange(event) {
    this.setState({
      day:event.target.value
    });
  }
  handleClose() {
    this.setState({open: false});
  }
  handleSubmit() {
    let rows = this.state.rows
    rows.push(createData(this.state.day, this.state.patient, this.state.pressure, this.state.weight, this.state.glucose));
    this.setState({
      rows
    });
    this.handleClose()
  }
  handleInputChange1(event){
    this.setState({
      patient:event.target.value
    });
  }
  handleInputChange2(event){
    this.setState({
      pressure:event.target.value
    });
  }
  handleInputChange3(event){
    this.setState({
      weight:event.target.value
    });
  }
  handleInputChange4(event){
    this.setState({
      glucose:event.target.value
    });
  }
  componentDidMount() {
    var main = document.getElementsByTagName("body")[0]
    document.body.addEventListener('click', e => {
      var x = e.clientX - 40;
      var y = e.clientY - 40;

      var id = new Date().getTime()
      var div = document.createElement("div");
      div.setAttribute("id", id);
      div.setAttribute("class", "container");
      div.setAttribute("style", "display:block;left:"+x+"px;top:"+y+"px;");
      div.innerHTML = '<div class="inner"></div><div class="middle"></div><div class="outer"></div>'
      main.appendChild(div)
      setTimeout(function(){
        document.getElementById(id).remove()
      },1000)

    });
  }
  componentDidUpdate() {
  }
  render() {
    return (
      <div>
        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Patient-ID</TableCell>
                  <TableCell>Blood pressure</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Glucose</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.calories}</TableCell>
                    <TableCell>{row.fat}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell>{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <div className="btn-group">
            <Button className={classes.button} variant="contained" color="primary" onClick={this.handleAdd}>
              Add new plan
            </Button>
          </div>
        </div>

        <div>
          <Dialog onClose={this.handleClose} aria-labelledby="form-dialog-title" open={this.state.open}>
            <DialogTitle id="form-dialog-title">New Care Plan</DialogTitle>
            <DialogContent>
              <InputLabel htmlFor="day-simple">Choose Day</InputLabel>
              <Select
                value={this.state.day}
                onChange={this.handleChange}
                inputProps={{
                  name: 'Day',
                  id: 'day-simple',
                }}
              >
                <MenuItem value={'Monday'}>Monday</MenuItem>
                <MenuItem value={'Tuesday'}>Tuesday </MenuItem>
                <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                <MenuItem value={'Thursday'}>Thursday</MenuItem>
                <MenuItem value={'Friday'}>Friday</MenuItem>
                <MenuItem value={'Saturday'}>Saturday</MenuItem>
                <MenuItem value={'Sunday'}>Sunday</MenuItem>
              </Select>
              <TextField
                margin="dense"
                id="patient"
                label="Patient-ID"
                onChange={this.handleInputChange1}
                fullWidth
              />
              <TextField
                margin="dense"
                id="pressure"
                label="Blood pressure"
                onChange={this.handleInputChange2}
                fullWidth
              />
              <TextField
                margin="dense"
                id="weight"
                label="Weight"
                onChange={this.handleInputChange3}
                fullWidth
              />
              <TextField
                margin="dense"
                id="glucose"
                label="Glucose"
                onChange={this.handleInputChange4}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
export default CarePlanForm;

