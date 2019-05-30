import React, {Component} from 'react';

import AnswerMainData from './../components/AnswersGeneral/AnswerMainData';
import DateProgressCircleWrap from './../components/AnswersGeneral/DateProgressCircleWrap';
import ChosenPlacesList from './../components/AnswersGeneral/ChosenPlacesList';

class AnswersGeneral extends Component {
    render(){
        return (
            <div className="answers-general">
              <AnswerMainData campaignName={this.props.campaignName}/>
              <DateProgressCircleWrap/>
              <ChosenPlacesList/>
              
            </div>
        )
    }
}

export default AnswersGeneral;









