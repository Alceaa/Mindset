import React from "react";  
import Header from './header.jsx'

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div>
                <Header />
            </div>
        )
    }
}

export default Dashboard;