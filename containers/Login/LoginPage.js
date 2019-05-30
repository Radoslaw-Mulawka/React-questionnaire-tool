import React, { Component } from 'react';
import axios from './loginAxiosInstance';
import $ from 'jquery';
import { Redirect, Link, Route, Switch, withRouter } from 'react-router-dom';
import { Context } from './../../index';
import Registration from './Registration';
import Login from './Login';
import ForgottenPassword from './ForgottenPassword';
import EmailConfirmation from './EmailConfirmation';
import VerifyError from './VerifyError';
import VerifyLinkAgain from './VerifyLinkAgain';
import ChangePassword from './ChangePassword';

import {instance} from '../../conf/axios-conf';



class LoginPage extends Component {

    componentDidMount() {

        // check what path of page it is and set view

        if (this.pathName.indexOf("verify") != -1) {
            let hash = window.location.href.slice(window.location.href.lastIndexOf('/'));
            axios.get("/verify" + hash).then(response => {
                this.props.history.push('/login-page/verify');
            }).catch(error => {
                this.props.history.push('/login-page/verify-error');
            })
        } else if (this.pathName.indexOf("reset") !== -1) {
            let hash = window.location.href.slice(window.location.href.lastIndexOf('/'));
            while(hash.charAt(0) === '/'){
                hash = hash.substr(1);
            }
            window.localStorage.setItem("reset-token", hash);
            this.props.history.push('/login-page/password/reset');
        } else if(this.pathName == instance){
            this.props.history.push('/login-page/');
        }

        $(document).ready(function () {
            animateBalloonLogin();
            // animateBalloonSign();
        });


        // login balloon

        function makeNewPositionLogin() {

            var h = $('.img-container-login').height();
            var w = $('.img-container-login').width();



            var nh = Math.random() * 150;
            var nw = Math.random() * 150;


            return [nh, nw];

        }

        function animateBalloonLogin() {
            var newq = makeNewPositionLogin();
            var speed = 5000;

            var height = newq[0] > 20 ? 20 : newq[0];
            var width = newq[1] > 20 ? 20 : newq[1];

            $('.balloon-login').animate({ top: height, right: width }, speed, function () {
                animateBalloonLogin();
            });

        };

        function calcSpeed(prev, next) {

            var x = Math.abs(prev[1] - next[1]);
            var y = Math.abs(prev[0] - next[0]);

            var greatest = x > y ? x : y;

            var speedModifier = 0.1;

            var speed = Math.ceil(greatest / speedModifier);

            return speed;

        }
    }


    pathName = window.location.href;

    render() {
        let hash = window.location.href.slice(window.location.href.lastIndexOf('/'));
        return (
            <Context.Consumer>
                {({ state, actions }) => {
                    return (
                        <React.Fragment>
                            <Switch>
                                <Route exact path='/login-page/' component={Login} />
                                <Route exact path='/login-page/registration' component={Registration} />
                                <Route path="/login-page/forgotten" component={ForgottenPassword} />
                                <Route path="/login-page/verify" component={EmailConfirmation}/>
                                <Route path='/login-page/verify-error' component={VerifyError}/>
                                <Route path='/login-page/link-again' component={VerifyLinkAgain}/>
                                <Route path='/login-page/password/reset' component={ChangePassword}/>
                                <Redirect from='/verify' to={`/login-page/verify${hash}`}/>
                                <Redirect from='/password/reset' to={`/login-page/password/reset${hash}`}/>
                                <Redirect from ='/' to='/login-page/'/>
                            </Switch>
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(LoginPage);