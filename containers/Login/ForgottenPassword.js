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
        test: false,
        positionOfAlert: '',
        contentOfAlert: '',
        showAlert: 'none',
        error1: '',
        error2: '',
    }

    // get e-mail to reset password

    passwordResetEmaiil = (event) => {
        event.preventDefault();
        const resetEmail = {
            profileData:{
                profileEmail: this.state.profileEmail,
            }
        };
        if(this.state.profileEmail === ''){
            this.setState({
                contentOfAlert: 'To pole jest wymagane',
                positionOfAlert: 440,
                showAlert: 'block'
            })
        } else {
            axios.post("/password/email", resetEmail, {
                headers:{
                    'Authorization': `Bearer ${window.localStorage.getItem('client-token')}`,
                    'Accept': 'application/json'
                }
            }).then(response => {
                this.setState({
                    contentOfResponse: true,
                    messageOfResponse: 'Na podany adres e-mail została wysłana wiadomość z linkiem resetującym hasło',
                })
            }).catch(error => {
                if(error.response.data.data.profileData.errors.profileEmail == "Podany adres e-mail nie został zweryfikowany. Sprawdź swoją pocztę (w tym folder spam) i kliknij przycisk weryfikacyjny lub wyślij link weryfikacyjny ponownie."){
                    this.setState({
                        contentOfResponse: false,
                        error1: true,
                    })
                } else {
                    this.setState({
                        contentOfAlert: 'Nieznany użytkownik',
                        positionOfAlert: 435,
                        showAlert: 'block'
                    })
                }
            })
        }
    }

    // close alert

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
                                            <form style={this.state.contentOfResponse === true || this.state.contentOfResponse === false ? {display: 'none'} : {display: 'block'}} className="form-login form-forgotten-password">
                                                <div className="text-center header-div-login">
                                                    <label className="header-form-login">Przypomnienie hasła</label>
                                                </div>
                                                <div>
                                                    <input style={this.state.positionOfAlert === 435 ? {borderBottomColor: '#ff426a'} : {}} className="text-input-forgotten-password text-input-login form-control first" type="email" id="exampleInputEmail1" placeholder="Podaj swój adres e-mail" onChange={(event) => { this.setState({ profileEmail: event.target.value }) }} />
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="send-log-in-button" onClick={this.passwordResetEmaiil}>Przypomnij hasło</button>
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
                                                <p className="succes-message">{this.state.messageOfResponse}</p>
                                            </div>
                                            <div style={this.state.contentOfResponse === false ? {display: 'block'} : {display: 'none'}} className="text-center succes-message-container">
                                                <p style={this.state.error2 === true ? {display: 'block'} : {display: 'none'}} className="succes-message">{this.state.messageOfResponse}</p>
                                                <button style={this.state.error2 === true ? {display: 'block'} : {display: 'none'}} type="submit" className="send-log-in-button"><Link className="link-in-button" to="/login-page/registration">Rejestracja</Link></button>
                                                <p className="succes-message" style={this.state.error1 === true ? {display: 'block'} : {display: 'none'}}>Podany adres e-mail nie został zweryfikowany. Sprawdź swoją pocztę (w tym folder spam) i kliknij przycisk weryfikacyjny lub <Link to="/login-page/link-again" onClick={actions.authenticationToken}>wyślij link weryfikacyjny ponownie.</Link></p>
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