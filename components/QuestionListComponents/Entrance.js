import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';


class Entrance extends Component {
    margin = null;
    displayBlock = null
    

    state = {
        campaignIntroText: '',
        path: null
    }

   
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.location.pathname == '/campaigns/create' && prevState.path !== '/campaigns/create'){
            return {
                campaignIntroText: '',
                path: nextProps.location.pathname
            }
        }
        else {
            return {
                campaignIntroText: nextProps.campaignIntroText
            }
        }
    }

    componentDidMount(){
        this.setState({
            path: this.props.location.pathname
        })
    }



    render(){
        if (this.props.introTextEditMode == false) {
            this.margin = {
                marginBottom: 10
            }
        }
        if(this.props.location.pathname == '/campaigns/create'){
            this.displayBlock = {
                display:'block'
            }
        }
        return (
            <div className="q-entrance" style={this.displayBlock}>
                <label style={this.margin}>Wprowadzenie do ankiety</label>
    
                {this.props.location.pathname == '/campaigns/create' ?
                    (
                        <input type="text"
                            onChange={(event, type) => { this.props.campaignEntranceEnding(event, 'entrance'); this.props.changeCampaignIntroEndingText(event, 'intro') }}
                            value={this.state.campaignIntroText}
                        />
                    )
                    :
                    (
                        this.props.introTextEditMode == true ?
                            (
                                <input type="text"
                                    onChange={(event, type) => { this.props.campaignEntranceEnding(event, 'entrance'); this.props.changeCampaignIntroEndingText(event, 'intro') }}
                                    value={this.state.campaignIntroText !== false ? this.state.campaignIntroText : ''}
                                />
                            )
                            :
                            (
                                <span style={{alignSelf:'center'}}> {this.state.campaignIntroText !== false ? this.state.campaignIntroText : ''} </span>
                            )
                    )
                }
                {this.props.location.pathname !== '/campaigns/create' ? 
                (
                    <div className="intro-end-text-icon">
                        {this.props.introTextEditMode == true ?
                            (<button className='company-name-icon-disquette' onClick={()=> {this.props.EnterIntroTextEditMode(); this.props.sendIntroTextEdit()   } }></button>)
                            :
                            (<button className='company-name-icon-pensil' onClick={()=> {this.props.EnterIntroTextEditMode()} }></button>)
                        }
                    </div>
                ) 
                : null 
                }
            </div>
        )
    }
}


export default withRouter(Entrance);