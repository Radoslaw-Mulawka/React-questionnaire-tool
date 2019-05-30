import React, { Component } from "react";

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAnswersData } from "../store/actions";

import AnswersGeneral from "./AnswersGeneral";
import AnswersAccordingQuestions from './AnswersAccordingQuestions';


class AnswerDetails extends Component {

  componentDidMount() {
    let campaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));
    this.props.onLoadGetAnswersData(campaignId)
  }


  render() {
    const { answersResult } = { ...this.props };

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
      // answersResult == null ?
      //   <div className="places-preloader" ></div>
      //   :
      <React.Fragment>
        <div className="settings" >
          <h2 style={styles.headerPositioning}>
            <React.Fragment>
              <span style={styles.greyStyle}> WYNIKI KAMPANII </span>
              <span className="companyId">
                ID: <span>{answersResult !== null ? answersResult.campaignUuid : null}</span>
              </span>
            </React.Fragment>
          </h2>
          <div className="help-block">
          </div>
        </div>

        <div className="answers-details-container">
          <div>
            <AnswersGeneral campaignName={this.props.answersResult !== null ? this.props.answersResult.campaignName : null} />
            <AnswersAccordingQuestions />
          </div>
        </div>
      </React.Fragment>
    );
  }
}





const mapStateToProps = (state) => {
  return {
    answersResult: state.answersResult
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLoadGetAnswersData: (campaignId) => dispatch(getAnswersData(campaignId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnswerDetails));
