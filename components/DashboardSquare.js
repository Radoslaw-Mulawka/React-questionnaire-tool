import React, { Component } from 'react';
import {Link} from "react-router-dom";

class DashboardSquare extends Component {

    render() {
        return (
            <div className="col-lg-4 col-md-6 col-sm-12 bigblock">
                <div className="block row">
                    <div className="col-lg-12 col-md-12 circle" align="center">
                        <div className={`huge huge${this.props.squareNumber}`}>
                            <img src={this.props.iconPath} alt={this.props.imgAlt} className="img-responsive dashicons"/>
                            <span>{this.props.data}</span>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 under-text" align="center">
                        <div>{this.props.squareText}</div>
                        {this.props.buttonExists ? (
                            <Link to={this.props.linkPath}>
                                <span>{this.props.buttonText}</span>
                                <div className="clearfix"></div>
                            </Link>
                        ) : null}
                        
                    </div>    
                 </div>
            </div>
        );
    }
}

export default DashboardSquare
