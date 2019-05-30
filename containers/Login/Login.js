import React, { Component } from 'react';
import axios from './loginAxiosInstance';
import {client_id, client_secret} from './../../conf/axios-conf';
import $ from 'jquery';
import { Redirect, Link, Route } from 'react-router-dom';
import { Context } from './../../index';
import GlobalContainer from './../GlobalContainer';
// import {client_id, client_secret} from './../../conf/axios-conf';
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            verifyHash: '',
            username: '',
            password: '',
            grant_type: "password",
            client_id: client_id,
            client_secret: client_secret,
            refreshPage: false,
            contentOfAlert: '',
            positionOfAlert: '',
            showAlert: 'none',
            contentOfPage: false,
            error1: '',
            error2: '',
        }
        this.loginInput = React.createRef();
    }




    componentDidMount() {
        this.loginInput.current.focus();
        // regulations

        $('.regulations-link').on('click', function(){
            $('.regulations-container').addClass('regulations-show');
        })

        $('.close-regulations-button').on('click', function(){
            $('.regulations-container').removeClass('regulations-show');
        })

        $(document).click(function (e) {
            if ($(e.target).is('.regulations-container')) {
                $('.regulations-container').removeClass('regulations-show');
            }
        });

    }

    // login handler

    loginSubmitHandler = event => {
        event.preventDefault();
        const dataForSending = {
            username: this.state.username,
            password: this.state.password,
            grant_type: this.state.grant_type,
            client_id: this.state.client_id,
            client_secret: this.state.client_secret,
        }
        if(this.state.username == ''){
            this.setState({
                contentOfAlert: 'To pole jest wymagane',
                positionOfAlert: 370,
                showAlert: 'block'
            })
        }else if (this.state.password == ''){
            this.setState({
                contentOfAlert: 'To pole jest wymagane',
                positionOfAlert: 425,
                showAlert: 'block'
            })
        }else {
            axios.post("/oauth/token", dataForSending).then(response => {
                window.localStorage.setItem("token", response.data.access_token);
                this.setState({
                    refreshPage: true
                });
                this.props.history.push('/home');
                
            }).catch(error =>{
                if(error.response.data.message === "The user credentials were incorrect."){
                    this.setState({
                        contentOfAlert: 'Podane hasło jest błędne',
                        positionOfAlert: 425,
                        showAlert: 'block'
                    })
                }else if(error.response.data.message === "Nieznany użytkownik lub złe hasło."){
                    this.setState({
                        contentOfAlert: 'Nieznany użytkownik',
                        positionOfAlert: 370,
                        showAlert: 'block'
                    })
                } else {
                    this.setState({
                        contentOfPage: true,
                        error2: true,
                    })
                }
            });
        }
        
    };

    // close alert

    closeAlert = event => {
        this.setState({
            showAlert: 'none'
        })
    }


    render() {
        return (
            <Context.Consumer>
                {({ state, actions }) => {
                    return (
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
                                            <form style={this.state.contentOfPage === false ? {display: 'block'} : {display: 'none'}} className="form-login">
                                                <div className="text-center header-div-login">
                                                    <label className="header-form-login"><span className="bold-login">Zaloguj się</span> do najlepszej</label>
                                                    <label className="header-form-login last">aplikacji ankietującej</label>
                                                </div>
                                                <div>
                                                    <input style={this.state.positionOfAlert === 370 ? {borderBottomColor: '#ff426a'} : {}} className="text-input-login form-control first" type="email" id="exampleInputEmail1" placeholder="Podaj swój adres e-mail" ref={this.loginInput} onChange={(event) => { this.setState({ username: event.target.value })}} />
                                                </div>
                                                <div>
                                                    <input style={this.state.positionOfAlert === 425 ? {borderBottomColor: '#ff426a'} : {}} className="text-input-login form-control" type="password" id="exampleInputPassword1" placeholder="Podaj hasło" onChange={(event) => { this.setState({ password: event.target.value }) }} />
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="send-log-in-button" onClick={this.loginSubmitHandler}>Zaloguj się</button>
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
                                                {/*regulations*/}
                                                <p className="regulations"><span className="regulations-red-star">*</span> Logując się, akceptujesz <span className="regulations-link">regulamin</span> serwisu Tell-it.us</p>
                                                {/*links*/}
                                                <Link to='/login-page/forgotten' onClick={actions.authenticationToken} className="links-login link-first">Zapomniałem hasła</Link>
                                                <Link to="/login-page/registration" onClick={actions.authenticationToken} className="links-login">Zarejestruj się</Link>
                                               {/*  <Link to="/login-page/link-again" onClick={actions.authenticationToken} className="links-login">Ponowna wysyłka maila weryfikującego</Link> */}
                                            </form>
                                            {/*response*/}
                                            <div className="text-center succes-message-container" style={this.state.contentOfPage === true ? {display: 'block'} : {display: 'none'}}>
                                                <p className="succes-message" style={this.state.error2 === true ? {display: 'block'} : {display: 'none'}}>Podany adres e-mail nie został zweryfikowany. Sprawdź swoją pocztę (w tym folder spam) i kliknij przycisk weryfikacyjny lub <Link to="/login-page/link-again" onClick={actions.authenticationToken}>wyślij link weryfikacyjny </Link>ponownie.</p>
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
loadProgressBar(null,axios);
export default Login;