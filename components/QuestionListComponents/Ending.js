import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';


class Ending extends Component{
    margin = null;
    displayBlock = null
    

    state = {
        campaignEndingText: '',
        path: null
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.location.pathname == '/campaigns/create' && prevState.path !== '/campaigns/create'){
            return {
                campaignEndingText: '',
                path: nextProps.location.pathname
            }
        }
        else {
            return {
                campaignEndingText: nextProps.campaignEndingText
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
            <div className="q-ending" style={this.displayBlock}>
                <label >
                    Treść zakończenia do ankiety
                </label>
    
                {this.props.location.pathname == '/campaigns/create' ?
                    (
                        <input type="text" 
                            onChange={(event,type)=>{this.props.campaignEntranceEnding(event,'ending'); this.props.changeCampaignIntroEndingText(event,'ending')}}
                            value={this.state.campaignIntroText}
                        />
                    )
                    :
                    (
                        this.props.endingTextEditMode == true ?
                            (
                                <input type="text" 
                                    onChange={(event,type)=>{this.props.campaignEntranceEnding(event,'ending'); this.props.changeCampaignIntroEndingText(event,'ending')}}
                                    value={this.state.campaignEndingText !== false ? this.state.campaignEndingText : ''}
                                />
                            )
                            :
                            (
                                <span style={{alignSelf:'center'}}> {this.state.campaignEndingText !== false ? this.state.campaignEndingText : ''} </span>
                            )
                    )
                }
                {this.props.location.pathname !== '/campaigns/create' ? 
                (
                    <div className="intro-end-text-icon">
                        {this.props.endingTextEditMode == true ?
                            (<button className='company-name-icon-disquette' onClick={()=> {this.props.EnterEndingTextEditMode(); this.props.sendEndingTextEdit()   } }></button>)
                            :
                            (<button className='company-name-icon-pensil' onClick={()=> {this.props.EnterEndingTextEditMode()} }></button>)
                        }
                    </div>
                ) 
                : null 
                }
            </div>
        )
    }
}


export default withRouter(Ending);