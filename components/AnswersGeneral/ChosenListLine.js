import React from 'react';
import {connect} from 'react-redux';
import {getAnswerPlaceData} from './../../store/actions';



const ChosenListLine = (props) => {
    let campaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));
    let placeId = props.placeId;
    return (
        <div className="chosen-list__line">
            <p>{props.placeName}</p>
            <p>{props.placeComment}</p>
            <div>
                <span>Wypełnień:</span>
                <span>{props.uniqueAnswersResults} odp.
                    <span>{props.uniqueAnswersPercentage}%</span>
                </span>
            </div>
            <button onClick={()=>props.loadPlaceData(campaignId,placeId)}>Idź do wyników</button>
        </div>
    )
}

const mapDispatchToProps = dispatch=>{
    return {
        loadPlaceData: (campaignId,placeId)=>dispatch(getAnswerPlaceData(campaignId,placeId))
    }
}
export default connect(null,mapDispatchToProps)(ChosenListLine);