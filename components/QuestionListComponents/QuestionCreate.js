import React from 'react';
import $ from 'jquery';


class QuestionCreate extends React.Component {
    state = {
        showOther: false,
        // questionOptionType:null
    }


    //  static getDerivedStateFromProps(nextProps, prevState) {
    //     if(nextProps.questionOptionType !== prevState.questionOptionType){
    //         return {
    //             questionOptionType: nextProps.questionOptionType
    //         }
    //     }
    // }
    
    render() {
        let mapTypes = this.props.optionTypes.map((oneType, index) => {
            switch (oneType.optionTypeName) {
                case 'checkbox':
                    return (
                                <div className="chosen-button" key={index}>
                                        <input
                                            id={"checkbox-input-" + this.props.index + "-" + index}
                                            type="radio"
                                            key={index}
                                            name={"options" + this.props.index + "-" + index }
                                            onClick={(type) => this.props.optionTypeChange('checkbox')}
                                            ref={(node)=>this.checkboxButton=node}
                                            checked={this.props.questionOptionType == 'checkbox' ? true : null}
                                            
                                        />
                                    <label htmlFor={"checkbox-input-" + this.props.index + "-" + index}>Wielokrotnego wyboru</label>
                                </div>
                    );
                    break;
                case 'radio':
                
                    return (
                        <div className="chosen-button" key={index}>
                                <input
                                id={`radio-input-${this.props.index}-${index}`}
                                type="radio"
                                key={index}
                                name={"options" + this.props.index + "-" + index }
                                onClick={(type) => this.props.optionTypeChange('radio')}
                                ref={(node)=>this.radioButton=node}
                                checked={this.props.questionOptionType == 'radio' ? true : null}
                                
                            /> 
                            <label htmlFor={`radio-input-${this.props.index}-${index}`}>Jednokrotnego wyboru</label>
                        </div>
                    );
                    break;
                case 'text':
                
                    return (
                        <div className="chosen-button" key={index}>
                            <input
                                id={`text-input-${this.props.index}-${index}`}
                                type="radio"
                                key={index}
                                name={"options" + this.props.index + "-" + index }
                                onClick={(type) => {  this.props.optionTypeChange('text');   }} 
                                checked={this.props.questionOptionType == 'text' ? true : null}
                                
                            />
                        
                            <label htmlFor={`text-input-${this.props.index}-${index}`}>Odpowiedź tekstowa</label>
                        </div>
                    );
                    break;
                case 'votes':
                
                    return (
                        <div className="chosen-button" key={index}>
                            <input
                                id={`votes-input-${this.props.index}-${index}`}
                                type="radio"
                                key={index}
                                name={"options" + this.props.index + "-" + index }
                                onClick={(type) => { this.props.optionTypeChange('votes');  }}
                                
                                checked={this.props.questionOptionType == 'votes' ? true : null}
                            />
                            <label htmlFor={`votes-input-${this.props.index}-${index}`}>Odpowiedź typu ocena</label>
                        </div>
                    );
                    break;
            }
        });
        return (
            // <form className="one-ring-to-rule-them-all">
            <div className="q-edit-create">
                <h4>Tworzenie pytania</h4>

                <div className="q-short-txt"> {/* TREŚĆ PYTANIA */}
                    <label >
                        Treść pytania
                    </label>
                    <input type="text" 
                           onChange={(event, type) => this.props.changeQuestionNameDesc(event, 'short-txt')} 
                           value={this.props.questionName ? this.props.questionName : ''}/>
                </div>



                <div className="q-full-txt">  {/* ROZWINIĘCIE PYTANIA */}
                    <label >
                        Rozwinięcie pytania
                    </label>
                    <input type="text" 
                           onChange={(event, type) => this.props.changeQuestionNameDesc(event, 'full-txt')} 
                           value={this.props.questionDesc ? this.props.questionDesc : ''}/>
                </div>



                <div className="options-type-cont">
                    <label>Typ odpowiedzi</label>
                    {mapTypes}
                    {this.props.questionOptionType == 'checkbox' || this.props.questionOptionType == 'radio' ? (


                        <div className="other-btns">
                            <input type="checkbox" id={this.props.uniqueId}  checked={this.props.questionOther == 1 ? true : false }/>
                            <label className="grey-btn"
                                htmlFor={this.props.uniqueId}
                                onClick={(type) => {
                                    this.props.questionOtherRequiredHandler('isOther');
                                    this.setState({
                                        showOther: !this.state.showOther
                                    })
                                }}>
                                Odpowiedź typu inne
                            </label>
                        </div>



                    ) : null}

                    {/* REQUIRED STAR SERVICE
                    
                        {this.state.showOther  ? <input type="text" id="answer-type-other" onChange={(event) => this.props.otherLabelHandler(event)} /> : null}
                    */}
                    {this.props.questionName == false || this.props.questionName.trim() == "" ? (
                        <div className="other-btns">
                            <input type="checkbox" id={`${this.props.uniqueId / this.props.index} `} disabled/>
                            <label className="grey-btn" htmlFor={`${this.props.uniqueId / this.props.index} `} style={{opacity: '0.2'}}>
                                Odpowiedź wymagana
                            </label>
                        </div>
                    ) : (
                        <div className="other-btns">
                            <input type="checkbox" id={`${this.props.uniqueId / this.props.index} `}  checked={this.props.questionRequired == 1 ? true : false }/>
                            <label className="grey-btn"
                                htmlFor={`${this.props.uniqueId / this.props.index} `}
                                onClick={(type) => this.props.questionOtherRequiredHandler('isRequired')}>
                                Odpowiedź wymagana
                            </label>
                        </div>
                    )}
                </div>

                {
                    this.props.questionOther == 1 ? 
                        <div>
                            <label style={{
                                width: '100%',
                                color: '#3f404b',
                                fontWeight: 400
                                    }}>
                                    Inne
                            </label>
                            <input type="text" id="answer-type-other" onChange={(event) => this.props.otherLabelHandler(event)} /> 
                        </div>
                    : 
                    null
                }

                {this.props.questionOptionType == 'checkbox' || this.props.questionOptionType == 'radio' ? (
                    <div className="q-edit-add-ans">
                        {this.props.questionOptionType == 'votes' || this.props.questionOptionType == '' ? null : (
                            <React.Fragment>
                                <label >
                                    Odpowiedzi
                                </label>
                                <div>
                                    <form>
                                        <input id="optionAnswer" type="text" onChange={(event) => this.props.optionTypeLabelChange(event)} value={this.props.newOptionLabel.optionLabel}/>
                                    </form>
                                </div>
                                <button className="add-answer" onClick={this.props.addOptionTypeLabel}>Dodaj odpowiedź</button>
                            </React.Fragment>
                        )}
                    </div>
                ) : null}

            </div>
            // </form>
        )
    }
}


export default QuestionCreate;