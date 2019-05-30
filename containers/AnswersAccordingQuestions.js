import React, { Component } from "react";
import AnswerTypeRadioCheckbox from './../components/AnswersAccordingQuestions/AnswerTypeRadioCheckbox';
import AnswerTypeText from './../components/AnswersAccordingQuestions/AnswerTypeText';
import AnswerTypeVotes from './../components/AnswersAccordingQuestions/AnswerTypeVotes';
import {connect} from 'react-redux';







// <AnswerTypeText/>
// <AnswerTypeVotes/>



class AnswersAccordingQuestions extends Component {



    render() {
        let questions = this.props.answersResult !== null ? this.props.answersResult.map( (question,index)=>{
            return (
                <AnswerTypeRadioCheckbox 
                    {...question}
                    questionIndex={index}
                />
            )
        }) : null
        return (
            <div className="answers-according-questions">
                <h3>Wyniki według pytań</h3>
                {questions}
            </div>
        );
    }
}



const mapStateToProps = state=>{
    return {
        answersResult: state.answersResult !== null ? state.answersResult.questions : null
    }
}
export default connect(mapStateToProps)(AnswersAccordingQuestions);
