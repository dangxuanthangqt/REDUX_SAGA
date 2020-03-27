import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export class AdminRoutes extends Component {
    render() {

        var { exact, component: Mycomponent, path } = this.props;
        return (
            <Route
                path={path}
                exact={exact}
                render={() => {
                    if (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) {
                        return <Mycomponent></Mycomponent>
                    } else {
                        return (<Redirect to={{
                            pathname: "/login",

                        }}>

                        </Redirect>)
                    }

                }}
            >
            </Route>
        );
    }
}

export default AdminRoutes;
