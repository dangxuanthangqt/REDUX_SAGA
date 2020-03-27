import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
export class UserHeader extends Component {
    render() {
        // const Decode = jwtDecode(localStorage.getItem("refreshToken"));
        // const user = Decode.data;
        return (
            
            <div>
               
            
            
            </div>
        );
    }
}
UserHeader.propsTypes={
    user : PropTypes.object
}
const mapStateToProps =(state)=>{
    return {
        user : state.userLogined.data
    }
}

export default connect(mapStateToProps, null) (UserHeader);
