import React, { Component } from 'react';
import GlobalContainer from './../containers/GlobalContainer';
import Settings from './Settings';
import axios from 'axios';
import {Redirect} from 'react-router-dom';



class PlaceCreate extends React.Component {

    state = {
        checkPlaceName: false,
        editShowInput: false,
        editShowComment: false,
        placeData: {
            placeName: null,
            placeComment: null
        }
    }


    pathNameLast = window.location.pathname.slice(
        window.location.pathname.lastIndexOf("/")
    );

    componentDidMount() {

        // check if it's preview or edit view

        if (this.pathNameLast !== "/create") {
            axios.get("" + window.location.pathname).then(response => {
                this.setState({
                    placeName: response.data.data.placeName,
                    placeComment: response.data.data.placeComment,
                });
            }).catch(error => {
                this.props.history.push('/places')
            })
        }
    }


    placeName;
    placeComment;


    // change place name and comments

    changePlaceNameComment = (event, type) => {
        if (type == "name") {
            this.placeName = event.target.value;
            this.checkPlaceName = false;
        } else if ((type = "comment")) {
            this.placeComment = event.target.value;
        }
    };

    // add new place

    addNewPlace = () => {
        const placeData = {
            placeData: {
                placeName: this.placeName,
                placeComment: this.placeComment
            }
        };
        axios.post("/places", placeData).then(()=>{
            this.setState({
                checkPlaceName: false,
            })
            // window.location.href="/places";
            this.props.history.push('/places')
        }).catch(error => {
            console.log(error);
            if(error.response.data.status_code === 422){
                this.setState({
                    checkPlaceName: true,
                })
            }
        });
    };

    render() {

        // save edited place

        const sendDataAfterEdit = (event) => {
            const newData = {
                "placeData":{
                    placeName: this.state.placeName,
                }
            };
            axios.put("" + window.location.pathname, newData) .then(response => {
                this.setState({
                    checkPlaceName: false,
                    editShowInput: false,
                    editShowComment: false,
                })
            }).catch(error => {
                console.log(error);
                if(error.response.data.status_code === 422){
                    this.setState({
                        checkPlaceName: true,
                    })
                }
            });
        }

        // set new place name

        const setNewPlaceName = (e) => {
            this.setState({
                placeName: e.target.value,
                checkPlaceName: false,
            })
        }

        // set new place comment

        const setNewPlaceComment = (e) => {
            this.setState({
                placeComment: e.target.value
            })
        }

        // show alert

        const showInputEditStyles = {
            'display': this.state.editShowInput ?  'inline-block' : 'none',
            'border': this.state.checkPlaceName ? '1px solid red' : null,
        }

        // back to list of places

        const comeback = (e) => {
            this.props.history.push('/places')
        }

        // close required alert

        const closeError = (e) => {
            this.setState({
                checkPlaceName: false,
            })
        }

        return (
            <GlobalContainer>
                {this.pathNameLast !== "/create" ?
                    (
                        <Settings editModeText="EDYTUJ" pageName="MIEJSCA" />
                    ) :
                    (
                        <Settings editModeText="DODAJ NOWE" pageName="MIEJSCA" />
                    )}
                <div className="form-wrap">
                    <div className="basic-data">
                        <div className="form-flex-wrap" style={{alignItems:'center'}}>
                            <div className="desc-wrap required">
                                <label htmlFor="Nazwa">Nazwa</label>  <br />
                                <small>Treść wprowadzana w tym polu zostanie wyświetlana na etykiecie z kodem QR, oraz na widoku ankiety.</small>
                            </div>
                            {this.pathNameLast === '/create' ?
                                (
                                    <input className="Place-input" style={this.state.checkPlaceName == true ? { border: '1px solid red'} : null}  placeholder="Nazwa"  type="text" onChange={(event,type)=>this.changePlaceNameComment(event,'name')}/>
                                ) :
                                (
                                    <div className="Edit-container">
                                        <span style={this.state.editShowInput == true ? {display: 'none'} : {display: 'inline-block'}} className="name-span hidden-span">{this.state.placeName}</span>
                                        <img src="/assets/img/icons/pensil.png" onClick={(event) => { this.setState({ editShowInput: true }) }}  style={this.state.editShowInput == true ? {display: 'none'} : {display: 'inline-block'}} className="icon-place edit-icon"/>
                                        <input className="Place-input longer-input" style={showInputEditStyles}  placeholder="Nazwa" value={this.state.placeName} onChange={setNewPlaceName}  type="text"/>
                                        <img src="/assets/img/icons/disquette.png" onClick={sendDataAfterEdit} style={this.state.editShowInput == true ? {display: 'inline-block '} : {display: 'none'}}  className="icon-profile save-icon"/>
                                    </div>

                                )}
                        </div>
                        <div className="required-alert" style={this.state.checkPlaceName == false ? {display: 'none'} : {display: 'block'}}>
                            To pole jest wymagane
                            <div id="triangle"></div>
                            <div className="cross" onClick={closeError}>
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div className="form-flex-wrap">
                            <div className="desc-wrap">
                                <label htmlFor="Komentarz">Komentarz</label> <br />
                                <small>Treść wprowadzana w tym polu nie będzie wyświetlana. Wprowadzasz tutaj pomocnicze informacje dla siebie.</small>
                            </div>
                            {this.pathNameLast === '/create' ?
                                (
                                    <textarea className="Place-input" placeholder="Komentarz" name="comment" cols="50" rows="10" onChange={(event,type)=>this.changePlaceNameComment(event,'comment')}></textarea>
                                ) :
                                (
                                    <div className="Edit-container">
                                        <span style={this.state.editShowComment == true ? {display: 'none'} : {display: 'inline-block'}} className="name-span hidden-span">{this.state.placeComment}</span>
                                        <img src="/assets/img/icons/pensil.png" onClick={(event) => { this.setState({ editShowComment: true }) }}  style={this.state.editShowComment == true ? {display: 'none'} : {display: 'inline-block'}} className="icon-place edit-icon"/>
                                        <textarea className="Place-input longer-input" style={this.state.editShowComment == false ? {display: 'none'} : {display: 'inline-block'}} onChange={setNewPlaceName} value={this.state.placeComment} placeholder="Komentarz" name="comment" cols="50" rows="10" onChange={setNewPlaceComment}></textarea>
                                        <img src="/assets/img/icons/disquette.png" onClick={sendDataAfterEdit} style={this.state.editShowComment == true ? {display: 'inline-block '} : {display: 'none'}}  className="icon-place comment-icon"/>
                                    </div>
                                )}
                        </div>
                        <div className="save">
                            {this.pathNameLast === '/create' ?
                                (
                                    <button onClick={this.addNewPlace}>Dodaj miejsce</button>
                                ) :
                                (
                                    <button onClick={comeback}>Wróć do listy miejsc</button>
                                )}
                        </div>
                    </div>
                </div>
            </GlobalContainer>
        )
    }
}




export default PlaceCreate;