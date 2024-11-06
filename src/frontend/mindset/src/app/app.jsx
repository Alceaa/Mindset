import React from "react";
import { createRoot } from 'react-dom/client';
import Login from './components/auth/login/login.jsx'
import Registration from './components/auth/registration/registration.jsx'
import Header from './components/header.jsx'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {message: ''};
    }

    render(){
        return(
            <div>
                <Header />
            </div>
        )
    }
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "signin/",
        element: <Login />
    },
    {
        path: "signup/",
        element: <Registration />
    }
])

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);