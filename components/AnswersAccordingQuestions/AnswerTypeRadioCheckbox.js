import React from 'react';
import { Line } from 'rc-progress';
import GradientSVG from './../GradientSVG';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

const AnswerTypeRadioCheckbox = (props) => {

    let options;
    if (props.options !== null) {
        switch (props.questionOptionType) {
            case "radio":
                options = (
                    props.options.map(option => {
                        return (
                            <div className="answer-graph">
                                <p>{option.optionLabel}</p>
                                <div className="answer-progress">
                                    <progress max="100" value={option.optionPercentage ? option.optionPercentage : 0}></progress>

                                </div>
                                <div>
                                    <span>
                                        {option.optionPercentage ? option.optionPercentage : 0}%
                                    </span>
                                    <span>
                                        {option.optionResults ? option.optionResults : 0} odp.
                                    </span>
                                </div>
                            </div>
                        )
                    })
                )
                props.questionOther == 1 ? options.push((
                    <div className="answer-graph">
                        <p>{props.questionLabelOther}</p>
                        <div className="answer-progress">
                            <progress max="100" value={props.questionOtherAnswers ? props.questionOtherAnswers.percentage : 0}></progress>
                        </div>
                        <div>
                            <span>
                                {props.questionOtherAnswers ? props.questionOtherAnswers.percentage : 0}%
                                    </span>
                            <span>
                                {props.questionOtherAnswers ? props.questionOtherAnswers.results : 0} odp.
                                    </span>
                        </div>
                    </div>
                )) : null

                break;
            case "checkbox":
                options = (
                    props.options.map(option => {
                        return (
                            <div className="answer-graph">
                                <p>{option.optionLabel}</p>
                                <div className="answer-progress">
                                    <progress max="100" value={option.optionPercentage ? option.optionPercentage : 0}></progress>

                                </div>
                                <div>
                                    <span>
                                        {option.optionPercentage ? option.optionPercentage : 0}%
                                </span>
                                    <span>
                                        {option.optionResults ? option.optionResults : 0} odp.
                                </span>
                                </div>
                            </div>
                        )
                    })
                )
                props.questionOther == 1 ? options.push((
                    <div className="answer-graph">
                        <p>{props.questionLabelOther}</p>
                        <div className="answer-progress">
                            <progress max="100" value={props.questionOtherAnswers ? props.questionOtherAnswers.percentage : 0}></progress>
                        </div>
                        <div>
                            <span>
                                {props.questionOtherAnswers ? props.questionOtherAnswers.percentage : 0}%
                                    </span>
                            <span>
                                {props.questionOtherAnswers ? props.questionOtherAnswers.results : 0} odp.
                                    </span>
                        </div>
                    </div>
                )) : null
                break;
            case "text":
                options = (
                    <div className="answer-text">
                        {props.questionTextAnswers !== undefined ?
                            props.questionTextAnswers.map(text => {
                                return <p>{text}</p>
                            })
                            : null
                        }
                    </div>
                )
                break;
            case "votes":
                options = (
                    <div className="answer-stars">
                        <div>
                            {props.questionVotes !== undefined ?
                                props.questionVotes.map((vote, index) => {
                                    return (
                                        <div className="stars-line">
                                            <Rater total={5} rating={index + 1} interactive={false} /> <span>{vote.results} odpowiedzi</span>
                                        </div>
                                    )
                                })
                                : null
                            }
                        </div>
                        <div>
                            <div>{props.questionVotesAverage ? props.questionVotesAverage : 0}</div>
                            <p>Średnia<br /> z wszystkich ocen</p>
                        </div>
                    </div>
                )
                break;
            default:
                options = (
                    <p>Loading...</p>
                )
        }
    }
    else {
        options = <p>Loading...</p>
    }
    return (
        <div className="answer-type">
            <div className="answer-number">
                {props.questionIndex + 1}
            </div>

            <div>
                <div className="answer-question">
                    {props.questionName != false ? props.questionName : 'Unknown'}
                </div>
                <div className="answer-gathered-data">
                    <span>Respondentów</span>  <span>{props.questionUniqueAnswers !== null ? props.questionUniqueAnswers : null}</span>
                    <span>Pominięć</span>  <span> {props.questionOmitAnswers !== null ? props.questionOmitAnswers : 'no'}</span>
                    <span>Łącznie wybranych opcji</span>  <span>{props.questionCountAnswers !== null ? props.questionCountAnswers : null}</span>
                </div>
            </div>

            <div>
                {options}
            </div>
        </div>
    )
}

export default AnswerTypeRadioCheckbox;