import React, { Component } from 'react';
// import {myInstance} from './../index';
// import axios from 'axios';
import axios from './loginAxiosInstance';
import $ from 'jquery';
import { Redirect, Link, Route } from 'react-router-dom';
import { Context } from './../../index';
import GlobalContainer from './../GlobalContainer';


class ForgottenPassword extends Component{

    state = {
        profileEmail: '',
        profilePassword: '',
        profilePassword_confirmation: '',
        profileToken: '',
        contentOfResponse: '',
        messageOfResponse: '',
        contentOfAlert: '',
        positionOfAlert: '',
        showAlert: 'none',
    }

    // reset password

    passwordReset = (event) => {
        event.preventDefault();
        const newPassword = {
            profileData:{
                profileEmail: this.state.profileEmail,
                profilePassword: this.state.profilePassword,
                profilePassword_confirmation: this.state.profilePassword_confirmation,
                profileToken: window.localStorage.getItem("reset-token"),
            }
        };
        if(this.state.profileEmail === ''){
            this.setState({
                contentOfAlert: 'To pole jest wymagane',
                positionOfAlert: 375,
                showAlert: 'block'
            })
        }  else if(this.state.profilePassword === ''){
            this.setState({
                contentOfAlert: 'To pole jest wymagane',
                positionOfAlert: 430,
                showAlert: 'block'
            })
        }else if(this.state.profilePassword_confirmation === ''){
            this.setState({
                contentOfAlert: 'To pole jest wymagane',
                positionOfAlert: 495,
                showAlert: 'block'
            })
        } else if(this.state.profilePassword.length < 6){
            this.setState({
                contentOfAlert: 'Podane hasło jest za krótkie',
                positionOfAlert: 430,
                showAlert: 'block'
            })
        } else if(this.state.profilePassword_confirmation.length < 6) {
            this.setState({
                contentOfAlert: 'Podane hasło jest za krótkie',
                positionOfAlert: 495,
                showAlert: 'block'
            })
        } else if(this.state.profilePassword !== this.state.profilePassword_confirmation){
            this.setState({
                contentOfAlert: 'Potwierdzenie hasła jest niezgodne z nowym hasłem',
                positionOfAlert: 495,
                showAlert: 'block'
            })
        } else {
            axios.post("/password/reset", newPassword, {
                headers:{
                    'Authorization': `Bearer ${window.localStorage.getItem('client-token')}`,
                    'Accept': 'application/json'
                }
            }).then(response => {
                this.setState({
                    contentOfResponse: true,
                })
            }).catch(error => {
                if(error.response.data.data.email == "Nie można znaleźć użytkownika o takim adresie e-mail."){
                    this.setState({
                        contentOfAlert: 'Nieznany użytkownik',
                        positionOfAlert: 375,
                        showAlert: 'block'
                    })
                } else {
                    this.setState({
                        contentOfResponse: false,
                    })
                }
            })
        }
    }

    // close required alert

    closeAlert = (event) => {
        this.setState({
            showAlert: 'none'
        })
    }



    render(){
        return (
            <Context.Consumer>
                {({ state, actions }) => {
                    return(
                        <React.Fragment>
                            <div className="main-to-footer-login">
                                {/*login main container*/}
                                <div className="main-container-login">
                                    {/*logo*/}
                                    <img src="/assets/img/tell-it-us_logo.png" className="logo-login img-responsive" />
                                    {/*container for form and img's*/}
                                    <div className="second-container-login">
                                        {/*form container*/}
                                        <div className="form-container-login">
                                            {/*form*/}
                                            <form style={this.state.contentOfResponse === true || this.state.contentOfResponse === false ? {display: 'none'} : {display: 'block'}} className="form-login form-reset-password">
                                                <div className="text-center header-div-login">
                                                    <label className="header-form-login">Resetowanie hasła</label>
                                                </div>
                                                <div>
                                                    <input style={this.state.positionOfAlert === 375 ? {borderBottomColor: '#ff426a'} : {}} onChange={(event) => { this.setState({ profileEmail: event.target.value })}} className="text-input-forgotten-password text-input-login form-control first" type="email" id="exampleInputEmail-sign" placeholder="Podaj swój adres e-mail"  />
                                                </div>
                                                <div>
                                                    <input style={this.state.positionOfAlert === 430 ? {borderBottomColor: '#ff426a'} : {}} onChange={(event) => { this.setState({ profilePassword: event.target.value })}}  className="text-input-forgotten-password text-input-login form-control" type="password" id="exampleInputPassword2" placeholder="Podaj hasło"  />
                                                </div>
                                                <div>
                                                    <input style={this.state.positionOfAlert === 495 ? {borderBottomColor: '#ff426a'} : {}} onChange={(event) => { this.setState({ profilePassword_confirmation: event.target.value })}} className="text-input-forgotten-password text-input-login form-control last" type="password" id="exampleInputPassword3" placeholder="Potwierdź hasło"  />
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="send-log-in-button" onClick={this.passwordReset}>Resetuj hasło</button>
                                                </div>
                                                {/*alert*/}
                                                <div className="required-alert" style={{
                                                    top: this.state.positionOfAlert,
                                                    display: this.state.showAlert,
                                                }}>
                                                    {this.state.contentOfAlert}
                                                    <div id="triangle"></div>
                                                    <div className="cross" onClick={this.closeAlert}>
                                                        <div>
                                                            <span></span>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            {/*response*/}
                                            <div style={this.state.contentOfResponse === true ? {display: 'block'} : {display: 'none'}} className="text-center succes-message-container">
                                                <p className="succes-message">Twoje hasło zostało zresetowane. Kliknij w przycisk poniżej w celu przejścia do formularzu logowania.</p>
                                                <button type="submit" className="send-log-in-button"><Link to='/login-page' className="link-in-button">Zaloguj się</Link></button>
                                            </div>
                                            <div style={this.state.contentOfResponse === false ? {display: 'block'} : {display: 'none'}} className="text-center succes-message-container">
                                                <p className="succes-message">Podany link weryfikacyjny wygasł, wygeneruj <Link to='/login-page/forgotten' onClick={actions.authenticationToken}>link resetujący hasło</Link> ponownie</p>
                                            </div>
                                        </div>
                                        {/*img's container*/}
                                        <div className="img-container-login">
                                            <img src="/assets/img/first-one-cloud.png" className="first-one-cloud img-responsive" />
                                            <img src="/assets/img/second-two-clouds-login.png" className="second-two-clouds-login img-responsive" />
                                            <img src="/assets/img/balloon-login.png" className="balloon-login img-responsive" />
                                            <img src="/assets/img/town-login.png" className="town" />
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <footer className="text-right">
                                    <span className="footer-span">&copy; 2017, 2018 SI-Consulting</span>
                                </footer>
                            </div>
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}


export default ForgottenPassword;