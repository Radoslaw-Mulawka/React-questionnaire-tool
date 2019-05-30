import React, { Component } from 'react';
// import {myInstance} from './../index';
// import axios from 'axios';
import axios from './loginAxiosInstance';
import $ from 'jquery';
import { Redirect, Link, Route } from 'react-router-dom';
import { Context } from './../../index';
import GlobalContainer from './../GlobalContainer';


class EmailConfirmation extends Component{


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
                                            <form className="form-login form-e-mail-confirmation">
                                                <div className="text-center header-div-login">
                                                    <label className="header-form-login header-e-mail-confirmation">Twój e-mail został potwierdzony. Dziękujemy za zajerestrowanie się w serwisie Tell-it.us</label>
                                                    <span className="description-e-mail-confirmation">Kliknij w przycisk poniżej aby przejść do formularzu logowania</span>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="send-log-in-button"><Link to="/login-page" className="link-in-button">Zaloguj się</Link></button>
                                                </div>
                                            </form>
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


export default EmailConfirmation;