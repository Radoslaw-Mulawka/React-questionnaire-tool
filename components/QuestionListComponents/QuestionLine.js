import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import QlineSettings from './QlineSettings';
import QuestionCreate from './QuestionCreate';
import QuestionOverview from './QuestionOverview';
// import 'jquery';
import $ from 'jquery';
import axios from 'axios';


class QuestionLine extends Component {
    state = {
        questionData: {
            questionName: "", //*
            questionExtendedDesc: "",
            questionOptionType: "", //* checkbox radio text votes
            questionRequired: 0, //* 0-1
            questionOther: 0, // 0-1
            questionLabelOther: "",
            questionOrder: this.props.index, // liczba int.
            options: [
                // { optionLabel: "Tak", optionOrder: 1 }, // *
                // { optionLabel: "Nie", optionOrder: 2 }, // *
                // { optionLabel: "Nie wiem", optionOrder: 3 } // *
            ],
            uniqueId: this.props.uniqueId
        },
        showOrHide: false,
        hiddenInputShow: false,
        isSaved: this.props.isSaved,
        isOpen: false,
        newOptionLabel: {
            optionLabel:''
        }
    }



    componentDidMount() {
        let currentCampaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));

        if (this.props.selfLink !== null) {
            axios.get(this.props.selfLink).then(response => {
                this.setState({
                    questionData: response.data.data
                }, () => {
                    axios.get(response.data.data.links[2].href).then(response => {
                        this.setState({
                            questionData: {
                                ...this.state.questionData,
                                options: response.data.data.items
                            }
                        })
                    })
                });
            })
        }
    }





    // In QuestionCreate changes TREŚĆ PYTANIA i ROZWINIĘCIE PYTANIA
    changeQuestionNameDesc = (event, type) => {
        if (type == 'short-txt') {
            if (event.target.value.trim() == "") {
                this.setState({
                    questionData: {
                        ...this.state.questionData,
                        questionName: event.target.value,
                        questionRequired: 0,
                    },

                }, () => {
                    this.props.updateSavedQuestionFALSE(this.props.uniqueId)
                })
            }
            else {
                this.setState({
                    questionData: {
                        ...this.state.questionData,
                        questionName: event.target.value,
                    },

                }, () => {
                    this.props.updateSavedQuestionFALSE(this.props.uniqueId)
                })
            }
        }
        else if (type == 'full-txt') {
            this.setState({
                questionData: {
                    ...this.state.questionData,
                    questionExtendedDesc: event.target.value
                },

            }, () => {
                this.props.updateSavedQuestionFALSE(this.props.uniqueId)
            })
        }
    }

    // In QuestionCreate adds this method to every input that is created by optionTypes.map (different types that are set on server by back-end guys)
    optionTypeChange = (type) => {
        switch (type) {
            case 'checkbox':
                this.setState({
                    questionData: {
                        ...this.state.questionData,
                        questionOptionType: "checkbox",
                        questionOther: 0
                    },
                    hiddenInputShow: false,

                }, () => {
                    this.props.updateSavedQuestionFALSE(this.props.uniqueId)
                })
                break;
            case 'radio':
                this.setState({
                    questionData: {
                        ...this.state.questionData,
                        questionOptionType: "radio",
                        questionOther: 0
                    },
                    hiddenInputShow: false,

                }, () => {
                    this.props.updateSavedQuestionFALSE(this.props.uniqueId)
                })
                break;
            case 'text':
                this.setState({
                    questionData: {
                        ...this.state.questionData,
                        questionOptionType: "text",
                        options: [],
                        questionOther: 0
                    },
                    hiddenInputShow: false,

                }, () => {
                    this.props.updateSavedQuestionFALSE(this.props.uniqueId)
                })
                break;
            case 'votes':
                this.setState({
                    questionData: {
                        ...this.state.questionData,
                        questionOptionType: "votes",
                        options: [],
                        questionOther: 0
                    },
                    hiddenInputShow: false,

                }, () => {
                    this.props.updateSavedQuestionFALSE(this.props.uniqueId)
                })
                break;
        }
    }


    // In QuestionCreate adds this method to input that is above DODAJ ODPOWIEDŹ
    // newOptionLabel = null;
    optionTypeLabelChange = (event) => {
        // this.newOptionLabel = {
        //     optionLabel: event.target.value
        // }
        this.setState({
            newOptionLabel: {
                optionLabel: event.target.value
            }
        })
    }

    // In QuestionCreate adds this method to button Dodaj Odpowiedź. 
    addOptionTypeLabel = (event) => {
        let currentCampaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));
        if (currentCampaignId == '/create') {
            const stateOptions = [...this.state.questionData.options];
            
            if (this.state.newOptionLabel !== null && this.state.newOptionLabel.optionLabel.trim() !== "") {
                stateOptions.push({ ...this.state.newOptionLabel });
                this.setState({
                    questionData: {
                        ...this.state.questionData,
                        options: stateOptions
                    }
                }, () => {
                    // this.newOptionLabel = null;

                    this.props.updateSavedQuestionFALSE(this.props.uniqueId);
                    this.setState({
                        newOptionLabel: {
                            optionLabel:''
                        }
                    })

                })
            }
            // event.target.previousElementSibling.firstElementChild.reset();
        }
        else {
            const stateOptions = [...this.state.questionData.options];
            if (this.state.newOptionLabel !== null && this.state.newOptionLabel.optionLabel.trim() !== "") {
                if (this.state.questionData.questionId) {
                    axios.post("/campaigns" + currentCampaignId + '/questions/' + this.state.questionData.questionId + '/options/', {
                        optionData: this.state.newOptionLabel
                    }).then(response => {

                        stateOptions.push(response.data.data);
                        this.setState({
                            questionData: {
                                ...this.state.questionData,
                                options: stateOptions
                            }
                        }, () => {
                            // this.state.newOptionLabel = null;
                            

                            this.props.updateSavedQuestionFALSE(this.props.uniqueId);
                            this.setState({
                                newOptionLabel: {
                                    optionLabel:''
                                }
                            })

                        })
                    })
                    // event.target.previousElementSibling.firstElementChild.reset();
                }
                else {
                    stateOptions.push({ ...this.state.newOptionLabel });
                    this.setState({
                        questionData: {
                            ...this.state.questionData,
                            options: stateOptions
                        },


                    }, () => {
                        // this.newOptionLabel = null;
                        

                        this.props.updateSavedQuestionFALSE(this.props.uniqueId);
                        this.setState({
                            newOptionLabel: {
                                optionLabel:''
                            }
                        })

                    });
                    // event.target.previousElementSibling.firstElementChild.reset();
                }
            }
        }
    }

    // In QuestionOverview adds this method to button with icon of trashBin, that is generated on options.map
    deleteOption = (deletedElementIndex, optionId) => {
        let currentCampaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));

        if (currentCampaignId == '/create') {
            let slicedOptions = [...this.state.questionData.options];
            let filteredOptions = slicedOptions.filter((element, index) => index !== deletedElementIndex);
            this.setState({
                questionData: {
                    ...this.state.questionData,
                    options: filteredOptions
                }
            })
        }
        else {
            if (this.state.questionData.questionId) {
                axios.delete("/campaigns" + currentCampaignId + '/questions/' + this.state.questionData.questionId + '/options/' + optionId).then(response => {

                    let slicedOptions = [...this.state.questionData.options];
                    let filteredOptions = slicedOptions.filter((element, index) => index !== deletedElementIndex);
                    this.setState({
                        questionData: {
                            ...this.state.questionData,
                            options: filteredOptions
                        }
                    })
                })
            }
            else {
                let slicedOptions = [...this.state.questionData.options];
                let filteredOptions = slicedOptions.filter((element, index) => index !== deletedElementIndex);
                this.setState({
                    questionData: {
                        ...this.state.questionData,
                        options: filteredOptions
                    }
                })
            }
        }
    }

    // In QuestionCreate adds this method that shows or hides questionOther or questionRequired inputs simultaneously changing state of this particular component
    questionOtherRequiredHandler = (type) => {
        switch (type) {
            case 'isOther':
                this.setState({
                    questionData: {
                        ...this.state.questionData,
                        questionOther: this.state.questionData.questionOther == 0 ? 1 : 0,
                        questionLabelOther: ""
                    },

                }, () => {
                    this.props.updateSavedQuestionFALSE(this.props.uniqueId)
                })
                break;
            case 'isRequired':
                if (this.state.questionData.questionName !== false && this.state.questionData.questionName.trim() !== "") {
                    this.setState({
                        questionData: {
                            ...this.state.questionData,
                            questionRequired: this.state.questionData.questionRequired == 0 ? 1 : 0
                        },

                    }, () => {
                        this.props.updateSavedQuestionFALSE(this.props.uniqueId)
                    })
                }
                break;
        }
    }


    // In QuestionCreate adds this method to input that changes value text of INNE option
    otherLabelHandler = (event) => {
        this.setState({
            questionData: {
                ...this.state.questionData,
                questionLabelOther: event.target.value
            },

        }, () => {
            this.props.updateSavedQuestionFALSE(this.props.uniqueId)
        })
    }



    // In QlineSettings adds this method to Pencil icon, that triggers full question data to show or hide
    showOrHide = () => {
        this.setState({
            showOrHide: !this.state.showOrHide
        })
    }

    //In QuestionOverview triggers the openning of hidden input below the INNE option on Inne option click
    hiddenInputShowHandler = (hideInput, inputType) => {
        if (inputType == 'checkBox') {
            this.setState({
                hiddenInputShow: !this.state.hiddenInputShow
            })
        }
        else {
            if (hideInput == 'hideInput') {
                this.setState({
                    hiddenInputShow: false
                })
            }
            else {
                this.setState({
                    hiddenInputShow: true
                })
            }
        }
    }


    //adds question to edit package while editing campaign and send it to api
    addQuestionToEditPackage = () => {
        let currentCampaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));
        let questionData = {
            questionData: {
                ...this.state.questionData
            }
        }
        if (this.state.questionData.questionName.trim() !== "" && this.state.questionData.questionOptionType != false) {
            if (this.state.questionData.questionOptionType == 'checkbox' || this.state.questionData.questionOptionType == 'radio') {
                if (this.state.questionData.options.length > 0) {
                    console.log('is bigger than 0')
                    if (questionData.questionData.questionId) {
                        console.log('id istnieje', questionData.questionData.questionId)

                        axios.put('/campaigns' + currentCampaignId + '/questions/' + questionData.questionData.questionId, questionData).then(response => {
                            this.setState({
                                showOrHide: false,
                                isSaved: true
                            }, () => {
                                this.props.updateSavedOptionQuestion(this.props.uniqueId)
                            })
                        })
                    }
                    else {
                        console.log('nie ma id', this.props.questionId)
                        axios.post('/campaigns' + currentCampaignId + '/questions/', questionData).then(response => {
                            this.setState({
                                showOrHide: false,
                                isSaved: true
                            }, () => {
                                console.log(response)
                                this.props.updateSavedOptionQuestion(this.props.uniqueId, response.data.data.questionId, 'created')
                                this.setState({
                                    questionData:{
                                        ...this.state.questionData,
                                        questionId: response.data.data.questionId
                                    }
                                })
                            })
                        })
                    }
                }
                else {
                    this.setState({
                        isOpen: true,
                        showOrHide: true
                    })
                }
            }
            else {
                if (questionData.questionData.questionId || this.props.questionId !==false) {
                    axios.put('/campaigns' + currentCampaignId + '/questions/' + this.state.questionData.questionId, questionData).then(response => {
                        this.setState({
                            showOrHide: false,
                            isSaved: true
                        }, () => {
                            this.props.updateSavedOptionQuestion(this.props.uniqueId)
                        })
                    })
                }
                else {
                    console.log('nie ma id', this.props.questionId)
                    axios.post('/campaigns' + currentCampaignId + '/questions/', questionData).then(response => {
                        this.setState({
                            showOrHide: false,
                            isSaved: true
                        }, () => {
                            console.log(response)
                            this.props.updateSavedOptionQuestion(this.props.uniqueId, response.data.data.questionId, 'created')
                            this.setState({
                                questionData:{
                                    ...this.state.questionData,
                                    questionId: response.data.data.questionId
                                }
                            })
                        })
                    })
                }
            }
        }
        else {
            this.setState({
                isOpen: true,
                showOrHide: true
            })
        }

    }

    checkIfFilled = () => {
        let id = this.props.questionId == true ? this.props.questionId : this.props.uniqueId;
        if (this.state.questionData.questionName.trim() !== "" && this.state.questionData.questionOptionType != false) {
            if (this.state.questionData.questionOptionType == 'checkbox' || this.state.questionData.questionOptionType == 'radio') {
                if (this.state.questionData.options.length > 0) {
                    this.props.addQuestion(this.state.questionData);
                    this.props.changeQuestionToSaved(id);
                    this.setState({
                        isOpen: false,
                        showOrHide: false,
                    })
                }
                else {
                    this.setState({
                        isOpen: true,
                        showOrHide: true
                    })
                }
            }
            else {
                this.props.addQuestion(this.state.questionData);
                this.props.changeQuestionToSaved(id);
                this.setState({
                    isOpen: false,
                    showOrHide: false
                })
            }
        }
        else {
            this.setState({
                isOpen: true,
                showOrHide: true
            })
        }


    }




    closeError = () => {
        this.setState({
            isOpen: false
        })
    }
    render() {
        let currentCampaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));
        let showOrHide = null;
        let id = this.props.questionId == true ? this.props.questionId : this.props.uniqueId;
        let borderStyle;

        if (this.state.showOrHide) {
            showOrHide = {
                display: 'grid'
            }
        }
        else {
            showOrHide = {
                display: 'none'
            }
        }
        if (this.props.isSaved == false) {
            borderStyle = {
                border: '1px solid red'
            }
        }

        return (
            <div key={this.state.questionData.questionId || this.props.uniqueId} className="separate-q-line" ref={(separateLine) => { this.separateLine = separateLine }} style={borderStyle}>
                <QlineSettings
                    showOrHide={this.showOrHide}
                    showOrHideState={this.state.showOrHide}
                    index={this.props.index}
                    lineHeader={this.state.questionData.questionName}
                    {...this.props}
                    apiQuestionId = {this.state.questionData.questionId}
                    uniqueId={this.props.uniqueId}
                    deleteQuestionFromMainPackage={(uniqueId) => this.props.deleteQuestionFromMainPackage(uniqueId)}
                    questionId={this.props.questionId}
                />   {/*number and edit - delete buttons */}

                <div className="q-edit-block" style={showOrHide}>
                    <QuestionCreate changeQuestionNameDesc={(event, type) => this.changeQuestionNameDesc(event, type)}
                        optionTypeLabelChange={(event) => this.optionTypeLabelChange(event)}
                        addOptionTypeLabel={this.addOptionTypeLabel}
                        optionTypes={this.props.optionTypes} // types are coming from QuestionList's did mount
                        optionTypeChange={(type) => this.optionTypeChange(type)}
                        options={this.state.questionData.options}
                        index={this.props.index}
                        uniqueId={this.props.uniqueId}
                        questionOptionType={this.state.questionData.questionOptionType ? this.state.questionData.questionOptionType : null}
                        questionOtherRequiredHandler={(type) => this.questionOtherRequiredHandler(type)}
                        otherLabelHandler={(event) => this.otherLabelHandler(event)}
                        questionName={this.state.questionData.questionName}
                        questionRequired={this.state.questionData.questionRequired}
                        questionOther={this.state.questionData.questionOther}
                        questionDesc={this.state.questionData.questionExtendedDesc}
                        newOptionLabel={this.state.newOptionLabel}
                    />  {/* tworzenie pytania */}




                    <QuestionOverview questionName={this.state.questionData.questionName}
                        index={this.props.index}
                        uniqueId={this.props.uniqueId}
                        questionDesc={this.state.questionData.questionExtendedDesc}
                        questionType={this.state.questionData.questionOptionType}
                        questionRequired={this.state.questionData.questionRequired}
                        deleteOption={(deletedElementIndex, optionId) => this.deleteOption(deletedElementIndex, optionId)}
                        questionOther={this.state.questionData.questionOther}
                        questionLabelOther={this.state.questionData.questionLabelOther ? this.state.questionData.questionLabelOther : "Inne"}
                        hiddenInputShow={this.state.hiddenInputShow}
                        hiddenInputShowHandler={(hideInput, inputType) => this.hiddenInputShowHandler(hideInput, inputType)}
                        options={this.state.questionData.options ? this.state.questionData.options : []} /> {/* podgląd pytania */}



                    <div className="q-edit-settings">
                        <div className="buttons-cont">
                            {currentCampaignId == '/create' ?
                                (
                                    <React.Fragment>
                                        {this.state.isOpen == true ? (
                                            <div className="red-alert" >
                                                W pytaniu musi być Nazwa, Typ odpowiedzi i co najmniej jedna  opcja.
                                                <div className="cross" onClick={(event) => { this.closeError(); }} >
                                                    <div>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                                <div id="triangle"></div>
                                            </div>
                                        ) : null}
                                        <button className="save-btn" onClick={(question) => { this.checkIfFilled(); }}> </button>
                                    </React.Fragment>
                                )
                                :
                                (
                                    <React.Fragment>
                                        {this.state.isOpen == true ? (
                                            <div className="red-alert" >
                                                W pytaniu musi być Nazwa, Typ odpowiedzi i co najmniej jedna  opcja.
                                                <div className="cross" onClick={(event) => { this.closeError(); }} >
                                                    <div>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                                <div id="triangle" ></div>
                                            </div>
                                        ) : null}
                                        <button className="save-btn" onClick={(question) => { this.addQuestionToEditPackage(); }}> </button>
                                    </React.Fragment>
                                )
                            }
                            <button className="q-dlt-btn" onClick={(uniqueId, questionId, apiQuestionId) => { this.props.deleteQuestion(this.props.uniqueId, this.props.questionId, this.state.questionData.questionId); this.props.deleteQuestionFromMainPackage(this.props.uniqueId) }}></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default QuestionLine;