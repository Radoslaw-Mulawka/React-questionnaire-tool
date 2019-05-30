import React from 'react';
import { Link } from 'react-router-dom';


const Settings = (props) => {
    let header = "";
    let greyStyle = {
        color: '#676880'
    };
    if(props.editModeText){
        header = (
           <h2>
               <span style={greyStyle}> {props.pageName} </span> 
               <span className='places-arrow'> > </span> 
               <span>{props.editModeText}</span>
            </h2>
        )
    }
    else {
        header = (
            <h2>
                {props.pageName}
            </h2>
        )
    }
    return (
        <div className="settings">
            {header}
            {props.editable ? (
                <Link to={props.linkTo}>
                    <div className="add-new-btn">
                        {props.buttonText}
                    </div>
                </Link>
            ) : null}

        </div>
    )
}

export default Settings;