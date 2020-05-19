import React, { Component } from 'react';
import Login from '../components/Login/Login';
import { Helmet } from 'react-helmet';
export class LoginPage extends Component {
    render() {
        return (
            <>
            <Helmet>
                <title>Login ne</title>
            </Helmet>
             <Login>
               
               </Login>
            </>
          
        );
    }
}

export default LoginPage;
