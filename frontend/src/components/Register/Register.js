import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionRegister from '../../actions/register';
import { bindActionCreators } from 'redux';
import { registerRequestCheck } from '../../apis/register';
class Register extends Component {

    handleOnSubmit =(value)=>{
        console.log(value)
        this.props.actionRegister.register(value)
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
                            con_password:""
                        }
                    }
                    validationSchema={Yup.object().shape({
                        
                        password: Yup.string()

                            .min(6, "Password minimun is 6 characters !")
                            .max(15, "Password maximun is 15 characters !")
                            .required("Password is required !")
                        ,
                        con_password: Yup.string()
                        .oneOf([Yup.ref('password'), null], "Password does not match !")
                        .required('Password confirm is required')
                    })}

                >

                    {
                        (props) => (

                            <Form 
                            style={{borderRadius: "25px",
                            
                        }}
                            onSubmit={props.handleSubmit}
                            className="card  bg-light ry col-sm-5">

                                <div className="card-header text-center">
                                    <h3>REGISTER</h3>
                                </div>
                                <div className="card-body">

                                    <div className="form-group">

                                    <span className="fa fa-user fa-2x" aria-hidden="true" />
                                        <Field
                                            validate={validateEmail}
                                           
                                            type="text"
                                            className="form-control"
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
                                    <div className="form-group ">
                                    <i className="fa fa-lock fa-2x" aria-hidden="true" />
                                        <input
                                            value={props.values.con_password}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}

                                            type="password"
                                            className="form-control"
                                            name="con_password"
                                            placeholder="COMFIRM PASSWORD" />
                                        {
                                            props.errors.con_password && props.touched.con_password ? <span className="error" style={{ color: "red" }}>
                                                {props.errors.con_password}
                                            </span> : null
                                        }
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        
                                        <button style={{borderRadius: "25px"}} type="submit" className="btn btn-success btn-raised col-sm-5 "> Register </button>
                                       
                                        
                                        <Link to="/login" style={{borderRadius: "25px"}} className="btn btn-danger btn-raised col-sm-5 "> Back to Login </Link>
                                       
                                    
                                   
                                    </div>
                                   








                                </div>

                            </Form>

                        )

                    }
                </Formik>
            </div>
        );
    }
}
async function validateEmail(value) {
    console.log(value)
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }else {
        try{
             await registerRequestCheck(value);
            //console.log("tai khaan ton tai")
            
        }catch(e){
            error = "Email does exist !"
          //  console.log(e);
        }
     

    }

    return error;
  }
const mapDispatchToProps =(dispatch)=>{
    return {
        actionRegister : bindActionCreators(actionRegister, dispatch)
    }

}
export default connect(null, mapDispatchToProps)(Register);
