import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ErrorBoundary from './../../containers/ErrorBoundary';
const timeoutLength = 2500


class CompanyName extends Component {

    state = {
        isOpen: this.props.campaignCreateError,
        isOpenEdit: this.props.campaignNameEditError
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.isOpen == this.state.isOpen) {
            return null;
        }
        else {
            if (this.state.isOpen == true) {
                this.inputCampaignName.focus();
            }
            if(this.state.isOpenEdit == true){
                this.inputCampaignName.focus();
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.location.pathname == '/campaigns/create'){
            if (nextProps.campaignCreateError == false) {
                return null;
            }
            else {
                return {
                    isOpen: true
                }
            }
        }
        else {
            if (nextProps.campaignNameEditError == false) {
                return null;
            }
            else {
                return {
                    isOpenEdit: true
                }
            }
        }
    }

    handleOpen = () => {
        this.setState({ isOpen: true })

        this.timeout = setTimeout(() => {
            this.setState({ isOpen: false })
        }, timeoutLength)
    }

    handleClose = () => {
        this.setState({ isOpen: false })
        clearTimeout(this.timeout)
    }

    closeError = () => {
        this.setState({
            isOpen: false
        })
    }

    closeErrorEdit = () => {
        this.setState({
            isOpenEdit: false
        })
    }



    render() {
        let companyNameWrapStyling;
        if (this.props.location.pathname == '/campaigns/create') {
            companyNameWrapStyling = {
                gridColumn: 'span 2'
            }
        }
        else {
            companyNameWrapStyling = null;
        }



        return (
            <ErrorBoundary>
                <div className="new-basic-data__company-name" >
                    <label htmlFor="company-name">
                        Nazwa
                    </label>

                    <div id="company-name-wrap" style={companyNameWrapStyling}>
                        {this.props.location.pathname == '/campaigns/create' ?
                            (
                                <React.Fragment>
                                <input id="company-name"
                                    type="text"
                                    style={this.props.campaignCreateError == true ? { border: '1px solid red', outline: 'none' } : null}
                                    onChange={(event) => { this.props.campaignNameChangeHandler(event); this.closeError() }}
                                    ref={(inputCampaignName) => { this.inputCampaignName = inputCampaignName }} />
                                    {this.state.isOpen == true  ? (
                                        <div className="red-alert">
                                            Nie możesz zapisać kampanii bez podania jej nazwy. To pole jest wymagane
                                            <div id="triangle"></div>
                                            <div className="cross" onClick={(event) => { this.closeError(); this.props.closeCompanyNameError()}}>
                                                <div>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </React.Fragment>
                            )
                            :
                            (
                                <div >
                                    {this.props.nameEditMode == true ?
                                        (
                                            <input id="company-name"
                                                type="text"
                                                style={this.props.campaignCreateError == true ? { border: '1px solid red', outline: 'none' } : null}
                                                onChange={(event, type) => { this.props.changeCampaignNameAsInputValue(event, 'input'); this.closeErrorEdit() }}
                                                value={this.props.campaignEditName !== null ? this.props.campaignEditName : ''}
                                                ref={(inputCampaignName) => { this.inputCampaignName = inputCampaignName }} />
                                        )
                                        :
                                        (
                                            <span>{this.props.campaignEditName !== null ? this.props.campaignEditName : ''}</span>
                                        )
                                    }
                                    {this.state.isOpenEdit == true  ? (
                                        <div className="red-alert">
                                            Nie możesz zapisać kampanii bez podania jej nazwy. To pole jest wymagane
                                            <div id="triangle"></div>
                                            <div className="cross" onClick={(event) => { this.closeErrorEdit(); }}>
                                                <div>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            )
                        }

                        
                    </div>
                    {this.props.location.pathname == '/campaigns/create' ? null : (
                        <div className="company-name-icon">
                            {this.props.nameEditMode == true ?
                                (<button className='company-name-icon-disquette' onClick={(event) => { this.props.EnterNameEditMode(); this.props.changeCampaignNameAsInputValue(event) }}></button>)
                                :
                                (<button className='company-name-icon-pensil' onClick={this.props.EnterNameEditMode}></button>)
                            }
                        </div>
                    )}
                </div>
            </ErrorBoundary>
        )
    }
}

export default withRouter(CompanyName);