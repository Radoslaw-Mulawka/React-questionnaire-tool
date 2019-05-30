import React, { Component } from 'react';
// import {myInstance} from './../index';
import $ from 'jquery';
import { Redirect, Link, Route } from 'react-router-dom';
import { Context } from './../../index';
import GlobalContainer from './../GlobalContainer';
// import axios from 'axios';
import axios from './loginAxiosInstance';




class VerifyLinkAgain extends Component {

    state = {
        profileEmail: '',
        contentOfResponse: '',
        messageOfResponse: '',
        contentOfButton: '',
        link: '',
        contentOfAlert: '',
        positionOfAlert: '',
        showAlert: 'none',
    }

    // send verify link again

    sendNewLink = (event) => {
        event.preventDefault();
        const newLink = {
            profileData:{
                profileEmail: this.state.profileEmail,
            }
        };
        if(this.state.profileEmail === ''){
            this.setState({
                contentOfAlert: 'To pole jest wymagane',
                positionOfAlert: 435,
                showAlert: 'block'
            })
        } else {
            axios.post("/sendagain", newLink, {
                headers:{
                    'Authorization': `Bearer ${window.localStorage.getItem('client-token')}`,
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    this.setState({
                        contentOfResponse: true,
                        messageOfResponse: 'Na podany adres e-mail została wysłana wiadomość z linkiem weryfikacyjnym.'
                    })
                }).catch(error => {
                if(error.response.data.data.errors.profileEmail == "Błędny adres e-mail lub adres e-mail nie istnieje."){
                    this.setState({
                        contentOfAlert: 'Nieznany użytkownik',
                        positionOfAlert: 435,
                        showAlert: 'block'
                    })
                } else {
                    this.setState({
                        contentOfResponse: false,
                        messageOfResponse: 'Podany adres e-mail został już zweryfikowany, kliknij w przycisk poniżej aby przejść do formularzu logowania',
                        contentOfButton: 'Zaloguj się',
                        link: '/login-page'
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
                                            <form style={this.state.contentOfResponse === true || this.state.contentOfResponse === false ? {display: 'none'} : {display: 'block'}} className="form-login form-e-mail-confirmation">
                                                <div className="text-center header-div-login">
                                                    <label className="header-form-login header-e-mail-confirmation">Podaj adres e-mail aby ponownie wysłać mail'a z linkiem weryfikacyjnym</label>
                                                </div>
                                                <div>
                                                    <input style={this.state.positionOfAlert === 435 ? {borderBottomColor: '#ff426a'} : {}} className="text-input-login form-control first" type="email" id="exampleInputEmail1" placeholder="Podaj swój adres e-mail" onChange={(event) => { this.setState({ profileEmail: event.target.value }) }} />
                                                </div>
                                                <div className="text-center">
                                                    <button onClick={this.sendNewLink} className="send-log-in-button">Wyślij</button>
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
                                                <p className="succes-message">{this.state.messageOfResponse}</p>
                                                <button type="submit" className="send-log-in-button"><Link to={this.state.link} className="link-in-button">{this.state.contentOfButton}</Link></button>
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


export default VerifyLinkAgain;