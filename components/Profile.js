import React, { Component } from 'react';
import GlobalContainer from './../containers/GlobalContainer';
import Radium, { StyleRoot } from 'radium';
import Settings from './Settings';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { AppContext } from './../App';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            password: false,
            userChangePassword: {
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
                validationIfTheSame: "",
                validationIfToShort: "",
                validationIfBadOld: "",
                validationGood: "",
                validationIfOldEmpty: "",
                validationIfNewEmpty: "",
                validationIfConfirmEmpty: "",
                contentOfAlert: "",
                positionOfAlert: "",
                smPostionOfAlert: "",
                displayAlert: ""
            },
            profileInfo: {
                picture: '',
                firstName: '',
                lastName: '',
                email: '',
                registrationDate: '',
                clickCheckFirst: '',
                clickCheckLast: '',
                deleteProfile: '',
                confirmIfWantToDelete: '',
                inputValue: '',
            }
        }
    }

    componentDidMount() {

        // get data from api

        axios.get('/profile')
            .then(response => {
                const email = response.data.data.profileEmail;
                this.setState({ email: email })
                const registrationDate = response.data.data.profileCreatedAt;
                this.setState({ registrationDate: registrationDate })
                const firstName = response.data.data.profileFirstName;
                this.setState({ firstName: firstName })
                const lastName = response.data.data.profileLastName;
                this.setState({ lastName: lastName })
            })
    }


    render() {

        // confirm if want to delete

        const confirmIfWantDelete = (event) => {
            this.setState({ confirmIfWantToDelete: true })
        }

        // show delete profile pop up

        const popUpShow = {
            'display': this.state.confirmIfWantToDelete ? 'block' : 'none'
        }

        // delete profile

        const deleteProfileHandler = (event) => {
            axios.delete('/profile', {
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    window.localStorage.removeItem('token');
                    this.props.history.push('/login-page')
                });
        }

        // send new first name

        const sendFirstNameHandler = (event) => {
            this.setState({ clickCheckFirst: false })
            const newFirstName = {
                "profileData": {
                    profileFirstName: this.state.firstName,
                }
            };
            axios.put('/profile', newFirstName).then(response => {
                let userCredentials = {
                    profileFirstName: response.data.data.profileFirstName,
                    profileLastName: response.data.data.profileLastName,
                    profileEmail: response.data.data.profileEmail,
                }
                window.sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials));
                this.props.changeUserCredentials();
            });
        }

        // send new last name

        const sendLastNameHandler = (event) => {
            this.setState({ clickCheckLast: false })
            const newLastName = {
                "profileData": {
                    profileLastName: this.state.lastName,
                }
            };
            axios.put('/profile', newLastName)
                .then(response => {
                });
        }

        // show change password

        const showChange = (event) => {
            event.preventDefault();
            this.setState({ password: true });
        };

        // hide change password

        const hideChange = (event) => {
            event.preventDefault();
            this.setState({
                password: false,
                validationIfTheSame: false,
                validationIfToShort: false,
                validationIfBadOld: false,
                validationGood: false,
                validationIfEmpty: false,
            })
        };

        //get the value of new password

        const crossInAlert = (event) => {
            this.setState({
                displayAlert: 'none'
            })
        }

        // logout handler

        const logoutHandler = () => {
            window.localStorage.removeItem('token');
            window.location.reload();
            // this.props.history.push('/login-page')
        }

        // send new password

        const sendNewPasswordHandler = (event) => {
            event.preventDefault();
            const changePassword = {
                "profileData": {
                    passwordOld: this.state.oldPassword,
                    passwordNew: this.state.newPassword,
                    password_confirmed: this.state.confirmNewPassword,
                }
            };

            if (this.state.oldPassword === undefined) {
                this.setState({
                    validationIfOldEmpty: true,
                    validationIfBadOld: true,
                    contentOfAlert: 'To pole jest wymagane',
                    displayAlert: 'block',
                    positionOfAlert: 374,
                    smPositionOfAlert: 489,
                })
            } else if (this.state.newPassword === undefined) {
                this.setState({
                    validationIfBadOld: false,
                    validationIfOldEmpty: false,
                    validationIfNewEmpty: true,
                    contentOfAlert: 'To pole jest wymagane',
                    displayAlert: 'block',
                    positionOfAlert: 436,
                    smPositionOfAlert: 548,
                })
            } else if (this.state.confirmNewPassword === undefined) {
                this.setState({
                    validationIfTheSame: true,
                    validationIfOldEmpty: false,
                    validationIfNewEmpty: false,
                    validationIfBadOld: false,
                    validationIfConfirmEmpty: true,
                    contentOfAlert: 'To pole jest wymagane',
                    displayAlert: 'block',
                    positionOfAlert: 496,
                    smPositionOfAlert: 613,
                })
            } else if (this.state.newPassword !== this.state.confirmNewPassword) {
                this.setState({
                    validationIfTheSame: true,
                    validationIfOldEmpty: false,
                    validationIfNewEmpty: false,
                    validationIfBadOld: false,
                    validationIfConfirmEmpty: false,
                    displayAlert: 'block',
                    positionOfAlert: 496,
                    contentOfAlert: 'Potwierdzenie hasła jest niezgodne z nowym hasłem',
                    smPositionOfAlert: 613,
                })
            } else {
                this.setState({
                    validationIfTheSame: false,
                })
                axios.put('/profile/changepassword', changePassword)
                    .then(response => {
                        this.setState({
                            validationIfToShort: false,
                            validationIfBadOld: false,
                            validationGood: true,
                            validationIfOldEmpty: false,
                            validationIfNewEmpty: false,
                            validationIfConfirmEmpty: false,
                            inputValue: '',
                            displayAlert: 'none',
                        })
                    }).catch(error => {
                        if (error.response.data.status_code === 422) {
                            if (this.state.oldPassword.length < 6) {
                                this.setState({
                                    validationIfToShort: true,
                                    validationIfOldEmpty: false,
                                    validationIfNewEmpty: false,
                                    validationIfConfirmEmpty: false,
                                    contentOfAlert: 'Podane hasło jest za krótkie',
                                    validationIfBadOld: true,
                                    displayAlert: 'block',
                                    positionOfAlert: 374,
                                    smPositionOfAlert: 489,
                                })
                            } else if (this.state.newPassword.length < 6) {
                                this.setState({
                                    validationIfToShort: true,
                                    validationIfOldEmpty: false,
                                    validationIfBadOld: false,
                                    validationIfConfirmEmpty: false,
                                    contentOfAlert: 'Podane hasło jest za krótkie',
                                    validationIfNewEmpty: true,
                                    displayAlert: 'block',
                                    positionOfAlert: 436,
                                    smPositionOfAlert: 548,
                                })
                            } else if (this.state.confirmNewPassword.length < 6) {
                                this.setState({
                                    validationIfTheSame: true,
                                    validationIfOldEmpty: false,
                                    validationIfNewEmpty: false,
                                    validationIfConfirmEmpty: false,
                                    displayAlert: 'block',
                                    positionOfAlert: 496,
                                    smPositionOfAlert: 613,
                                    contentOfAlert: 'Podane hasło jest za krótkie'
                                })
                            }
                        } else if (error.response.data.status_code === 406) {
                            this.setState({
                                validationIfToShort: false,
                                validationIfBadOld: true,
                                validationIfOldEmpty: false,
                                validationIfNewEmpty: false,
                                validationIfConfirmEmpty: false,
                                displayAlert: 'block',
                                positionOfAlert: 374,
                                smPositionOfAlert: 489,
                                contentOfAlert: 'Podane hasło jest błędne'
                            })
                        }
                    });
            }
        }

        return (
            <StyleRoot>
                <GlobalContainer>
                    <Settings pageName="PROFIL UŻYTKOWNIKA" />
                    <div className="grid-container-profile main-profile">

                        {/*main container*/}
                        <div className="grid-item user-settings-profile">

                            {/*header*/}
                            <h4 className="grid-item settings-header-profile">Ustawienia konta</h4>

                            {/*img edit*/}
                            <div className="user-img-container-profile" style={{
                                '@media (max-width: 360px)': {
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }
                            }}>
                                <img src="assets/img/avatar_circle_blue.png" />
                                <p className="edit-avatar-profile">Edytuj</p>
                            </div>

                            {/*form*/}
                            <form className="user-form-profile">

                                {/*first name input*/}
                                <label className="first-profile change-name-header" htmlFor="uname">Imię</label>
                                <br />

                                {/*before edit*/}
                                <span style={this.state.clickCheckFirst == true ? { display: 'none' } : { display: 'inline-block' }} className="name-span hidden-span">{this.state.firstName}</span>
                                <img src="assets/img/icons/pensil.png" onClick={(event) => { this.setState({ clickCheckFirst: true }) }} style={this.state.clickCheckFirst == true ? { display: 'none' } : { display: 'inline-block' }} className="icon-profile edit-icon" />

                                {/*after edit*/}
                                <input style={this.state.clickCheckFirst == true ? { display: 'inline-block ' } : { display: 'none' }} value={this.state.firstName} onChange={(event) => { this.setState({ firstName: event.target.value }) }} type="text" id="uname" className="hidden-input" name="name" />
                                <img src="assets/img/icons/disquette.png" onClick={sendFirstNameHandler} style={this.state.clickCheckFirst == true ? { display: 'inline-block ' } : { display: 'none' }} className="icon-profile save-icon" />
                                <br />

                                {/*last name input*/}
                                <label htmlFor="ulastname" className="change-name-header">Nazwisko</label>
                                <br />

                                {/*before edit*/}
                                <span style={this.state.clickCheckLast == true ? { display: 'none' } : { display: 'inline-block' }} className="name-span hidden-span">{this.state.lastName}</span>
                                <img src="assets/img/icons/pensil.png" onClick={(event) => { this.setState({ clickCheckLast: true }) }} style={this.state.clickCheckLast == true ? { display: 'none' } : { display: 'inline-block' }} className="icon-profile edit-icon" />

                                {/*after edit*/}
                                <input style={this.state.clickCheckLast == true ? { display: 'inline-block ' } : { display: 'none' }} value={this.state.lastName} onChange={(event) => { this.setState({ lastName: event.target.value }) }} type="text" id="ulastname" className="hidden-input" name="lastname" />
                                <img src="assets/img/icons/disquette.png" onClick={sendLastNameHandler} style={this.state.clickCheckLast == true ? { display: 'inline-block ' } : { display: 'none' }} className="icon-profile save-icon" />

                                {/*hidden change password container*/}
                                <div className="change-password-container" style={this.state.password == false ? { display: 'none' } : { display: 'block' }}>
                                    <p className="bold-profile">Zmiana hasła:</p>
                                    <p className="error-password" style={this.state.validationGood == true ? { display: 'block ' } : { display: 'none' }}>Hasło zostało zmienione</p>
                                    <label htmlFor="old-password">Aktualne hasło<span className="red-star-profile">*</span></label>
                                    <br />
                                    <input id="old-password" value={this.state.inputValue} style={this.state.validationIfBadOld == true ? { border: '1px solid red' } : null} type="password" onChange={(event) => { this.setState({ oldPassword: event.target.value }) }} id="old-password" name="old-password" />
                                    <br />
                                    <label htmlFor="new-password">Nowe hasło<span className="red-star-profile">*</span></label>
                                    <br />
                                    <input id="new-password" style={this.state.validationIfNewEmpty == true ? { border: '1px solid red' } : null} value={this.state.inputValue} type="password" onChange={(event) => { this.setState({ newPassword: event.target.value }) }} id="new-password" name="new-password" />
                                    <br />
                                    <label htmlFor="confirm-password">Potwierdź hasło<span className="red-star-profile">*</span></label>
                                    <br />
                                    <input id="confirm-passowrd" style={this.state.validationIfTheSame == true ? { border: '1px solid red' } : null} value={this.state.inputValue} type="password" onChange={(event) => { this.setState({ confirmNewPassword: event.target.value }) }} id="confirm-password" name="confirm-password" />
                                    <br />
                                    <div className="required-alert" style={{
                                        top: this.state.positionOfAlert,
                                        '@media (max-width: 768px)': {
                                            display: 'none'
                                        },
                                        display: this.state.displayAlert,
                                    }}>
                                        {this.state.contentOfAlert}
                                        <div id="triangle"></div>
                                        <div className="cross" onClick={crossInAlert}>
                                            <div>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="required-alert" style={{
                                        top: this.state.smPositionOfAlert,
                                        '@media (min-width: 768px)': {
                                            display: 'none'
                                        },
                                        display: this.state.displayAlert,
                                    }}>
                                        {this.state.contentOfAlert}
                                        <div id="triangle"></div>
                                        <div className="cross" onClick={crossInAlert}>
                                            <div>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center button-div">
                                        <button className="confirm-button-profile buttons-in-form" onClick={sendNewPasswordHandler}>Zatwierdź</button>
                                    </div>
                                    <div className="text-center button-div">
                                        <button className="delete-button-profile cancel-button-profile buttons-in-form" onClick={hideChange}>Anuluj</button>
                                    </div>
                                </div>

                                {/*show change password button*/}
                                <div className="text-center">
                                    <button className="change-button-profile" onClick={showChange} style={this.state.password == true ? { display: 'none' } : { display: 'block' }}>Zmień hasło</button>
                                </div>
                            </form>
                        </div>

                        {/*basic data container*/}
                        <div className="grid-item user-data-profile">
                            <h4 className="data-header-profile">Dane podstawowe</h4>
                            <div><p className="data-info-profile">E-mail: </p><span className="e-mail-profile">{this.state.email}</span></div>
                            <div><p className="data-info-profile">Data rejestracji: </p><span className="data-profile">{this.state.registrationDate}</span></div>
                        </div>

                        <div style={popUpShow} className="confirm-if-want-delete-profile text-center">
                            <div className="container-confirm-if-delete">
                                <p className="confirm-if-delete-info">Usunięcie profilu spowoduje usunięcie wszystkich przypisanych kampani, pytań, miejsc oraz odpowiedzi użytkowników. Czy na pewno chcesz usunąć profil?</p>
                                <div className="text-center delete-confirm-buttons-div">
                                    <button onClick={deleteProfileHandler} className="confirm-delete-button" >Tak</button>
                                </div>
                                <div className="text-center delete-confirm-buttons-div">
                                    <button onClick={(event) => { this.setState({ confirmIfWantToDelete: false }) }} className="cancel-delete-button">Anuluj</button>
                                </div>
                            </div>

                        </div>

                        {/*delate button*/}
                        <button onClick={confirmIfWantDelete} className="delete-button-profile">Usuń konto</button>

                        {/*log-out-button*/}
                        <button onClick={logoutHandler} className="log-out-button-profile" >Wyloguj</button>
                    </div>
                </GlobalContainer>
            </StyleRoot>
        )
    }

}



export default Profile;