import React, { Component } from "react";
import PlacesTableLine from "./../components/PlacesTableLine";
import GlobalContainer from "./GlobalContainer";
import Settings from "./../components/Settings";
import axios from "axios";
import { Context } from "./../index";

class PlacesList extends Component {
  state = {
    allPlaces: []
  };


  componentDidMount() {
    axios.get("/places?sort_by=placeCreateDate&sort_order=desc&per_page=20").then(response => {
      this.setState({
        allPlaces: response.data.data.items
      });
    });
  }



  deletePlace = (event, id, arrayIndex) => {
    event.preventDefault();
    axios.delete('/places/' + id).then(response => {
      let notTouchedPlaces = this.state.allPlaces;
      notTouchedPlaces.splice(arrayIndex, 1);
      this.setState({
        allPlaces: notTouchedPlaces
      })
    })
  }


  render() {


    return (
      // Object.keys(this.state.allPlaces).length == 0 ?
      //   <div className="places-preloader" ></div>
      //   :
        <Context.Consumer>
          {({ state, actions }) => (
            <GlobalContainer>
              <Settings
                pageName="MIEJSCA"
                editable
                buttonText="Dodaj nowe"
                linkTo="places/create"
              />
              <div className="table-wrap">
                <table className="table-responsive">
                  <thead>
                    <tr>
                      <th>Nazwa</th>
                      <th>Kampanie</th>
                      <th>Akcje </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allPlaces.map((item, index) => (
                      <PlacesTableLine
                        id={item.placeId}
                        index={index}
                        key={item.placeId}
                        name={item.placeName}
                        campaign={item.placeCampaignsCounter}
                        deletePlace={(event, id, arrayIndex) => this.deletePlace(event, id, arrayIndex)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </GlobalContainer>
          )}
        </Context.Consumer>
    );
  }
}

export default PlacesList;
