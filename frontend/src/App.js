import React, { Component } from "react";

import { ToastContainer } from "react-toastify";
import GlobalLoading from "./components/GlobalLoading";
//import { ReactRouterGlobalHistory } from 'react-router-global-history';
import { BrowserRouter, Switch, Route, Link, Router } from "react-router-dom";
import {
  ROUTES_ADMIN,
  ROUTES_LOGIN,
  ROUTES_REGISTER,
} from "./Router/ConstRoutes";
import AdminRoutes from "./Router/AdminRoutes";
//import { GlobalHistory } from './Helpers/History';
import axios from "axios";
import * as LocalStorageService from "./Helpers/LocalStorageService";
import { createBrowserHistory } from "history";
import AdminHomePage from "./container/AdminHomePage";
import Taskboard from "./container/Taskboard";
import Dashboard from "./components/Dashboard/Dashboard";
import Mui_Dashboard from "./components/Mui_Dashboard/Mui_Dashboard";
//const history = createBrowserHistory();
import history from "./Helpers/HistoryVersion2";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
export class App extends Component {
  ShowAdminRoutes = () => {
    var xhtml = null;
    xhtml = ROUTES_ADMIN.map((route, index) => {
      return (
        <AdminRoutes
          key={index}
          path={route.path}
          component={route.component}
          name={route.name}
          exact={route.exact}
        ></AdminRoutes>
      );
    });

    return xhtml;
  };
  ShowLoginRoute = () => {
    var xhtml = null;
    xhtml = ROUTES_LOGIN.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={() => {
            LocalStorageService.clearAllToken();
            return route.component;
          }}
        ></Route>
      );
    });
    return xhtml;
  };
  ShowRegisterRoute = () => {
    var xhtml;
    xhtml = ROUTES_REGISTER.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={route.component}
        ></Route>
      );
    });
    return xhtml;
  };
  render() {
    return (
      <div className="w-100 h-100">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router history={history}>
            {/* <ReactRouterGlobalHistory /> */}
            {/* <GlobalHistory></GlobalHistory> */}
            <GlobalLoading></GlobalLoading>
            <ToastContainer></ToastContainer>
            <Switch>
              <Route exact path={["/", "/task-board"]}>
                <Mui_Dashboard>
                  <Switch>{this.ShowAdminRoutes()}</Switch>
                </Mui_Dashboard>
              </Route>
              {/* {
              this.ShowAdminRoutes()
            } */}

              {this.ShowLoginRoute()}
              {this.ShowRegisterRoute()}
            </Switch>
          </Router>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default App;
