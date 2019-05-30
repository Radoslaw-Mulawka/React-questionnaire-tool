import React, { Component } from "react";
import ReactDOM from 'react-dom';
import BasicData from "./BasicData";
import QuestionList from "./QuestionList";
import GlobalContainer from "./GlobalContainer";
import CampaignManipulationButtons from "./../components/CampaignManipulationButtons";
import axios from "axios";

import { withRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';




class CampaignCreate extends Component {
  state = {
    campaignEditData: null,
    nameEditMode: false,
    bannerEditMode: false,
    durationEditMode: false,
    campaignNameEditError: false,
    errorModal: false,
    errorModalText: '',
    wantToDeleteCampaign: false,

    introTextEditMode:false,
    endingTextEditMode: false
    // areThereAssignedPlaces : false,
    // areThereAnyQuestions : false
  }

  componentDidCatch(error,info){
    this.setState({
      errorModal:true,
      errorModalText: `${error}  ${info}`
    })
  }

  componentDidMount() {
    this.props.stateToDefault();
    let pathNameLast = window.location.pathname.slice(
      window.location.pathname.lastIndexOf("/")
    );
    if (pathNameLast !== "/create") {
      axios.get("" + window.location.pathname).then(response => {
        this.setState({
          campaignEditData: response.data.data
        });
      }).catch(error => {
        this.props.history.push('/campaigns')
      })
    }

  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.location.pathname !== '/campaigns/create' && this.props.location.pathname == '/campaigns/create'){
      console.log(prevProps, this.props)
      this.props.stateToDefault();
      this.setState({
        campaignEditData: null,
        nameEditMode: false,
        bannerEditMode: false,
        durationEditMode: false,
        campaignNameEditError: false,
        errorModal: false,
        errorModalText: '',
        wantToDeleteCampaign: false,

        introTextEditMode:false,
        endingTextEditMode: false
      })
    }
  }

  // campaign DELETE

  campaignDeleteHandler = campaignId => {
    this.setState({
      wantToDeleteCampaign: true,
      errorModal: true,
      errorModalText: 'Czy na pewno chcesz usunąć kampanię? Usunięcie kampanii powoduje ...mnóstwo różnych rzeczy:)'
    })

  };

  // delete confirmation by clicking YES
  reallyWantToDeleteCampaign = () => {
    axios.delete(this.props.location.pathname).then(response => {
      this.props.history.push('/campaigns');
    }).catch(error => {
      console.log(error);
    });
  }

  // changes uncontrolled input in BasicData->CampaignName
  changeCampaignNameAsInputValue = (event, type) => {
    if (type == 'input') {
      this.setState({
        campaignEditData: {
          ...this.state.campaignEditData,
          campaignName: event.target.value
        },
        campaignNameEditError: false
      })
    }
    else {
      let sendText = {
        basicData: {
          campaignName: this.state.campaignEditData.campaignName
        }
      };
      if (sendText.basicData.campaignName.trim() == "") {
        this.setState({
          campaignNameEditError: true,
          nameEditMode: true
        })
      }
      else {
        axios.put('' + window.location.pathname, sendText).then(response => {
          
        });
      }
    }

  }

  // allows to change uncontrolled inputs in CampaignOverview in Intro and Ending Texts
  timeout = null;
  changeCampaignIntroEndingText = (event, type) => {
    if (type == 'intro') {
      this.setState({
        campaignEditData: {
          ...this.state.campaignEditData,
          campaignIntroText: event.target.value
        }
      })
    }


    else {
      this.setState({
        campaignEditData: {
          ...this.state.campaignEditData,
          campaignEndingText: event.target.value
        }
      })
    }
  }

  sendIntroTextEdit = ()=>{
    let sendText = {
      basicData: {
        campaignIntroText: this.state.campaignEditData.campaignIntroText
      }
    };
      axios.put('' + window.location.pathname, sendText).then(response=>{
        sendText=null;
      }).catch(error=>{
        this.setState({
          errorModal: true,
          errorModalText: error.response
        })
      })
  }

  sendEndingTextEdit = ()=>{
    let sendText = {
      basicData: {
        campaignEndingText: this.state.campaignEditData.campaignEndingText
      }
    };
      axios.put('' + window.location.pathname, sendText).then(response=>{
        sendText=null;
      }).catch(error=>{
        this.setState({
          errorModal: true,
          errorModalText: error.response
        })
      })
  }

  // in campaign EDIT mode changes chosen banner 
  formDataImage;
  bannerEditHandler = (e) => {

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
      this.setState({
        bannerEditMode: true
      })
    } else {
      fileDisplayArea.innerHTML = "File not supported!";
    }
  };
  bannerSendOnDisquetteClick = () => {
    if (this.formDataImage !== undefined) {
      axios.post(this.props.location.pathname, this.formDataImage, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then(response => this.setState({
        bannerEditMode: false
      })).catch(error=>{
        this.setState({
          errorModal: true,
          errorModalText: error.response
        })
      })
    }
  }

  EnterNameEditMode = () => {
    this.setState({
      nameEditMode: !this.state.nameEditMode
    })
  }

  EnterBannerEditMode = (e) => {
    e.stopPropagation();
    
    this.setState({
      bannerEditMode: !this.state.bannerEditMode
    })
  }

  EnterDurationEditMode = (durationData) => {
    let campaignDataFrom= new Date(durationData.campaignDateFrom);
    let campaignDataTo = new Date(durationData.campaignDateTo);
    if(campaignDataTo<=campaignDataFrom) {
      return null 
    }
    else {
      this.setState({
        durationEditMode: !this.state.durationEditMode
      })
    }
  }

  showModalError = (error) => {
    this.setState({
      errorModal: true,
      errorModalText: `${error.response.data.data}`
      // errorModalText: `${error.response.data.status_code} - ${error.response.data.message}`
    })
  }

  campaignPublishOrDraft = () => {
    let status = this.state.campaignEditData.campaignStatus == 1 ? 0 : 1;
    let assignedPlaces;
    let assignedQuestions;

    axios.put(`${this.props.location.pathname}/publish/${status}`).then(response => {
      this.setState({
        campaignEditData: {
          ...this.state.campaignEditData,
          campaignStatus: status
        }
      })
    }).catch(error => {
      this.setState({
        errorModal: true,
        errorModalText: `${error.response.data.status_code} - ${error.response.data.message}`
      })
    })



  }

  
  closeModal = () => {
    this.setState({
      errorModal: false
    })
  }

  EnterIntroTextEditMode = () => {
    this.setState({
      introTextEditMode: !this.state.introTextEditMode
    })
  }

  EnterEndingTextEditMode = () => {
    this.setState({
      endingTextEditMode: !this.state.endingTextEditMode
    })
  }


  render() {
    let styles = {
      headerPositioning: {
        display: "flex",
        alignItems: "center",
        lineHeight: 1.5
      },
      greyStyle: {
        color: "#676880"
      }
    };


    return (

      <GlobalContainer>

        {this.props.location.pathname !== '/campaigns/create' && this.state.campaignEditData == null ?
          (<div className="places-preloader" ></div>) :
          (
            <React.Fragment>
              <div className="settings">
                <h2 style={styles.headerPositioning}>
                  {this.props.location.pathname == '/campaigns/create' ?
                    (
                      <React.Fragment>
                        <span style={styles.greyStyle}> DODAWANIE NOWEJ KAMPANII </span>
                        <span className="szkic">SZKIC</span>
                      </React.Fragment>
                    ) :
                    (
                      <React.Fragment>
                        <span style={styles.greyStyle}> EDYCJA KAMPANII </span>
                        <span className="szkic">
                          {this.state.campaignEditData !== null ? (this.state.campaignEditData.campaignStatus == 1 ? 'OPUBLIKOWANA' : 'SZKIC') : null}
                        </span>
                        <span className="companyId">
                          ID: <span>{this.state.campaignEditData !== null ? this.state.campaignEditData.campaignUuid : null}</span>
                        </span>
                      </React.Fragment>
                    )}
                </h2>
                <div className="help-block">
                </div>
              </div>
              <div className="campaign-creation-container">

                <React.Fragment>
                  <div>
                    <ErrorBoundary>
                      <BasicData
                        campaignEditData={this.state.campaignEditData}
                        changeCampaignNameAsInputValue={(event, type) => this.changeCampaignNameAsInputValue(event, type)}
                        bannerEditHandler={(e) => this.bannerEditHandler(e)}
                        nameEditMode={this.state.nameEditMode}
                        EnterNameEditMode={this.EnterNameEditMode}
                        bannerEditMode={this.state.bannerEditMode}
                        EnterBannerEditMode={e => this.EnterBannerEditMode(e)}
                        bannerSendOnDisquetteClick={this.bannerSendOnDisquetteClick}
                        durationEditMode={this.state.durationEditMode}
                        EnterDurationEditMode={(durationData)=>this.EnterDurationEditMode(durationData)}
                        campaignNameEditError={this.state.campaignNameEditError}
                        showModalError={(error) => this.showModalError(error)}
                        campaignStatus={this.state.campaignEditData ? this.state.campaignEditData.campaignStatus : null}
                      // checkIfThereAreAssignedPlaces={this.checkIfThereAreAssignedPlaces}
                      />
                    </ErrorBoundary>
                    <QuestionList
                      campaignEditData={this.state.campaignEditData != null ? this.state.campaignEditData : ''}
                      changeCampaignIntroEndingText={(event, type) => this.changeCampaignIntroEndingText(event, type)}
                      introTextEditMode={this.state.introTextEditMode}
                      endingTextEditMode={this.state.endingTextEditMode}
                      EnterIntroTextEditMode={this.EnterIntroTextEditMode}
                      EnterEndingTextEditMode={this.EnterEndingTextEditMode}
                      sendIntroTextEdit={this.sendIntroTextEdit}
                      sendEndingTextEdit={this.sendEndingTextEdit}
                    />
                  </div>
                  <CampaignManipulationButtons
                    {...this.props}
                    campaignDeleteHandler={(campaignId) => this.campaignDeleteHandler(campaignId)}
                    campaignPublishOrDraft={this.campaignPublishOrDraft}
                    campaignStatus={this.state.campaignEditData ? this.state.campaignEditData.campaignStatus : null}
                  />

                  {/* MODAL WINDOW */}
                  {this.state.errorModal == true ? (
                    ReactDOM.createPortal(
                      <div style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',

                        position: 'fixed',
                        zIndex: '1000',
                        top: 0,
                        left: 0,
                        height: '100vh',
                        width: '100%',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%,-50%)',
                          width: '600px',
                          height: '200px',
                          backgroundColor: 'white',
                          border: '1px solid red',
                          boxShadow: '0px 0px 5px red',
                          padding: '20px'
                        }}>
                          <button onClick={this.closeModal} style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            width: 20,
                            height: 20,
                            backgroundColor: 'transparent',
                            border: 'none'
                          }}>

                            <span style={{
                              position: 'absolute',
                              top: '0',
                              width: '2px',
                              height: '100%',
                              transform: 'rotate(45deg) ',
                              backgroundColor: 'red'
                            }} >
                            </span>

                            <span style={{
                              position: 'absolute',
                              top: '0',
                              width: '2px',
                              height: '100%',
                              transform: 'rotate(-45deg) ',
                              backgroundColor: 'red'
                            }}
                            ></span>
                          </button>
                          <p style={{ position: 'relative', top: '50%', transform: 'translate(0,-50%)', color: 'black' }}>{this.state.errorModalText}</p>
                          {this.state.wantToDeleteCampaign == true ? (
                            <div style={{
                              position: 'absolute',
                              bottom: 10,
                              right: '50%',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: 'red',
                              transform: 'translate(50%,0)',
                              fontSize: 20
                            }}>
                              <button onClick={this.reallyWantToDeleteCampaign} style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'red',
                                marginRight:20
                              }}>

                                Tak
                            </button>
                            <button onClick={this.closeModal} style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'red'
                              }}>

                                Nie
                            </button>
                          </div>
                          ) : null}

                        </div>
                      </div>,
                      document.getElementById('modal')
                    )
                  ) : null}
                </React.Fragment>


              </div>
            </React.Fragment>
          )}
      </GlobalContainer>
    );
  }
}

export default withRouter(CampaignCreate);
