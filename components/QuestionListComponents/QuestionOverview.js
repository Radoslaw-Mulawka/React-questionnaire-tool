import React from 'react';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import $ from 'jquery'

const QuestionOverview = (props) => {

    


    let questionTypeInput;
    switch (props.questionType) {
        case 'checkbox':
            questionTypeInput = props.options.map((option, index) => (
                <div className="chosen-type" key={index}>
                    <div className="type-checkbox">
                        <input id={"checkbox-overview-"+props.uniqueId+"-"+index} type="checkbox" />
                        <label htmlFor={"checkbox-overview-"+props.uniqueId+"-"+index}>
                            {option.optionLabel}
                        </label>
                        <button onClick={(deletedElementIndex,optionId) => props.deleteOption(index,option.optionId)}></button>
                    </div>
                </div>
            ));
            props.questionOther == 1 ? questionTypeInput.push( (
                <div className="chosen-type" key={new Date()*1}>
                    <div className="type-checkbox">
                        <input id={"checkbox-overview-"+props.uniqueId} type="checkbox" />
                        <label htmlFor={"checkbox-overview-"+props.uniqueId} onClick={(hideInput,inputType)=>props.hiddenInputShowHandler('','checkBox')}>
                            { props.questionLabelOther.trim() !== "" ? props.questionLabelOther : 'Inne'}
                        </label>
                        
                    </div>
                    
                </div>
                
            ) ) : null;
            break;
        case 'radio':
            questionTypeInput = props.options.map((option, index) => (
                <div className="chosen-type" key={index}>
                    <div className="type-radio">
                        <input id={"radio-overview-"+props.uniqueId+"-"+index} type="radio" name="radio-overview"/>
                        <label htmlFor={"radio-overview-"+props.uniqueId+"-"+index} onClick={(hideInput)=>props.hiddenInputShowHandler('hideInput')}>
                            {option.optionLabel}
                        </label>
                        <button onClick={(deletedElementIndex,optionId) => props.deleteOption(index,option.optionId)}></button>
                    </div>
                </div>
            ));
            props.questionOther == 1 ? questionTypeInput.push( (
                <div className="chosen-type" key={new Date()*2}>
                    <div className="type-radio">
                        <input id={"radio-overview-"+props.uniqueId} type="radio" name="radio-overview"/>
                        <label htmlFor={"radio-overview-"+props.uniqueId} onClick={props.hiddenInputShowHandler}>
                            {props.questionLabelOther.trim() !== "" ? props.questionLabelOther : 'Inne'}
                        </label>
                    </div>
                </div>
            ) ) : null;
            break;
        case 'text':
            questionTypeInput = (
                <div className="chosen-type" key={new Date()*3}>
                    <div className="type-text">
                        <label htmlFor={"text-overview-"+props.uniqueId}></label>
                        <div>
                            <input id={"text-overview-"+props.uniqueId} type="text" />
                        </div>
                    </div>
                </div>
            )
            break;
        case 'votes':
            questionTypeInput = (
                <div className="chosen-type" key={new Date()*4}>
                    <Rater total={5} rating={0} />
                </div>
            )
            break;
    }


    return (
        <div className="q-edit-overview">
            <h4>Podgląd pytania</h4>
            <div className="q-text-wrap">
                {props.questionRequired == 1 ? (
                    <span className="required-answer">
                        {props.questionName}
                    </span>
                ) : (
                        <span>
                            {props.questionName}
                        </span>
                    )}
                <span>
                    {props.questionDesc}
                </span>
            </div>
            <div>
                {questionTypeInput}
                {props.hiddenInputShow == true ? <input type="text" className="other-hidden-input"/> : null }
            </div>
        </div>
    )
}


export default QuestionOverview;