import React, { Component } from 'react';
import ChosenListLine from './ChosenListLine';
import {connect} from 'react-redux';
import {getAnswersPlaces, getNextAnswerPlaces} from './../../store/actions';




class ChosenPlacesList extends Component {

    componentDidMount(){
        let campaignId = window.location.href.slice(window.location.href.lastIndexOf('/'));
        this.props.onLoadGetPlaces(campaignId,this.props.perPage);
    }

    render() {
        let places = '';
        if(this.props.answersPlaces){
            places = this.props.answersPlaces.items.map(place=>{
                return <ChosenListLine
                    placeName={place.placeName}
                    placeComment={place.placeComment}
                    uniqueAnswersResults={place.uniqueAnswersResults}
                    uniqueAnswersPercentage={place.uniqueAnswersPercentage} 
                    placeId={place.placeId}/>
            })
        }
        return (
            <div className="chosen-places-list">
                <h3>Lista wybranych miejsc: {this.props.answersPlaces !== null ? this.props.answersPlaces.items.length : 0}</h3>
                {places}
                <button onClick={()=>this.props.loadNextAnswerPlaces(this.props.answersPlaces.paginator.links.next, this.props.perPage)}> 
                   {this.props.paginatorNext == null ? null : `Pokaż kolejne ${this.props.perPage}`}
                </button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      answersPlaces: state.answersPlaces,
      perPage: state.answerPlacesPerPage,
      paginatorNext: state.answersPlaces !== null && state.answersPlaces.paginator ? state.answersPlaces.paginator.links.next : null
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      onLoadGetPlaces: (campaignId,perPage)=>dispatch(getAnswersPlaces(campaignId,perPage)),
      loadNextAnswerPlaces: (link,perPage)=>dispatch(getNextAnswerPlaces(link,perPage))
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(ChosenPlacesList);