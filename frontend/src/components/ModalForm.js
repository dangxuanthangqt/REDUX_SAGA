
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as actionCreatorsModal from '../actions/modal';
import * as actionCreatorsTask from '../actions/task'
import { Field, reduxForm } from 'redux-form'
import validate from '../Helpers/validate';
function ModalForm(props) {
   
    const handleClose = () => {
        props.actionCreatorsModal.hideModal()
    }
    const handleOnSubmit = value => {

        props.actionCreatorsTask.addTask(value)
    }
    const { handleSubmit, pristine, reset, submitting, invalid } = props;
    return (
        <>

            <Modal show={props.Show} onHide={handleClose} animation={true} centered>
                <Modal.Header >
                    <Modal.Title>{props.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit(handleOnSubmit)}>


                        <Field

                            name="title"
                            component={renderField}
                            type="text"
                            label="Title" />
                        <Field

                            name="description"
                            component={renderField}
                            type="text"
                            label="Description" />

                        <div className="form-group">
                            <label>Status</label> <br></br>
                            <div className="form-check form-check-inline ">
                                <Field className="form-check-input" name="status" component="input" type="radio" value="0" />
                                <label>Ready</label>
                            </div>
                            <div className="form-check form-check-inline ">
                                <Field className="form-check-input" name="status" component="input" type="radio" value="1" />
                                <label>In Progress</label>
                            </div>
                            <div className="form-check form-check-inline ">
                                <Field className="form-check-input" name="status" component="input" type="radio" value="2" />
                                <label>Completed</label>
                            </div>

                        </div>




                        <Button variant="primary" onClick={handleClose} type="submit" disabled={pristine || invalid}>
                            Submit
                        </Button>
                        <Button onClick={reset} disabled={pristine || submitting} variant="primary" >
                            Reset
                         </Button>
                        <Button onClick={handleClose} variant="primary" >
                            Close Form
                         </Button>
                    </Form>

                </Modal.Body>

            </Modal>
        </>
    );
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div className="form-group">
            <label>{label}</label>
            <input  {...input} type={type}  className="form-control" placeholder={label} />

            {touched &&
                ((error && <small className="text-danger font-weight-bold">{error}</small>) ||
                    (warning && <small className="text-danger font-weight-bold">{warning}</small>))}
        </div>

    )



const mapStateToProps = (state) => {
    return {
        Show: state.modal.Show,
        Title: state.modal.Title
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionCreatorsModal: bindActionCreators(actionCreatorsModal, dispatch),
        actionCreatorsTask : bindActionCreators(actionCreatorsTask, dispatch)

    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReduxForm = reduxForm({
    // a unique name for the form
    form: 'addTask',
    validate
})
export default compose(withConnect, withReduxForm)(ModalForm);