import React, { Component } from 'react';
import Entrance from './../components/QuestionListComponents/Entrance';
import Ending from './../components/QuestionListComponents/Ending';
import QuestionLine from './../components/QuestionListComponents/QuestionLine';
import { Context } from './../index';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class QuestionList extends Component {
    state = {
        allQuestions: [],
        optionTypes: [],
        optionTypesDummy: [
            {
                optionTypeDescription: "Pole wielokrotnego wyboru",
                optionTypeExplain: "Pole wielokrotnego wyboru",
                optionTypeName: "checkbox"
            },
            {
                optionTypeDescription: "Pole jednokrotnego wyboru",
                optionTypeExplain: "Pole jednokrotnego wyboru",
                optionTypeName: "radio"
            },
            {
                optionTypeDescription: "Pole tekstowe",
                optionTypeExplain: "Pole tekstowe",
                optionTypeName: "text"
            },
            {
                optionTypeDescription: "Rating",
                optionTypeExplain: "Pole z gwiazdkami",
                optionTypeName: "votes"
            }
        ],
        isThereUnsavedQuestion: []
    }

    componentDidMount() {
        axios.get('/optiontypes').then(response => {
            this.setState({
                optionTypes: response.data.data.items
            })
        });
        if (this.props.location.pathname !== '/campaigns/create') {

            axios.get(this.props.campaignEditData.links[2].href).then(response => {
                let allQuestionWithUniqueId = [...response.data.data.items].map((item, index) => {
                    return {
                        ...item,
                        uniqueId: item.questionId,
                        isSaved: true
                    }
                })
                this.setState({
                    allQuestions: allQuestionWithUniqueId
                });

            });
        }
    }


    listOfUnsaved = []
    componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.location.pathname !== '/campaigns/create' && this.props.location.pathname == '/campaigns/create') {
            this.setState({
                allQuestions: [],
                optionTypes: [],
                optionTypesDummy: [
                    {
                        optionTypeDescription: "Pole wielokrotnego wyboru",
                        optionTypeExplain: "Pole wielokrotnego wyboru",
                        optionTypeName: "checkbox"
                    },
                    {
                        optionTypeDescription: "Pole jednokrotnego wyboru",
                        optionTypeExplain: "Pole jednokrotnego wyboru",
                        optionTypeName: "radio"
                    },
                    {
                        optionTypeDescription: "Pole tekstowe",
                        optionTypeExplain: "Pole tekstowe",
                        optionTypeName: "text"
                    },
                    {
                        optionTypeDescription: "Rating",
                        optionTypeExplain: "Pole z gwiazdkami",
                        optionTypeName: "votes"
                    }
                ],
                isThereUnsavedQuestion: []
            })
        }
        this.listOfUnsaved = this.state.allQuestions.filter((question) => {
            return question.isSaved == false
        })
        if (prevState.isThereUnsavedQuestion.length == this.listOfUnsaved.length) {
            return null
        }
        else {
            this.setState({
                isThereUnsavedQuestion: this.listOfUnsaved
            })
        }
    }

    updateSavedOptionQuestion = (questionId, apiQuestionId, type) => {
            let index = this.state.allQuestions.findIndex((question, index) => {
                return question.uniqueId == questionId
            })
            let newObj = {
                isSaved: true,
                uniqueId: questionId
            }
            let allQuestions = [...this.state.allQuestions];
            allQuestions.splice(index, 1, newObj)
            this.setState({
                allQuestions: allQuestions
            })
    }

    updateSavedQuestionFALSE = (questionId) => {
        let index = this.state.allQuestions.findIndex((question, index) => {
            return question.uniqueId == questionId
        })
        let newObj = {
            isSaved: false,
            uniqueId: questionId
        }
        let allQuestions = [...this.state.allQuestions];
        allQuestions.splice(index, 1, newObj)
        this.setState({
            allQuestions: allQuestions
        })
    }

    addQuestionBareSample = () => {
        let newQuestion = {
            uniqueId: new Date().getTime(),
            isSaved: false
        }
        let pushedQuestions = [...this.state.allQuestions];
        pushedQuestions.push(newQuestion);
        this.setState({
            allQuestions: pushedQuestions
        })

    }


    deleteQuestion = (uniqueId, questionId, apiQuestionId) => {
        if (this.props.location.pathname == '/campaigns/create') {
            let oldQuestions = [...this.state.allQuestions].filter((item, index) => item.uniqueId !== uniqueId);
            this.setState({
                allQuestions: oldQuestions
            })
        }
        else {
            console.log(uniqueId, questionId, apiQuestionId);
            console.log(uniqueId);
            let id = questionId || apiQuestionId;
            console.log(id)
            if (id) {
                axios.delete(this.props.location.pathname + '/questions/' + id).then(response => {

                    let oldQuestions = [...this.state.allQuestions].filter((item, index) => item.uniqueId !== uniqueId);
                    this.setState({
                        allQuestions: oldQuestions
                    })
                })
            }
            else {
                let oldQuestions = [...this.state.allQuestions].filter((item, index) => item.uniqueId !== uniqueId);
                this.setState({
                    allQuestions: oldQuestions
                })
            }
        }
    }

    changeQuestionToSaved = (questionId) => {
        let question = {
            uniqueId: questionId,
            isSaved: true
        };
        let questionIndex = null;
        let allQuestions = [...this.state.allQuestions];
        allQuestions.forEach((item, index) => {
            if (item.uniqueId == questionId) {
                questionIndex = index;
            }
        });
        allQuestions.splice(questionIndex, 1, question);
        this.setState({
            ...this.state,
            allQuestions: [...allQuestions]
        })
    }

    render() {
        return (

            <Context.Consumer>
                {
                    ({ state, actions }) => {

                        let mainQuestionsArray = [...state.campaignCreateData.questions];
                        return (
                            <div className="new-question-list">
                                <h4>Lista pytań</h4>
                                <Entrance campaignEntranceEnding={actions.campaignEntranceEnding}
                                    campaignIntroText={this.props.campaignEditData.campaignIntroText != false ? this.props.campaignEditData.campaignIntroText : ''}
                                    changeCampaignIntroEndingText={(event, type) => this.props.changeCampaignIntroEndingText(event, type)}
                                    introTextEditMode={this.props.introTextEditMode}
                                    EnterIntroTextEditMode={this.props.EnterIntroTextEditMode}
                                    sendIntroTextEdit={this.props.sendIntroTextEdit}
                                />



                                <div>
                                    {this.state.allQuestions.map((question, index) => (
                                        <QuestionLine
                                            uniqueId={question.uniqueId}
                                            questionId={question.questionId}
                                            key={question.uniqueId}
                                            index={index}
                                            ref={(node) => { this[QuestionLine + question.uniqueId] = node }}
                                            optionTypes={this.state.optionTypes.length > 0 ? this.state.optionTypes : this.state.optionTypesDummy}
                                            deleteQuestion={(uniqueId, questionId, apiQuestionId) => { this.deleteQuestion(uniqueId, questionId, apiQuestionId) }}
                                            addQuestion={(uniqueId) => actions.addQuestion(uniqueId)}
                                            deleteQuestionFromMainPackage={(uniqueId) => actions.deleteQuestionFromMainPackage(uniqueId)}
                                            selfLink={question.links ? question.links[0].href : null}
                                            isSaved={question.isSaved}
                                            updateSavedOptionQuestion={(questionId,apiQuestionId,type) => this.updateSavedOptionQuestion(questionId,apiQuestionId,type)}
                                            updateSavedQuestionFALSE={(questionId) => this.updateSavedQuestionFALSE(questionId)}
                                            changeQuestionToSaved={(questionId) => this.changeQuestionToSaved(questionId)}
                                        />
                                    ))}


                                    {this.props.location.pathname == '/campaigns/create' ?
                                        (
                                            this.state.allQuestions.length == 0 || this.state.allQuestions.length == mainQuestionsArray.length ?
                                                (
                                                    <button onClick={this.addQuestionBareSample} className="next-q-add" >
                                                        Dodaj kolejne pytanie
                                                </button>
                                                )
                                                :
                                                (
                                                    <button className="next-q-add" style={{
                                                        backgroundColor: '#c1c6cc',
                                                        fontWeight: 'semi-bold',
                                                        color: '#949494',
                                                        textShadow: '0px 0px 1px white'
                                                    }}>
                                                        Zapisz pytania żeby dodać nowe
                                                </button>
                                                )


                                        )
                                        :
                                        (
                                            this.listOfUnsaved.length > 0 ?
                                                (
                                                    <button className="next-q-add" style={{
                                                        backgroundColor: '#c1c6cc',
                                                        fontWeight: 'semi-bold',
                                                        color: '#949494',
                                                        textShadow: '0px 0px 1px white'
                                                    }}>
                                                        Zapisz pytania żeby dodać nowe
                                                </button>
                                                )
                                                :
                                                (
                                                    <button onClick={this.addQuestionBareSample} className="next-q-add" >
                                                        Dodaj kolejne pytanie
                                                </button>
                                                )

                                        )
                                    }
                                </div>
                                <Ending campaignEntranceEnding={actions.campaignEntranceEnding}
                                    campaignEndingText={this.props.campaignEditData.campaignEndingText != false ? this.props.campaignEditData.campaignEndingText : ''}
                                    changeCampaignIntroEndingText={(event, type) => this.props.changeCampaignIntroEndingText(event, type)}
                                    endingTextEditMode={this.props.endingTextEditMode}
                                    EnterEndingTextEditMode={this.props.EnterEndingTextEditMode}
                                    sendEndingTextEdit={this.props.sendEndingTextEdit}
                                />
                            </div>
                        )
                    }
                }
            </Context.Consumer>
        );
    }
}

export default withRouter(QuestionList);
