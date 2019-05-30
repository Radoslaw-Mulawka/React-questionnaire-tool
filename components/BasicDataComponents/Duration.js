import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Context } from './../../index';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class Duration extends Component {
    state = {
        durationSettings: {
            startDate: this.props.campaignEditDateFrom !== null ? moment(this.props.campaignEditDateFrom) : '',
            endDate: this.props.campaignEditDateTo !== null ? moment(this.props.campaignEditDateTo) : ''
        },
        basicData: {
            campaignDateFrom: this.props.campaignEditDateFrom !== null ? this.props.campaignEditDateFrom : '',
            campaignDateTo: this.props.campaignEditDateTo !== null ? this.props.campaignEditDateTo : ''
        },
        errorModal: false,
        errorModalText: '',
        dateFromDisabled: this.props.campaignStatus == 1 ? true : false
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.campaignStatus == 1 ) {
            return {
                dateFromDisabled: true
            }
        }
        else {
            return {
                dateFromDisabled: false
            }
        }
    }

    // campaign's duration methods
    handleChangeStart = (date, event) => {
        this.setState(
            {
                durationSettings: {
                    ...this.state.durationSettings,
                    startDate: date !== null ? date : ''
                }
            },
            () => {
                this.setState({
                    basicData: {
                        ...this.state.basicData,
                        campaignDateFrom: date !== null ? date.format("YYYY-MM-DD") : ''
                    }
                })
            }
        )
    };
    handleChangeEnd = date => {
        console.log(date);
        this.setState({
            durationSettings: {
                ...this.state.durationSettings,
                endDate: date !== null ? date : ''
            },
            basicData: {
                ...this.state.basicData,
                campaignDateTo: date !== null ? date.format("YYYY-MM-DD") : ''
            }
        });
    };
    sendDuration = () => {
        console.log(this.state.basicData);
        if(this.state.basicData.campaignDateFrom == ""){
            this.setState({
                errorModal: true,
                errorModalText: 'Data rozpoczęcia kampanii - To pole jest wymagane.',
                durationSettings: {
                    ...this.state.durationSettings,
                    startDate: this.props.campaignEditDateFrom !== null ? moment(this.props.campaignEditDateFrom) : ''
                }
            })
        }
        else {
            axios.put(this.props.location.pathname, { basicData: { ...this.state.basicData } }).then(response => console.log(response)).catch(error => {
                let errorItself = error.response.data.data.basicData.errors;
                let errorText = [];
                for (let prop in errorItself) {
                    if (prop == 'campaignDateFrom') {
                        errorText.push(`Data rozpoczęcia kampanii - ${errorItself[prop]}`)
                    }
                    else {
                        errorText.push(`Data zakończenia kampanii - ${errorItself[prop]}`)
                    }
                }
    
                this.setState({
                    errorModal: true,
                    errorModalText: errorText
                })
            });
        }
    }

    closeModal = () => {
        this.setState({
            errorModal: false
        })
    }

    render() {
        return (
            this.props.location.pathname == '/campaigns/create' ?
                (
                    <Context.Consumer>
                        {
                            ({ state, actions }) => (
                                <div className="new-basic-data__company-duration">
                                    <span>Czas trwania</span>
                                    <div className="datapicker-container datapicker-container__create-mode">
                                        <DatePicker
                                            locale="pl"
                                            className="datapicker"
                                            dateFormat="YYYY-MM-DD"
                                            minDate={moment()}
                                            selected={state.durationSettings.startDate}
                                            selectsStart
                                            startDate={state.durationSettings.startDate}
                                            endDate={state.durationSettings.endDate}
                                            onChange={actions.handleChangeStart}

                                        // onChange={(date)=>{actions.handleChangeStart(date); this.props.handleEditStart(date)}}

                                        />

                                        <DatePicker
                                            locale="pl"
                                            className="datapicker"
                                            dateFormat="YYYY-MM-DD"
                                            minDate={moment()}
                                            selected={state.durationSettings.endDate}
                                            selectsEnd
                                            startDate={state.durationSettings.startDate}
                                            endDate={state.durationSettings.endDate}
                                            onChange={actions.handleChangeEnd}
                                        />
                                    </div>

                                </div>
                            )
                        }
                    </Context.Consumer>
                )
                :
                (

                    <div className="new-basic-data__company-duration">
                        <span>Czas trwania</span>
                        {this.props.durationEditMode == true ?
                            (
                                <div className="datapicker-container">
                                    <DatePicker
                                        locale="pl"
                                        className="datapicker"
                                        dateFormat="YYYY-MM-DD"
                                        minDate={moment()}
                                        selected={this.state.durationSettings.startDate}
                                        selectsStart
                                        startDate={this.state.durationSettings.startDate}
                                        endDate={this.state.durationSettings.endDate}
                                        onChange={(date) => this.handleChangeStart(date)}
                                        disabled={this.state.dateFromDisabled}
                                    />

                                    <DatePicker
                                        locale="pl"
                                        className="datapicker"
                                        dateFormat="YYYY-MM-DD"
                                        minDate={this.state.durationSettings.startDate != '' ? this.state.durationSettings.startDate : moment()}
                                        selected={this.state.durationSettings.endDate}
                                        selectsEnd
                                        startDate={this.state.durationSettings.startDate}
                                        endDate={this.state.durationSettings.endDate}
                                        onChange={this.handleChangeEnd}
                                    />
                                </div>
                            )
                            :
                            (
                                <div>
                                    <div style={{
                                        display: 'inline-block',
                                        marginRight: '20px'
                                    }}>
                                        {moment(this.state.durationSettings.startDate).format("YYYY-MM-DD")}
                                    </div>
                                    <div style={{
                                        display: 'inline-block'
                                    }}>
                                        {this.state.durationSettings.endDate !== '' ? moment(this.state.durationSettings.endDate).format("YYYY-MM-DD") : ''}
                                    </div>
                                </div>
                            )
                        }
                        <div className="company-duration-icon">
                            {this.props.durationEditMode == true ?
                                (<button className='company-duration-icon-disquette' onClick={(durationData) => { this.props.EnterDurationEditMode(this.state.basicData); this.sendDuration() }}></button>)
                                :
                                (<button className='company-duration-icon-pensil' onClick={this.props.EnterDurationEditMode}></button>)
                            }
                        </div>

                        {this.state.errorModal == true ? (
                            ReactDOM.createPortal(
                                <div style={{
                                    backgroundColor: 'rgba(0,0,0,0.6)',

                                    position: 'fixed',
                                    zIndex: '1000',
                                    top: 0,
                                    left: 0,
                                    height: '100vh',
                                    width: '100%',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%,-50%)',
                                        width: '600px',
                                        height: '200px',
                                        backgroundColor: 'white',
                                        border: '1px solid red',
                                        boxShadow: '0px 0px 5px red',
                                        padding: '20px'
                                    }}>
                                        <button onClick={this.closeModal} style={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            width: 20,
                                            height: 20,
                                            backgroundColor: 'transparent',
                                            border: 'none'
                                        }}>

                                            <span style={{
                                                position: 'absolute',
                                                top: '0',
                                                width: '2px',
                                                height: '100%',
                                                transform: 'rotate(45deg) ',
                                                backgroundColor: 'red'
                                            }} >
                                            </span>

                                            <span style={{
                                                position: 'absolute',
                                                top: '0',
                                                width: '2px',
                                                height: '100%',
                                                transform: 'rotate(-45deg) ',
                                                backgroundColor: 'red'
                                            }}
                                            ></span>
                                        </button>
                                        <p style={{ position: 'relative', top: '50%', transform: 'translate(0,-50%)', color: 'black' }}>{this.state.errorModalText}</p>
                                        {this.state.wantToDeleteCampaign == true ? (
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 10,
                                                right: '50%',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                color: 'red',
                                                transform: 'translate(50%,0)',
                                                fontSize: 20
                                            }}>
                                                <button onClick={this.reallyWantToDeleteCampaign} style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    color: 'red',
                                                    marginRight: 20
                                                }}>

                                                    Tak
                                        </button>
                                                <button onClick={this.closeModal} style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    color: 'red'
                                                }}>

                                                    Nie
                                        </button>
                                            </div>
                                        ) : null}

                                    </div>
                                </div>,
                                document.getElementById('modal')
                            )
                        ) : null}

                    </div>

                )

        )
    }

}

export default withRouter(Duration);