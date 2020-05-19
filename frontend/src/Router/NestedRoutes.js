import LoginPage from "../container/LoginPage";
import RegisterPage from "../container/RegisterPage";
import { Redirect } from "react-router";
import Mui_Dashboard from "../components/Mui_Dashboard/Mui_Dashboard";
import AdminHomePage from "../container/AdminHomePage";
import Mui_TaskBoard from "../container/Mui_Taskboard/Mui_TaskBoard";
import React from 'react';

const routes =[

    {
        path :"/auth/login",
        exact: true,
        component: LoginPage,
        routes:[]

    },
    {
        path :"/auth/register",
        exact: true,
        component: RegisterPage,
        routes:[]

    },
    {
        path:"/",
        component : ()=> <Redirect to="admin/homepage"></Redirect>,
        routes:[]
    },
    {
        path:"/admin",
        component:()=> Mui_Dashboard,
        routes :[   
            {
                path:"/admin/homepage",
                exact: true,
                component : ()=>(AdminHomePage)
            },
            {
                path:"/admin/task-board",
                exact:true,
                component:()=>(Mui_TaskBoard)
            }

        ]
    }
]
export default routes;