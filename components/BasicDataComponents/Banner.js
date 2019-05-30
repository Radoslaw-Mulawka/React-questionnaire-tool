import React from 'react';
import { Context } from './../../index';



const Banner = (props) => {
    let currentCampaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));
    return (
        currentCampaignId == '/create' ?
            (
                <Context.Consumer>
                    {
                        ({ state, actions }) => (
                            <div className="new-basic-data__company-banner" style={{ gridTemplateColumns: '280px auto' }}>
                                <span style={{ marginBottom: 10, display: 'block' }}>Banner kampanii</span>
                                <div id="campaignsBanner" >
                                    <img src={props.campaignEditBanner !== false ? props.campaignEditBanner : "/assets/img/backlog.png"} alt="Banner" />
                                </div>
                                <label className="create-label">
                                    <span>Zmień plik</span>
                                    <input type="file" onChange={(e) => actions.fileChangeHandler(e)} />
                                </label>
                            </div>
                        )
                    }
                </Context.Consumer>
            )
            :
            (
                props.bannerEditMode == true ?
                    (
                        <div className="new-basic-data__company-banner">
                            <span style={{ marginBottom: 10, display: 'block' }}>Banner kampanii</span>
                            <div id="campaignsBanner">
                                <img src={props.campaignEditBanner !== false ? props.campaignEditBanner : "/assets/img/backlog.png"} alt="Banner" />
                            </div>
                            <div className="company-banner-icon">
                                <label className='company-banner-icon-disquette'>
                                    <input onClick={props.bannerSendOnDisquetteClick} />
                                </label>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="new-basic-data__company-banner">
                            <span style={{ marginBottom: 10, display: 'block' }}>Banner kampanii</span>
                            <div id="campaignsBanner">
                                <img src={props.campaignEditBanner !== false ? props.campaignEditBanner : "/assets/img/backlog.png"} alt="Banner" />
                            </div>
                            <div className="company-banner-icon">
                                <label className='company-banner-icon-pensil' >
                                    <span></span>
                                    <input type="file" onChange={(e) => props.bannerEditHandler(e)} />
                                </label>
                            </div>
                        </div>
                    )


            )
    )
}

export default Banner;