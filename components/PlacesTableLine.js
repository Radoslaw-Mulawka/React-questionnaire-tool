import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class PlacesTableLine extends Component {
    

    render() {
        return (
            <tr>
                <td data-th="Nazwa"> {this.props.name}</td>
                <td data-th="Kampanie"> {this.props.campaign}</td>
                <td data-th="Akcje"><span> </span>
                    <Link to={`places/${this.props.id}`} aaa="AAAAAAAAA" className=" ">Edytuj</Link>
                    <form acceptCharset="UTF-8" className="delete-form">
                        <button onClick={(event) => { this.props.deletePlace(event, this.props.id, this.props.index) }}>Usuń miejsce</button>
                    </form>
                </td>
            </tr>
        )
    }
}

export default PlacesTableLine;