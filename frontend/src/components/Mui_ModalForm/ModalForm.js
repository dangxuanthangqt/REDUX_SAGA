import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as actionCreatorsOfModal from "../../actions/modal";
import { format, compareAsc } from "date-fns";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormGroup,
  Grid,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { editTask, addTask } from "../../actions/task";
import { KeyboardDatePicker } from "@material-ui/pickers";

const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

function ModalForm(props) {
  const classes = props.classes;
  const { Show, Editing } = props.modal;
  useEffect(() => {}, []);
  const handleCloseModal = () => {
    props.dispatchModal.hideModal();
  };
  const handleOnSubmit = (values) => {
    if (props.modal.Title === "ADD TASK") {
      //console.log(values)
      props.dispatchAddTask(values);
    } else {
      if (props.modal.Title === "EDIT TASK") {
        console.log(values);
        props.dispatchEditTask({
          taskId: Editing.taskId,
          ...values,
        });
      }
    }
    handleCloseModal();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={Show}
        onClose={() => handleCloseModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Grid
          item
          md={4}
          item
          style={{
            borderRadius: 10,
          }}
          className={classes.paper}
        >
          <h2 id="server-modal-title" className="text-center">
            {props.modal.Title}
          </h2>

          <Formik
            initialValues={{
              taskName: props.modal.Editing ? props.modal.Editing.taskName : "",
              // description: Editing ? Editing.description : "",
              // status: Editing ? Editing.status.toString() : "0",
              startTime: Editing ? Editing.startTime : new Date(),
              endTime: Editing ? Editing.endTime : new Date(),
              status: Editing ? Editing.status : "OPEN",
            }}
            onSubmit={handleOnSubmit}
            validationSchema={Yup.object().shape({
              taskName: Yup.string()
                .min(2, "Too Short!")
                .max(50, "Too Long!")
                .required("Required"),
              // startTime: Yup.date().required("Start Time is required !"),
              // endTime: Yup.date().required("End time is required !"),
            })}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <div className="form-group">
                  <TextField
                    error={
                      props.errors.taskName && props.touched.taskName
                        ? true
                        : false
                    }
                    label="taskName"
                    name="taskName"
                    value={props.values.taskName}
                    fullWidth
                    placeholder="taskName"
                    variant="outlined"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={
                      props.errors.taskName && props.touched.taskName
                        ? props.errors.taskName
                        : ""
                    }
                  />
                </div>
                <div className="form-group">
                  <KeyboardDatePicker
                  fullWidth
                    autoOk
                    name="startTime"
                    variant="inline"
                    inputVariant="outlined"
                    label="Start Time"
                    format="dd/MM/yyyy"
                    value={props.values.startTime}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => {
                      props.setFieldValue("startTime", date)
                    }}
                  />
                </div>
                <div className="form-group">
                  <KeyboardDatePicker
                  fullWidth
                    autoOk
                    name="endTime"
                    variant="inline"
                    inputVariant="outlined"
                    label="End Time"
                    format="dd/MM/yyyy"
                    value={props.values.endTime}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => {
                      props.setFieldValue("endTime", date)
                    }}
                  />
                </div>

                {/* <div className="form-group">
                  <TextField
                    error={props.errors.description && props.touched.description ? true : false}
                    label="Description"
                    name="description"
                    fullWidth
                    placeholder="Description"
                    variant="outlined"
                    value={props.values.description}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={
                      props.errors.description && props.touched.description ? props.errors.description : ""
                    }


                  />
                </div> */}
                {/* <FormGroup>
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup aria-label="status" name="status" value={props.values.status}>
                    <FormControlLabel onChange={()=>props.setFieldValue("status", 0)} value={0} control={<Radio />} label="READY" />
                    <FormControlLabel onChange={()=>props.setFieldValue("status", 1)}  value={1} control={<Radio />} label="IN PROGRESS" />
                    <FormControlLabel  onChange={()=>props.setFieldValue("status", 2)} value={2} control={<Radio />} label="COMPLETED" />
                  </RadioGroup>
                </FormGroup> */}
                <FormGroup>
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup aria-label="status">
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={props.handleChange}
                          name="status"
                          checked={props.values.status === "OPEN"}
                          value="OPEN"
                        />
                      }
                      label="OPEN"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={props.handleChange}
                          name="status"
                          checked={props.values.status === "BLOCK"}
                          value="BLOCK"
                        />
                      }
                      label="BLOCK"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={props.handleChange}
                          name="status"
                          checked={props.values.status === "IN_PROGRESS"}
                          value="IN_PROGRESS"
                        />
                      }
                      label="IN_PROGESS"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={props.handleChange}
                          name="status"
                          checked={props.values.status === "CLOSE"}
                          value="CLOSE"
                        />
                      }
                      label="CLOSE"
                    />
                  </RadioGroup>
                </FormGroup>

                {/* <div className="form-group"  >
                  <label>Status</label> <br></br>
                  <div className="form-check form-check-inline ">
                    <input
                      defaultChecked={props.values.status === 0}
                      onChange={props.handleChange}
                      className="form-check-input"
                      name="status"

                      type="radio" value="0" />
                    <label>Ready</label>
                  </div>
                  <div className="form-check form-check-inline ">
                    <input
                      defaultChecked={props.values.status === 1}
                      onChange={props.handleChange}
                      className="form-check-input" name="status" type="radio" value="1" />
                    <label>In Progress</label>
                  </div>
                  <div className="form-check form-check-inline ">
                    <input
                      defaultChecked={props.values.status === 2}
                      onChange={props.handleChange}
                      className="form-check-input" name="status" type="radio" value={2} />
                    <label>Completed</label>
                  </div>

                </div> */}
                {/* <div className="form-group">
                                <label>Status</label>
                                <select 
                                defaultValue={props.values.status}
                                onChange={props.handleChange}
                                className="form-control" name="status" >
                                    <option value="0">Ready</option>
                                    <option  value="1">Inprogess</option>
                                    <option  value="2">Completed</option>
                                    
                                    
                                </select>
                            </div> */}

                <FormGroup>
                  <Button
                    disabled={props.isSubmitting}
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                  &nbsp;
                  <Button onClick={handleCloseModal} variant="contained">
                    Close Form
                  </Button>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </Grid>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchModal: bindActionCreators(actionCreatorsOfModal, dispatch),
    dispatchEditTask: (_id, value) => {
      return dispatch(editTask(_id, value));
    },
    dispatchAddTask: (value) => {
      return dispatch(addTask(value));
    },
  };
};
const withStyle = withStyles(styles);
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyle)(ModalForm);
