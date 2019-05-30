import React, { Component } from 'react';
import DashboardSquare from './../components/DashboardSquare';
import GlobalContainer from './GlobalContainer';
import Settings from './../components/Settings';
import axios from 'axios';
import feather from "feather-icons";
import {Link} from "react-router-dom";

class Home extends Component {

  state = {
    data: {

    }
  }

  componentDidMount() {
    feather.replace()
    let tokenCheck = new Promise((resolve, reject) => {
      if (window.localStorage.getItem('token') == false) {
        reject('NO TOKEN')
      }
      else {
        resolve('token is set')
      }
    });
    tokenCheck.then(() => {
      axios.get('/dashboard').then(response => {
        this.setState({
          data: response.data.data
        })
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log('promise error')
    })
  }

  render() {
    return (
      // Object.keys(this.state.data).length == 0 ?
      //   <div className="places-preloader" ></div>
      //   :
      <GlobalContainer>
        <Settings pageName="DASHBOARD" />
        <div className="hugeblock">
          <DashboardSquare
            iconPath="assets/img/icons/Active.png"
            linkPath="/campaigns"
            imgAlt="active-campaigns-icon"
            squareText="Opublikowanych kampanii"
            buttonExists
            buttonText="Pokaż kampanie"
            squareNumber="1"
            data={this.state.data.activeCampaigns} />
          <DashboardSquare
            iconPath="assets/img/icons/Ending.png"
            linkPath="/campaigns"
            imgAlt="ending-campaign-icon"
            squareText="Kończących się kampanii"
            buttonExists
            buttonText="Pokaż kampanie"
            squareNumber="2"
            data={this.state.data.endedCampaigns} />
          <DashboardSquare
            iconPath="assets/img/icons/Answers.png"
            imgAlt="answers-icon"
            squareText="Wszystkich odpowiedzi"
            squareNumber="3"
            data={this.state.data.allSendedPolls} />
          <DashboardSquare
            iconPath="assets/img/icons/See.png"
            imgAlt="show-icon"
            squareText="Wszystkich wyświetleń"
            squareNumber="4"
            data={this.state.data.uniqueViews} />
          {/* <DashboardSquare
              iconPath="assets/img/icons/Places.png"
              linkPath="/places"
              imgAlt="places-icon"
              squareText="Twoich miejsc"
              buttonExists
              buttonText="Pokaż miejsca"
              squareNumber="5"
              data={this.state.data.allPlaces} /> */}
          <DashboardSquare
            iconPath="assets/img/icons/Questions.png"
            linkPath="/campaigns"
            imgAlt="question-icon"
            squareText="Wszystkich pytań"
            buttonExists
            buttonText="Pokaż najpopularniejszą ankietę"
            squareNumber="5"
            data={this.state.data.allQuestions} />

          
          <div className="col-lg-4 col-md-6 col-sm-12 bigblock">
            <Link to='/campaigns/create'>
            <div className="block row add-campaign-square">
              
                <div className="col-lg-12 col-md-12 circle" align="center">
                  <i data-feather="plus-circle"></i>
                  <p>Dodaj kampanię</p>
                </div>
              
            </div>
            </Link>
          </div>
        </div>
      </GlobalContainer>
    )
  }
}

export default Home;
