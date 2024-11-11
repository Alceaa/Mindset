import React from "react";  
import Header from './header.jsx'
import { Link, Navigate} from "react-router-dom";
import getCSRF from '../utils/csrf.js';

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    componentDidMount(){
        getCSRF().then((csrf) =>{
            this.setState({
                csrftoken: csrf
            })
        })
        if(localStorage.getItem("isLogged") === "false"){
            this.setState({
                redirect: true
            })
        }
    }

    render(){
        if (this.state.redirect){
            return <Navigate to="../signin" />
        }
        return(
            <div>
                <Header />
            </div>
        )
    }
}

export default Dashboard;