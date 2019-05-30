import React, { Component } from 'react';
import { Context } from './../index';
import {withRouter} from 'react-router-dom';



class CampaignManipulationButtons extends Component {

    currentCampaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));

    render() {
        return (
            <Context.Consumer>
                {
                    ({ state, actions }) => {state.campaignIsSaved == true ? this.props.history.push('/campaigns') : null; return (
                        
                        <div className="camp-manipulate-btns">
                            <div>
                                {this.props.location.pathname == '/campaigns/create' ? null : (<button onClick={(currentCampaignId)=>this.props.campaignDeleteHandler(currentCampaignId)} className="camp-del-btn">Usuń</button>)}
                                {this.props.location.pathname == '/campaigns/create' ? 
                                    null : 
                                    (
                                        <button className="camp-publish-btn" onClick={this.props.campaignPublishOrDraft}>{this.props.campaignStatus == 0 ? 'Publikuj' : 'Wycofaj publikację'}</button>
                                    )}
                                {this.props.location.pathname !== '/campaigns/create' ? null : (<button className="camp-save-btn" onClick={()=>actions.saveCampaignSketch(this.props.history)}>Zapisz szkic</button>)}
                            </div>
                            {state.campaignCreateFalse ? <p>Wypełnij pola zaznaczone gwiazdką</p> : null}
                        </div>
                    )}
                }
            </Context.Consumer>
        )
    }
}

export default withRouter(CampaignManipulationButtons);