import AdminHomePage from "../container/AdminHomePage";

import React from 'react';
import Dashboard from "../components/Dashboard/Dashboard";

import RegisterPage from "../container/RegisterPage";
import LoginPage from "../container/LoginPage";

import Taskboard from "../container/Taskboard";
import Mui_TaskBoard from "../container/Mui_Taskboard/Mui_TaskBoard";

export const ROUTES_ADMIN = [
    {
        path: "/",
        name: "Admin page",
        exact: true,
        component: AdminHomePage
        



    },
    {
        path: "/task-board",
        name: "abc",
        exact: false,
        component: Mui_TaskBoard
    }
]

export const ROUTES_LOGIN =[
    {
        path: "/login",
        exact: true,
        name: "LOgin",
        component: <LoginPage></LoginPage>
           
        
    }
]
export const ROUTES_REGISTER =[
    {
        path: "/register",
        exact: true,
        name: "Register",
        component: ()=>(<RegisterPage></RegisterPage>)
           
        
    }
]