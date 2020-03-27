
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as actionCreatorsModal from '../actions/modal';
import * as actionCreatorsTask from '../actions/task'

import { Formik,Form, Field } from 'formik';
import * as Yup from "yup";


function ModalForm(props) {

    const handleClose = () => {
        props.actionCreatorsModal.hideModal()
    }
    const handleOnSubmit = value => {

        
        if(props.Editing === null){
            props.actionCreatorsTask.addTask(value)
        }
        else{
            
           props.actionCreatorsTask.editTask({
               _id : props.Editing._id,
               ...value
           })
        }
        
    }

    return (
        <>

            <Modal show={props.Show} onHide={handleClose} animation={true} centered>
                <Modal.Header >
                    <Modal.Title>{props.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            title: props.Editing ? props.Editing.title : "",
                            description: props.Editing ? props.Editing.description : "",
                            status: props.Editing ? props.Editing.status : 0
                        }}
                        onSubmit={handleOnSubmit}
                        validationSchema={
                            Yup.object().shape({
                                title: Yup.string()
                                  .min(2, 'Too Short!')
                                  .max(50, 'Too Long!')
                                  .required('Required'),
                                description: Yup.string()
                                  .min(2, 'Too Short!')
                                  .max(50, 'Too Long!')
                                  .required('Required'),
                               
                              })
                        }
                    >






                        {(props) => (<Form onSubmit={props.handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <Field
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Title"
                                  
                                   
                                />
                               { props.errors.title && props.touched.title && <small className="form-text text-danger">{props.errors.title}</small>}
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <Field
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    placeholder="Description"
                                   
                                />
                                { props.errors.description && props.touched.description && <small id="helpId" className="form-text text-danger">{props.errors.description}</small>}
                            </div>

                            <div className="form-group"  >
                                <label>Status</label> <br></br>
                                <div className="form-check form-check-inline ">
                                    <input
                                        defaultChecked ={props.values.status === 0}
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
                                        className="form-check-input" name="status"  type="radio" value="1" />
                                    <label>In Progress</label>
                                </div>
                                <div className="form-check form-check-inline ">
                                    <input
                                     defaultChecked ={props.values.status === 2}
                                        onChange={props.handleChange}
                                        className="form-check-input" name="status" type="radio" value={2} />
                                    <label>Completed</label>
                                </div>

                            </div>
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


                        <Button 
                         disabled ={props.isSubmitting}
                        variant="primary"  type="submit" >
                                Submit
                        </Button>
                            &nbsp;
                        <Button onClick={handleClose} variant="primary" >
                                Close Form
                         </Button>
                        </Form>)}

                    </Formik>






                </Modal.Body>

            </Modal>
        </>
    );
}






const mapStateToProps = (state) => {
    return {
        Show: state.modal.Show,
        Title: state.modal.Title,
        Editing: state.modal.Editing
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionCreatorsModal: bindActionCreators(actionCreatorsModal, dispatch),
        actionCreatorsTask: bindActionCreators(actionCreatorsTask, dispatch)

    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ModalForm);