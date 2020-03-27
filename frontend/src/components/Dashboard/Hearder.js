import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserHeader from '../User/UserHeader';

export class Hearder extends Component {
    render() {
        return (
            <header className="bmd-layout-header bg-success">
                <div className="navbar navbar-light bg-faded">

                    <button className="navbar-toggler" type="button" data-toggle="drawer" data-target="#dw-s1">
                        <span className="sr-only">Toggle drawer</span>
                        <i className="material-icons">menu</i>
                    </button>

                    <span className="btn-group-sm">
                        <button type="button" className="btn bmd-btn-fab">
                            <i className="material-icons">grade</i>
                        </button>
                    </span>
                    <span className="btn-group-sm">
                        <button type="button" className="btn bmd-btn-fab">
                            <i className="material-icons">grade</i>
                        </button>
                    </span>
                    <span className="btn-group-sm">
                        <button type="button" className="btn bmd-btn-fab">
                            <i className="material-icons">grade</i>
                        </button>
                    </span>
                    <UserHeader></UserHeader>

                </div>
            </header>

        );
    }
}

export default Hearder;
