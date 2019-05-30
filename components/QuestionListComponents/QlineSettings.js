import React from 'react';
import Radium from 'radium';


const QlineSettings = (props) => {
    let lineHeader = props.lineHeader.slice(0,60);

    let id = props.questionId == true ? props.questionId : props.uniqueId
    return (
        <div className="q-line-settings" >
            <div >
                <span className="line-settings-number">{props.index+1}</span>
                <span>{lineHeader}</span>
            </div>
            <div>

                <button 
                onClick={props.showOrHide}
                style={{
                    backgroundColor: '#a6b2be',
                    border: "none",
                    color: "white",
                    borderRadius: "30px",
                    width: '70px',
                    height: '30px',
                    marginRight: '15px',
                    borderRadius: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ":hover": {
                        backgroundColor: "#8999a8"
                    }
                }}>{props.showOrHideState !== true ? "Rozwiń" : "Zwiń" }</button>
                {/* <button className="edit-btn" onClick={props.showOrHide}> </button> */}
                <button className="q-dlt-btn" onClick={(uniqueId)=> { 
                    props.deleteQuestion(id,props.questionId, props.apiQuestionId); 
                    props.deleteQuestionFromMainPackage(id) 
                } 
                }></button>
            </div>
        </div>
    )
}


export default Radium(QlineSettings);