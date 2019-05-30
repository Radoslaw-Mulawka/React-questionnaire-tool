import React, { Component } from "react";
import { Context } from "./../../index";
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class ResultLine extends Component {
    state = {
        isOpen: false,
        inputChecked: false,
        inputCheckedInEdit: this.props.isAssigned
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let mainPackageArray = nextProps.mainPackagePlaces.includes(nextProps.id)
        if(mainPackageArray == true){
            return {
                inputChecked: true
            }
        }
        else {
            return {
                inputChecked: false
            }
        }
    }
    

    handleOpen = () => {
        this.setState({ isOpen: true })
    }
    handleClose = () => {
        this.setState({ isOpen: false })
    }



    uncheckInput = (event) => {
        let unassignedPlacesId = {
            "campaignPlaces":
                [parseInt(this.hiddenInput.id)]
        }

        if(event.target.checked == true){
            axios.post(this.props.location.pathname + '/assignplaces', unassignedPlacesId).then(response=>{
                this.props.deletePlaceAfterUnassign(this.hiddenInput.id);
                this.setState({
                    inputCheckedInEdit: true
                })
            })
        }
        else {
            axios.delete(this.props.location.pathname + '/unassignplaces', {params: unassignedPlacesId}).then(response=>{
                this.props.deletePlaceAfterUnassign(this.hiddenInput.id);
                this.setState({
                    inputCheckedInEdit: false
                })
            }).catch(error=>{
                this.setState({
                    inputCheckedInEdit: true
                })
                    this.props.showModalError(error)
            })
        }
    }


    render() {
        return (
            <div className="results-line">
                <div className="result-name">
                    {this.props.location.pathname !== '/campaigns/create' ? 
                            (
                                <input type="checkbox" 
                                    id={this.props.id} 
                                    checked={this.state.inputCheckedInEdit} 
                                    ref={(node) => this.hiddenInput = node} 
                                    onClick={this.props.location.pathname !== '/campaigns/create' ? this.uncheckInput : null}
                                />
                            ) : 
                            (
                                <input type="checkbox" 
                                       id={this.props.id}
                                       checked={this.state.inputChecked} 
                                />
                            ) 
                    }
                    <Context.Consumer>
                        {
                            ({ state, actions }) => (
                                this.props.location.pathname !== '/campaigns/create' ?
                                    <label htmlFor={this.props.id}>{this.props.name}</label> :
                                    ( this.props.name == 'Loading' ? 
                                            <div className="places-preloader"></div> 
                                            : 
                                            <label htmlFor={this.props.id} onClick={(id) => actions.addPlaceToCampaignCreate(this.props.id)}>{this.props.name}</label>
                                    )
                            )
                        }
                    </Context.Consumer>
                </div>




                <div className="result-comment">
                    {
                        this.props.name == 'Loading' ? <div id="places-preloader"></div> : <span>{this.props.comment}</span>
                    }
                </div>

                {this.props.location.pathname !== '/campaigns/create' && this.props.isAssigned == true ? (
                    <div>
                        <div className="popup-icons">
                            <div>
                                <a href={this.props.qrUrl} target="_blank">
                                    <span className="qr-icon" onClick={this.handleOpen}></span>
                                </a>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
};

export default withRouter(ResultLine);
