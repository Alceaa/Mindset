import React from "react";
import "../../../css/auth/auth.scss";
import Header from '../../header.jsx'
import { Link, Navigate} from "react-router-dom";
import Cookies from 'js-cookie';


class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            csrftoken: Cookies.get('csrftoken')
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.password2 != this.state.password1){
            this.setState({
                error: "Пароли не совпадают"
            })
            return;
        }
        await fetch(process.env.REACT_APP_BASE_API_URL + "auth/registration",{
            method: 'POST', 
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': this.state.csrftoken
            }, 
            credentials: 'include',
            body: JSON.stringify(
                {
                    "username":this.state.login,
                    "email":this.state.email,
                    "password":this.state.password1,
                }
            )}
        )
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.status == "Success"){
                this.setState({
                    redirect: true
                })
                localStorage.setItem('isLogged', true);
            }
            Object.values(data).forEach((value) => {
                this.setState({
                    error: value
                })
            });
        })
    }
    render(){
        if (this.state.redirect){
            return <Navigate to="/" />
        }
        return(
            <div>
                <Header />
                <div className={ "baseContainer" }>
                    <div className={ "formContainer" }>
                        <h2 className={ "formTitle" }>Регистрация</h2>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Почта:
                                <input name="email" type="email" value={this.state.email || ''} onChange={this.handleInputChange} required/>
                            </label>
                            <label>
                                Имя пользователя:
                                <input name="login" type="text" value={this.state.login || ''} onChange={this.handleInputChange} required/>
                            </label>
                            <label>
                                Пароль:
                                <input name="password1" type="password" onChange={this.handleInputChange} required/>
                            </label>
                            <label>
                                Повторите пароль:
                                <input name="password2" type="password" onChange={this.handleInputChange} required/>
                            </label>
                            <div name="error" className={ "errorMessage" }>{this.state.error}</div>
                            <div className={ "bottomContainer" }>
                                <Link className={ "link" } to={'/../signin/'}>Уже есть аккаунт</Link>
                                <input type="submit" value="Зарегистрироваться"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default Registration;