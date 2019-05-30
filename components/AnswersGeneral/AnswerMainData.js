import React from 'react';
import {connect} from 'react-redux';
import {getAnswersData} from './../../store/actions';

const AnswerMainData = (props) => {
    let campaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));
    return (
        <div className="answer-main-data">
            <div className="answer-name-date">
                <h4>{props.campaignName}</h4>
                <span className="from">od: <span className="date">{props.date.dateFrom}</span></span>
                <span className="to">do: <span className="date">{props.date.dateTo}</span></span>
            </div>
            <button onClick={()=>props.getAllData(campaignId)}>Wszystkie wyniki</button>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        date: state.answersResult !== null ? {
            dateFrom: state.answersResult.campaignDateFrom,
            dateTo: state.answersResult.campaignDateTo
        } : ''
    }
}
const mapDispatchToProps= dispatch=>{
    return {
        getAllData: (campaignId)=>dispatch(getAnswersData(campaignId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AnswerMainData);