import React, { Component, createContext } from "react";
import ResultLine from "./ResultLine";
import { Context } from "./../../index";
import axios from "axios";
import {withRouter} from 'react-router-dom';


class Places extends Component {
  state = {
    allPlaces: [],
    justForRefresh: 0,
    paginator: null,
    placesPerPage: 5,
    addPlaceSuccess: true,
    placesLength: 0
  };




  componentDidMount() {
    if (this.props.location.pathname !== "/campaigns/create") {
      axios.get(this.props.location.pathname + "/places/all?sort_by=campaignPlaceAssigned&sort_order=desc&per_page=" + this.state.placesPerPage)
        .then(response => {
          this.setState({
            allPlaces: response.data.data.items,
            paginator: response.data.data.paginator
          });
        })
    }
    else {
      axios.get("/places?sort_by=placeCreateDate&sort_order=desc&per_page=" + this.state.placesPerPage).then(response => {
        this.setState({
          allPlaces: response.data.data.items,
          paginator: response.data.data.paginator
        });
      });
    }
  }






  placeName = null;
  placeComment = null;
  changePlaceNameComment = (event, type) => {
    if (type == "name") {
      this.placeName = event.target.value;
      this.setState({
        addPlaceSuccess: true
      })
    } else if ((type = "comment")) {
      this.placeComment = event.target.value;
    }
  };


  addNewPlace = () => {
    if (this.placeName == null || this.placeName.trim() == "") {
      this.setState({
        addPlaceSuccess: false
      })
    }
    else {
      const placeData = {
        placeData: {
          placeName: this.placeName,
          placeComment: this.placeComment
        }
      };
      axios.post("/places", placeData).then(response => {
        if (this.props.location.pathname == '/campaigns/create') {
          axios.get("/places?sort_by=placeCreateDate&sort_order=desc&per_page=" + this.state.placesPerPage).then(response => {
            this.setState({
              allPlaces: response.data.data.items
            });
            this.placeName = null;
            this.placeComment = null;
            document.getElementById('inputNameForm').reset();
            document.getElementById('inputCommentForm').reset();
          })
        }
        else {
          let newPlaces = [...this.state.allPlaces];
          newPlaces.unshift(response.data.data);
          this.setState({
            allPlaces: newPlaces
          });
          this.placeName = null;
          this.placeComment = null;
          document.getElementById('inputNameForm').reset();
          document.getElementById('inputCommentForm').reset();

        }
      });
    }
  };

  closeAddPlaceError = () => {
    this.setState({
      addPlaceSuccess: true
    })
  }

  deletePlace = (event, id, arrayIndex) => {
    event.preventDefault();
    axios.delete("/places/" + id).then(response => {
      let notTouchedPlaces = [...this.state.allPlaces];
      notTouchedPlaces.splice(arrayIndex, 1);
      this.setState({
        allPlaces: notTouchedPlaces
      });
    });
  };

  showAllPlaces = () => {
    axios.get(this.state.paginator.links.next).then(response => {
      let oldPlaces = [...this.state.allPlaces];
      let newPlaces = response.data.data.items;
      let concatedPlaces = oldPlaces.concat(newPlaces);
      this.setState({
        allPlaces: concatedPlaces,
        paginator: response.data.data.paginator
      })
    })
  }

  timeout = null;

  searchHandler = (event) => {
    clearTimeout(this.timeout);
    let searchParam = event.target.value;
    if (this.props.location.pathname !== "/campaigns/create") {
      this.timeout = setTimeout(() => {
        axios.get(this.props.location.pathname + '/places/all?sort_by=campaignPlaceAssigned&sort_order=desc&per_page=' + this.state.placesPerPage + '&search=' + searchParam)
          .then(response => {
            this.setState({
              allPlaces: response.data.data.items,
              paginator: response.data.data.paginator
            })
          })
      }, 500)
    }
    else {
      this.timeout = setTimeout(() => {
        axios.get('/places?sort_by=placeCreateDate&sort_order=desc&per_page=' + this.state.placesPerPage + '&search=' + searchParam).then(response => {
          this.setState({
            allPlaces: response.data.data.items,
            paginator: response.data.data.paginator
          })
        })
      }, 500)
    }

  }

  deletePlaceAfterUnassign = (placeId) => {
    axios.get(this.props.location.pathname + "/places/all?sort_by=campaignPlaceAssigned&sort_order=desc&per_page=" + this.state.placesPerPage)
      .then(response => {
        this.setState({
          allPlaces: response.data.data.items,
          paginator: response.data.data.paginator
        }, () => {
          this.searcForm.reset()
        });
      });
  }



  render() {

    return (
      <Context.Consumer>
        {({ state, actions }) => {
          let slicedPlaces = this.state.allPlaces.length > 0 ? [...this.state.allPlaces] : [];
          let resultLine = slicedPlaces.map((item, index) => (
            <ResultLine
              key={item.placeId}
              id={item.placeId}
              index={index}
              ref={(node) => this.hiddenInput = node}
              showModalError={(error) => this.props.showModalError(error)}
              name={item.placeName ? item.placeName : 'Loading'}
              comment={item.placeComment ? item.placeComment : ''}
              mainPackagePlaces={state.campaignCreateData.campaignPlaces}
              qrUrl={item.links[1] !== undefined ? item.links[1].href : ''}
              isAssigned={item.campaignPlaceAssigned ? item.campaignPlaceAssigned : false}
              deletePlace={(event, id, arrayIndex) =>
                this.deletePlace(event, id, arrayIndex)
              }
              deletePlaceAfterUnassign={(placeId) => this.deletePlaceAfterUnassign(placeId)}
            />
          ))
          return (
              <div className="new-basic-data__places">
                <h4>Lista wybranych miejsc</h4>
                <div className="places-container">
                  <span>Przypisz miejsca do kampanii</span>
                  <form style={{ gridColumn: 'span 2' }} ref={(node) => this.searcForm = node}>
                    <input style={{ width: '100%' }} type="search" placeholder="Wpisz szukaną frazę" onKeyUp={this.searchHandler} />
                  </form>

                  <div className="places-name-header">Nazwa</div>
                  <div className="places-comment-header">Komentarz</div>


                  <form id="inputNameForm">
                    {this.state.addPlaceSuccess == false ? (
                      <div className="red-alert">
                        Nie możesz zapisać kampanii bez podania jej nazwy. To pole jest wymagane
                    <div id="triangle"></div>
                        <div className="cross" onClick={this.closeAddPlaceError}>
                          <div>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <input
                      className="places-input-name"
                      style={this.state.addPlaceSuccess == false ? { border: '1px solid red', outline: 'none' } : null}
                      type="text"
                      placeholder="Nazwa"
                      ref={(inputName) => { this.inputName = inputName }}
                      onChange={(event, name) =>
                        this.changePlaceNameComment(event, "name")
                      } />
                  </form>

                  <form id="inputCommentForm">
                    <div className="places-input-comment">
                      <input
                        type="text"
                        placeholder="Treść komentarza"
                        ref={(inputComment) => { this.inputComment = inputComment }}
                        onChange={(event, name) =>
                          this.changePlaceNameComment(event, "comment")
                        } />
                      <span onClick={this.addNewPlace} />
                    </div>
                  </form>

                  {this.props.location.pathname == '/campaigns/create' ?
                    <span style={{ gridColumn: 'span 2' }}>
                      Liczba przypisanych miejsc do danej kampanii: {state.campaignCreateData.campaignPlaces.length}
                    </span>
                    :
                    null
                  }

                  <div className="results">
                    {resultLine}
                  </div>
                  {this.state.paginator && this.state.paginator.links.next !== null ? (
                    <button
                      onClick={this.showAllPlaces}
                      className='places-pagination-button'
                      style={{
                        backgroundColor: "transparent",
                        color: "#1717f2",
                        border: "none",
                        gridColumn: "span 2",
                        marginTop: 30
                      }}
                    >
                      Pokaż kolejne 5 miejsc
                </button>
                  ) : null}

                </div>
              </div>
          )
        }
        }
      </Context.Consumer>
    );
  }
}

export default withRouter(Places);
