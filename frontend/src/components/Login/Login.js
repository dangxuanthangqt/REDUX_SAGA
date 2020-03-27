import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionLoginCreators from '../../actions/login';
class Login extends Component {

    handleOnSubmit = (value) => {
        this.props.actionLoginCreators.action_login(value, this.props.history);
    }
    render() {

        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center rounded bg-success">
                <Formik
                    onSubmit={this.handleOnSubmit}
                    initialValues={
                        {
                            email: "",
                            password: "",

                        }
                    }
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email("Email is not valid! ")
                            .required("Email is required!")
                        ,
                        password: Yup.string()
                            .min(6, "Password minimun is 6 characters !")
                            .max(15, "Password maximun is 15 characters !")
                            .required("Password is required !")

                    })}

                >

                    {
                        (props) => (

                            <Form
                                style={{
                                    borderRadius: "25px",

                                }}
                                onSubmit={props.handleSubmit}
                                className="card  bg-light ry col-sm-5">

                                <div className="card-header text-center">
                                    <h3>Login</h3>
                                </div>
                                <div className="card-body">

                                    <div className="form-group ">
                                        
                                            <span className="fa fa-user fa-2x" aria-hidden="true" />

                                            <input
                                                value={props.values.email}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                type="text"
                                                className="form-control "
                                                name="email"
                                                placeholder="EMAIL"
                                            />
                                       

                                        {
                                            props.errors.email && props.touched.email ? <span className="error" style={{ color: "red" }}>
                                                {props.errors.email}
                                            </span> : null
                                        }

                                    </div>
                                    <div className="form-group">
                                        <i className="fa fa-lock fa-2x" aria-hidden="true" />

                                        <input
                                            value={props.values.password}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="PASSWORD" />
                                        {
                                            props.errors.password && props.touched.password ? <span className="error" style={{ color: "red" }}>
                                                {props.errors.password}
                                            </span> : null
                                        }
                                    </div>

                                    <div style={{ borderRadius: "25px" }}>
                                        <button style={{ borderRadius: "25px" }} type="submit" className="btn btn-success btn-raised  btn-block "> Login </button>
                                    </div>









                                </div>
                                <div className="text-center">
                                    <h5>
                                        Don't have an account? <Link to="/register" > Create one.</Link>
                                    </h5>

                                </div>

                            </Form>


                        )

                    }



                </Formik>

            </div>
        );
    }
}
const mapDispatchToProps =(dispatch)=>{
    return {
        actionLoginCreators : bindActionCreators(actionLoginCreators, dispatch)
    }
}
export default withRouter( connect(null, mapDispatchToProps)(Login));