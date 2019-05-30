import React, { Component } from 'react';
import Settings from './../components/Settings';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Home from './Home';
import Answers from './Answers';
import PlacesList from './PlacesList';
import CampaignsList from './CampaignsList';
import PlaceCreate from './../components/PlaceCreate';
import CampaignCreate from './CampaignCreate';
import Profile from './../components/Profile';
import LoginPage from './Login/LoginPage';
import AnswerDetails from './AnswerDetails';

class Main extends Component {
 

  render() {  
    return (  
      <main>
          {window.location.pathname == '/login'? <Redirect to='/home'/> : null }
          <Switch>
            <Route exact path="/home" exact component={Home}/>
            <Route exact path="/answers" component={Answers}/>
            <Route exact path="/campaigns" component={CampaignsList}/>
            <Route exact path="/places" component={PlacesList}/>
            <Route path="/places/create" component={PlaceCreate}/>
            <Route path="/campaigns/create" render={()=>(<CampaignCreate stateToDefault={this.props.stateToDefault}/>)}/>
            <Route path="/profile" component={()=><Profile changeUserCredentials={this.props.changeUserCredentials}/>}/>
            <Route path="/answers/:id" component={AnswerDetails}/>
            <Route path="/campaigns/:id"  render={()=>(<CampaignCreate stateToDefault={this.props.stateToDefault}/>)}/>
            <Route path="/places/:id" component={PlaceCreate}/>
            <Redirect from ='/' to='/home'/>
          </Switch>
          
      </main>
    );
  }
}

export default withRouter(Main);
