import React, { Component } from 'react';
// import {myInstance} from './../index';
// import axios from 'axios';
import axios from './loginAxiosInstance';
import $ from 'jquery';
import { Redirect, Link, Route } from 'react-router-dom';
import { Context } from './../../index';
import GlobalContainer from './../GlobalContainer';
import Recaptcha from 'react-recaptcha';
import { recaptchaSecret } from './../../conf/recaptcha-conf';


class Registration extends Component {
    state = {
        userRegistrationData: {
            userEmail: null,
            userPassword: null,
            password: "",
        },
        profileEmail: "",
        profilePassword: "",
        profilePasswordConfirmed: "",
        profileAcceptTerms: "",
        contentOfAlert: '',
        positionOfAlert: '',
        captchaCheck: true,
        recaptchaSecret: recaptchaSecret,
        registrationSucces: false,
        succesMessage: '',
        showAlert: 'none',
        contentOfResponse: false,
        errorOne: false,
        errorTwo: false,
    }

    componentDidMount() {
        $(document).ready(function () {
            animateBalloonSign();
        });


        // regulations

        $('.regulations-link').on('click', function (event) {
            $('.regulations-container').addClass('regulations-show');
        })

        $('.close-regulations-button').on('click', function () {
            $('.regulations-container').removeClass('regulations-show');
        })

        $(document).click(function (e) {
            if ($(e.target).is('.regulations-container')) {
                $('.regulations-container').removeClass('regulations-show');
            }
        });


        // sign balloon

        function makeNewPositionSign() {

            var h = $('.img-container-sign').height() - 100;
            var w = $('.img-container-sign').width() - 100;



            var nh = Math.random() * h;
            var nw = Math.random() * w;



            return [nh, nw];

        }

        function animateBalloonSign() {
            var newq = makeNewPositionSign();
            var oldq = $('.balloon-sign').position();
            var speed = 5000;

            $('.balloon-sign').animate({ top: newq[0], right: newq[1] }, speed, function () {
                animateBalloonSign();
            });

        };


    }

    // stop propagination

    stopPropagation = (event) => {
        event.preventDefault();
    }

    // close alert

    closeAlert = (event) => {
        this.setState({
            showAlert: 'none'
        })
    }

    // send registration data

    sendRegistration = (event) => {
        event.preventDefault();
        const newData = {
            profileData:{
                profileEmail: this.state.profileEmail,
                profilePassword: this.state.profilePassword,
                profilePasswordConfirmed: this.state.profilePasswordConfirmed,
                profileAcceptTerms: this.state.profileAcceptTerms
            }
        };

        if(this.state.profileEmail === ""){
            this.setState({
              contentOfAlert: 'To pole jest wymagane',
              positionOfAlert: 330,
              showAlert: 'block'
            })
        }  else if(this.state.profilePassword === ""){
            this.setState({
                contentOfAlert: 'To pole jest wymagane',
                positionOfAlert: 385,
                showAlert: 'block'
            })
        }else if(this.state.profilePasswordConfirmed === ""){
            this.setState({
                contentOfAlert: 'To pole jest wymagane',
                positionOfAlert: 440,
                showAlert: 'block'
            })
        } else if(this.state.profileAcceptTerms === ""){
            this.setState({
                contentOfAlert: 'Akceptacja regulaminu jest wymagana',
                positionOfAlert: 505,
                showAlert: 'block'
            })
        } else if(this.state.profileEmail.length < 6){
            this.setState({
                contentOfAlert: 'Podany adres e-mail jest za krótki',
                positionOfAlert: 330,
                showAlert: 'block'
            })
        } else if(this.state.profilePassword.length < 6){
            this.setState({
                contentOfAlert: 'Podane hasło jest za krótkie',
                positionOfAlert: 385,
                showAlert: 'block'
            })
        } else if(this.state.profilePasswordConfirmed.length < 6) {
            this.setState({
                contentOfAlert: 'Podane hasło jest za krótkie',
                positionOfAlert: 440,
                showAlert: 'block'
            })
        } else if(this.state.profilePassword !== this.state.profilePasswordConfirmed){
            this.setState({
                contentOfAlert: 'Potwierdzenie hasła jest niezgodne z nowym hasłem',
                positionOfAlert: 440,
                showAlert: 'block'
            })
        } else {
            axios.post("/register", newData, {
                headers:{
                    'Authorization': `Bearer ${window.localStorage.getItem('client-token')}`,
                    'Accept': 'application/json'
                }
            }).then(response => {
                this.setState({
                    registrationSucces: true,
                    succesMessage: response.data.message,
                    showAlert: 'none'
                })
            }).catch(error=>{
                if(error.response.data.data.errors.profileEmail == 'Użytkownik jest już zarejestrowany. Zaloguj się lub użyj funkcji przypominania hasła.'){
                    this.setState({
                        contentOfResponse: true,
                        errorOne: true
                    })
                } else if (error.response.data.data.errors.profileEmail == 'To pole musi być poprawnym adresem e-mail.'){
                    this.setState({
                        contentOfAlert: 'To pole musi być poprawnym adresem e-mail.',
                        positionOfAlert: 330,
                        showAlert: 'block'
                    })
                } else if(error.response.data.data.errors.profileAcceptTerms == 'To pole musi zostać zaakceptowane.'){
                    this.setState({
                        contentOfAlert: 'Akceptacja regulaminu jest wymagana',
                        positionOfAlert: 505,
                        showAlert: 'block',
                        profileAcceptTerms: 0,
                    })
                } else if(error.response.data.data.errors.profileAcceptTerms == 'To pole jest wymagane.'){
                    this.setState({
                        contentOfAlert: 'Akceptacja regulaminu jest wymagana',
                        positionOfAlert: 505,
                        showAlert: 'block',
                        profileAcceptTerms: 0,
                    })
                } else {
                    this.setState({
                        contentOfResponse: true,
                        errorTwo: true
                    })
                }
            });
        }
    }

    checkCheckBox = (event) => {
        if(event.target.checked == true){
            this.setState({
                profileAcceptTerms: 1
            })
        } if(event.target.checked == false){
            this.setState({
                profileAcceptTerms: ""
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

        // recaptcha

        const Recaptcha = require('react-recaptcha');

        // specifying your onload callback function
        var callback = function () {
            console.log('Done!!!!');
        };

        const verifyCallback = (response) => {
            this.setState({
                captchaCheck: false
            })

            if(this.state.captchaCheck === true){
                this.setState({
                    captchaCheck: false
                })
            }
        };

        return (
            <Context.Consumer>
                {({ state, actions }) => {
                    return(
                        <React.Fragment>
                            <div className="main-to-footer-sign">
                                <div className="main-container-sign">
                                    {/*logo*/}
                                    <img src="/assets/img/tell-it-us_logo.png" className="logo-sign img-responsive" />
                                    {/*main container sing*/}
                                    <div className="second-container-sign">
                                        { this.state.contentOfResponse === false ?
                                            (
                                                // form container
                                                <div className="form-container-sign">
                                                    { this.state.registrationSucces !== true ?
                                                        (
                                                            // form
                                                            <form className="form-sign">
                                                                <div className="text-center header-div-sign">
                                                                    <label className="header-form-sign"><span className="bold-sign">Rejestracja</span> do najlepszej</label>
                                                                    <label className="header-form-sign last">aplikacji ankietującej</label>
                                                                </div>
                                                                <div>
                                                                    <input style={this.state.positionOfAlert === 330 || this.state.positionOfAlert === 300 ? {borderBottomColor: '#ff426a'} : {}} className="text-input-sign form-control first" type="email" id="exampleInputEmail-sign" placeholder="Podaj swój adres e-mail" onChange={(event) => { this.setState({ profileEmail: event.target.value }) }} />
                                                                </div>
                                                                <div>
                                                                    <input style={this.state.positionOfAlert === 385 ? {borderBottomColor: '#ff426a'} : {}} className="text-input-sign form-control" type="password" id="exampleInputPassword2" placeholder="Podaj hasło" onChange={(event) => { this.setState({ profilePassword: event.target.value }) }} />
                                                                </div>
                                                                <div>
                                                                    <input style={this.state.positionOfAlert === 440 ? {borderBottomColor: '#ff426a'} : {}} className="text-input-sign form-control" type="password" id="exampleInputPassword3" placeholder="Potwierdź hasło" onChange={(event) => { this.setState({ profilePasswordConfirmed: event.target.value }) }} />
                                                                </div>
                                                                <div className="checkboxes-container">
                                                                    <input className="form-check-input" id="exampleCheck1" type="checkbox" onClick={this.checkCheckBox}/>
                                                                    <label className="form-check-label"  htmlFor="exampleCheck1">
                                                                        <p className="check-p">Akceptuję <span onClick={this.stopPropagation} className="regulations-link">regulamin</span> w celu utworzenia bezpłatnego konta w serwisie Tell-it.us</p>
                                                                    </label>
                                                                </div>
                                                                {/*regulations*/}
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
                                                                {/*captcha*/}
                                                                <div className="captcha-container text-center">
                                                                    <Recaptcha
                                                                        sitekey={this.state.recaptchaSecret}
                                                                        verifyCallback={verifyCallback}
                                                                        onloadCallback={callback}
                                                                        hl={"pl"}
                                                                    />
                                                                </div>
                                                                <div className="text-center">
                                                                    <button style={this.state.captchaCheck == true ? {backgroundColor: 'black', cursor: 'not-allowed'} : {}} disabled={this.state.captchaCheck ? 'disabled' : null}  className="send-sign-button" onClick={this.sendRegistration}>Rejestruj</button>
                                                                </div>
                                                            </form>
                                                        ) :
                                                        (
                                                            // response
                                                            <div className="text-center succes-message-container">
                                                                <p className='succes-message'>Rejestracja zakończona sukcesem.</p>
                                                                <p className='succes-message'>Na podany adres została wysłana wiadomość z linkiem weryfikacyjnym.</p>
                                                            </div>
                                                        )}
                                                </div>
                                            ) : (
                                                // response
                                                <div className="form-container-sign">
                                                    <div style={this.state.contentOfResponse === true ? {display: 'block'} : {display: 'none'}} className="text-center succes-message-container">
                                                        <p style={this.state.errorOne === true ? {display: 'block'} : {display: 'none'}} className="succes-message">Użytkownik jest już zarejestrowany. <Link to="/login-page">Zaloguj się</Link> lub użyj funkcji <Link to="/login-page/password">przypominania hasła.</Link></p>
                                                        <p style={this.state.errorTwo === true ? {display: 'block'} : {display: 'none'}} className="succes-message">Podany adres e-mail nie został zweryfikowany. Sprawdź swoją pocztę (w tym folder spam) i kliknij przycisk weryfikacyjny lub <Link to="/login-page/link-again" onClick={actions.authenticationToken}>wyślij link weryfikacyjny ponownie.</Link></p>
                                                    </div>
                                                </div>
                                            )}
                                        {/*img's container*/}
                                        <div className="img-container-sign">
                                            <img src="/assets/img/first-one-cloud.png" className="first-one-cloud" />
                                            <img src="/assets/img/second-two-clouds-sign.png" className="second-two-clouds-sign" />
                                            <img src="/assets/img/balloon-login.png" className="balloon-sign img-responsive" />
                                            <img src="/assets/img/bottom-clouds-sign.png" className="bottom-clouds-sign" />
                                        </div>
                                    </div>
                                </div>
                                {/*regulations*/}
                                <div className="regulations-container text-center">
                                    <div className="text-right">
                                        <button className="close-regulations-button">x</button>
                                    </div>
                                    <embed src="/assets/files/Regulamin_serwisu_internetowego_TellItUS.pdf" type="application/pdf" width="70%" height="85%" />
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


export default Registration;