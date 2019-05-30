import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GradientSVG from './../GradientSVG';
import { connect } from 'react-redux';

const DateProgressCircleWrap = (props) => {
    let start = new Date(props.uniqueData.campaignDateFrom);
    let end = new Date(props.uniqueData.campaignDateTo);
    let mid = props.uniqueData.calculateDaysToEnd * 86400000;

    let total = end.getTime() - start.getTime();
    let onePercent = total / 100 ;

    let daysPassed = total - mid;
    var percentage = daysPassed*100/total;

    return (
        <div className="date-progress-circle">
            <div>
                <GradientSVG
                    startColor="#5b16e7"
                    endColor="#ff426a"
                    idCSS="circular-gradient"
                    rotation="90deg" />
                {props.uniqueData.calculateDaysToEnd !== undefined && props.uniqueData.calculateDaysToEnd !== null?
                    (
                        <CircularProgressbar
                            counterClockwise={true}
                            percentage={percentage}
                            strokeWidth={4}
                            initialAnimation={true}
                            textForPercentage={() => `Dni do końca ${props.uniqueData.calculateDaysToEnd}`} />
                    )
                    : 
                    (
                        <CircularProgressbar
                            counterClockwise={true}
                            percentage={percentage}
                            strokeWidth={4}
                            initialAnimation={true}
                            textForPercentage={() => `Dni do końca ∞`} />
                    )
                }

            </div>
            <div>
                <p>Wyświetleń: <span>{props.uniqueData.uniqueViews} (wszystkich)</span></p>
                <p>Wypełnień: <span>{props.uniqueData.uniqueAnswers} (wszystkich)</span></p>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        uniqueData: state.answersResult !== null ? {
            uniqueAnswers: state.answersResult.uniqueAnswers,
            uniqueViews: state.answersResult.uniqueViews,
            campaignDateFrom: state.answersResult.campaignDateFrom,
            campaignDateTo: state.answersResult.campaignDateTo,
            calculateDaysToEnd: state.answersResult.calculateDaysToEnd
        } : ''
    }
}
export default connect(mapStateToProps)(DateProgressCircleWrap);