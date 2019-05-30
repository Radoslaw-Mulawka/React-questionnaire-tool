import React, { Component } from 'react';

import CompanyName from './../components/BasicDataComponents/CompanyName';
import Banner from './../components/BasicDataComponents/Banner';
import Duration from './../components/BasicDataComponents/Duration';
import Places from './../components/BasicDataComponents/Places';
import { Context } from './../index';
import ErrorBoundary from './ErrorBoundary';
import {withRouter} from 'react-router-dom';

class BasicData extends Component {
    

    render() {
        return (
            <Context.Consumer>
            {
                ({state,actions})=>(
                    <div className="new-basic-data">
                        <h4>Dane podstawowe</h4>
                        <ErrorBoundary>
                            <CompanyName campaignEditName = {this.props.campaignEditData !==null ? this.props.campaignEditData.campaignName : null}
                                        changeCampaignNameAsInputValue={(event,type)=>this.props.changeCampaignNameAsInputValue(event,type)}
                                        campaignCreateError = {state.campaignCreateError}
                                        campaignNameChangeHandler = {actions.campaignNameChangeHandler}
                                        closeCompanyNameError = {actions.closeCompanyNameError}
                                        nameEditMode={this.props.nameEditMode}
                                        EnterNameEditMode={this.props.EnterNameEditMode}
                                        campaignNameEditError={this.props.campaignNameEditError}
                                        />
                        </ErrorBoundary>

                        <ErrorBoundary>
                            <Banner campaignEditBanner = {this.props.campaignEditData !==null && this.props.campaignEditData.campaignBanner ? this.props.campaignEditData.campaignBanner : "/assets/img/backlog.png"}
                                    bannerEditHandler = {(e)=>this.props.bannerEditHandler(e)}
                                    bannerEditMode={this.props.bannerEditMode}
                                    EnterBannerEditMode={e=>this.props.EnterBannerEditMode(e)}
                                    bannerSendOnDisquetteClick={this.props.bannerSendOnDisquetteClick}
                            />
                        </ErrorBoundary>
        
        
                        <ErrorBoundary>
                            <Duration campaignEditDateFrom = {this.props.campaignEditData !==null ? this.props.campaignEditData.campaignDateFrom : null}
                                    campaignEditDateTo = {this.props.campaignEditData !==null ? this.props.campaignEditData.campaignDateTo : null}
                                    durationEditMode={this.props.durationEditMode}
                                    EnterDurationEditMode={(durationData)=>this.props.EnterDurationEditMode(durationData)}
                                    campaignStatus= {this.props.campaignStatus}
                                    />
                        </ErrorBoundary>
        
                        <ErrorBoundary>
                            <Places showModalError={(error)=>this.props.showModalError(error)}
                                    placesAddedToMainPackage={state.campaignCreateData.campaignPlaces}/>
                        </ErrorBoundary>
                    </div>
                )
            }
            </Context.Consumer>
        );
    }
}

export default withRouter(BasicData);
