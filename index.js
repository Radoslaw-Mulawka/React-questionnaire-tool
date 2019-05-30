import React, { Component, createContext } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import GlobalContainer from "./containers/GlobalContainer";
import LoginPage from "./containers/Login/LoginPage";
import EmailConfirmation from './containers/Login/EmailConfirmation';

import "bootstrap";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import moment from "moment";
import "moment/locale/pl";

import axios from "axios";
import { client_id, client_secret } from './conf/axios-conf';


import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";


import "semantic-ui-css/semantic.min.css";



import "./index.css";
import "./oldjs/app";


import { BrowserRouter, Route, Redirect, Switch, withRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from './store/store';

// import $ from 'jquery';

export const Context = createContext();


axios.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("client-token");
axios.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("token");


// console.log(window.localStorage.getItem('token'));




axios.interceptors.response.use(response => {
  return response
}, (error) => {
    if (error.response.data.status_code == 401) {
      window.localStorage.removeItem('token');
      window.location.reload();
    }
  return Promise.reject(error);
})

// axios.interceptors.request.use(request => {

//   return response
// }, (error) => {
//   if (error.response.data.status_code == 401) {
//     window.localStorage.removeItem('token');
//     window.location.reload();
//   }
//   return Promise.reject(error);
// })

class EnterPoint extends Component {
  state = {
    userDataForSending: {
      username: "",
      password: "",
      grant_type: "password",
      client_id: client_id,
      client_secret: client_secret,
    },
    authenticationTokenData: {
      grant_type: "client_credentials",
      client_id: client_id,
      client_secret: client_secret,
    },
    campaignCreateData: {
      basicData: {
        campaignName: "", //*
        campaignDateFrom: moment().format("YYYY-MM-DD"), //*
        campaignDateTo: "",
        campaignIntroText: "",
        campaignEndingText: "",
        campaignBanner: null
      },
      questions: [],
      campaignPlaces: []
    },
    durationSettings: {
      startDate: moment(),
      endDate: null
    },
    refreshAfterPlaceIsSend: false,
    refreshPage: false, // resresh state to refresh page after token is get
    campaignCreateError: false,
    verifyUrl: ''
  };




  pathName = window.location.href;



  authenticationToken = () => {
    axios.post("/oauth/token", this.state.authenticationTokenData).then(response => {
      window.localStorage.setItem("client-token", response.data.access_token);
    });
  };



  //campaign Name change handler
  campaignNameChangeHandler = event => {
    this.setState({
      campaignCreateData: {
        ...this.state.campaignCreateData,
        basicData: {
          ...this.state.campaignCreateData.basicData,
          campaignName: event.target.value
        }
      },
      campaignCreateError: false
    });
  };

  closeCompanyNameError = () => {  // triggered on popup close button click
    this.setState({
      campaignCreateError: false
    })
  };

  //campaign Banner change handler
  formDataImage;
  fileChangeHandler = e => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("basicData[campaignBanner]", file);
    formData.append("_method", "PUT");
    this.formDataImage = formData;

    let fileDisplayArea = document.getElementById("campaignsBanner");
    if (file.type.slice(0, 5) == "image") {
      let reader = new FileReader();
      reader.onload = e => {
        fileDisplayArea.innerHTML = "";
        let img = new Image();
        img.src = reader.result;
        img.style["max-width"] = "100%";
        fileDisplayArea.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      fileDisplayArea.innerHTML = "File not supported!";
    }
  };

  // campaign's duration methods
  handleChangeStart = (date, event) => {
    this.setState(
      {
        durationSettings: {
          ...this.state.durationSettings,
          startDate: date
        }
      },
      () => {
        this.setState({
          campaignCreateData: {
            ...this.state.campaignCreateData,
            basicData: {
              ...this.state.campaignCreateData.basicData,
              campaignDateFrom: date.format("YYYY-MM-DD")
            }
          }
        });
      }
    );
  };

  handleChangeEnd = date => {
    this.setState(
      {
        durationSettings: {
          ...this.state.durationSettings,
          endDate: date
        }
      },
      () => {
        this.setState({
          campaignCreateData: {
            ...this.state.campaignCreateData,
            basicData: {
              ...this.state.campaignCreateData.basicData,
              campaignDateTo: date.format("YYYY-MM-DD")
            }
          }
        });
      }
    );
  };

  // campaign full DATA SEND, checks whether required fields are filled
  campaignId;
  saveCampaignSketch = (history) => {
    let dataForSending = { ...this.state.campaignCreateData };
    if (dataForSending.basicData.campaignName == false) {
      this.setState({
        campaignCreateError: true
      });
    } else {
      this.setState({
        campaignCreateError: false
      });

      axios.post("/campaigns", dataForSending).then(response => {
        this.campaignId = response.data.data.campaignId;
      }).then(() => {
        if (this.formDataImage !== undefined) {
          axios.post("/campaigns/" + this.campaignId, this.formDataImage, {
            headers: { "Content-Type": "multipart/form-data" }
          }).then(() => {
            // window.location.href = "/campaigns"; 
            history.push('/campaigns')
          })
        }
        else {
          // window.location.href = "/campaigns"; // ONLY PLACE THAT TRIGGERS PAGE RELOADING !!!!!
          history.push('/campaigns')
          return null;
        }
      });
    }
  };

  stateRefreshToDefault = () => {
    this.setState({
      ...this.state,
      campaignCreateData: {
        basicData: {
          campaignName: "", //*
          campaignDateFrom: moment().format("YYYY-MM-DD"), //*
          campaignDateTo: "",
          campaignIntroText: "",
          campaignEndingText: "",
          campaignBanner: null
        },
        questions: [
        ],
        campaignPlaces: []
      },
      durationSettings: {
        startDate: moment(),
        endDate: null
      },
      campaignCreateError: false
    })
  };

  //poll Enter and Ending Text
  campaignEntranceEnding = (event, type) => {
    if (type == "entrance") {
      this.setState({
        campaignCreateData: {
          ...this.state.campaignCreateData,
          basicData: {
            ...this.state.campaignCreateData.basicData,
            campaignIntroText: event.target.value
          }
        }
      });
    } else if (type == "ending") {
      this.setState({
        campaignCreateData: {
          ...this.state.campaignCreateData,
          basicData: {
            ...this.state.campaignCreateData.basicData,
            campaignEndingText: event.target.value
          }
        }
      });
    }
  };

  addQuestion = (question) => {
    let isExists = this.state.campaignCreateData.questions.some((item) => item.uniqueId == question.uniqueId);


    if (isExists == false) {
      let refreshedQuestions = [...this.state.campaignCreateData.questions];
      refreshedQuestions.push(question);
      this.setState({
        ...this.state,
        campaignCreateData: {
          ...this.state.campaignCreateData,
          questions: refreshedQuestions
        }
      })
    }
    else if (isExists == true) {
      let refreshedQuestions = [...this.state.campaignCreateData.questions];

      refreshedQuestions = refreshedQuestions.filter((item, index) => item.uniqueId != question.uniqueId);
      refreshedQuestions.push(question);
      refreshedQuestions.sort((a, b) => a.uniqueId - b.uniqueId);


      this.setState({
        ...this.state,
        campaignCreateData: {
          ...this.state.campaignCreateData,
          questions: refreshedQuestions
        }
      })
    }
  };

  deleteQuestionFromMainPackage = (uniqueId) => {
    let currentCampaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));
    if (currentCampaignId == '/create') {
      let oldQuestions = [...this.state.campaignCreateData.questions].filter((item, index) => item.uniqueId != uniqueId);
      this.setState({
        ...this.state,
        campaignCreateData: {
          ...this.state.campaignCreateData,
          questions: oldQuestions
        }
      })
    }
  };

  addPlaceToCampaignCreate = (id) => {
    let oldPlaces = [...this.state.campaignCreateData.campaignPlaces];
    if (oldPlaces.indexOf(id) == -1) {
      oldPlaces.push(id);
      this.setState({
        ...this.state,
        campaignCreateData: {
          ...this.state.campaignCreateData,
          campaignPlaces: oldPlaces
        }
      })
    }
    else {
      oldPlaces = oldPlaces.filter((item, index) => {
        return item != id
      });
      this.setState({
        ...this.state,
        campaignCreateData: {
          ...this.state.campaignCreateData,
          campaignPlaces: oldPlaces
        }
      })
    }
  };



  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: {
            loginSubmitHandler: this.loginSubmitHandler,
            authenticationToken: this.authenticationToken,
            userCredentialsChange: this.userCredentialsChange,
            handleChangeStart: this.handleChangeStart,
            handleChangeEnd: this.handleChangeEnd,
            campaignNameChangeHandler: this.campaignNameChangeHandler,
            saveCampaignSketch: this.saveCampaignSketch,
            fileChangeHandler: this.fileChangeHandler,
            campaignDeleteHandler: this.campaignDeleteHandler,
            stateRefreshToDefault: this.stateRefreshToDefault,
            campaignEntranceEnding: this.campaignEntranceEnding,
            addQuestion: this.addQuestion,
            addPlaceToCampaignCreate: this.addPlaceToCampaignCreate,
            closeCompanyNameError: this.closeCompanyNameError,
            deleteQuestionFromMainPackage: this.deleteQuestionFromMainPackage,
            getDashboardData: this.getDashboardData
          }
        }}
      >
        <GlobalContainer>
          {window.localStorage.token ? <App stateToDefault={this.stateRefreshToDefault} /> : <LoginPage />}
        </GlobalContainer>
      </Context.Provider>
    );
  };
}

loadProgressBar(); // progress bar for axios data loading

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <EnterPoint />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
