import React from 'react';
import { NavLink } from "react-router-dom";
import { Popup } from 'semantic-ui-react';

const LinkElement = (props) => {

    const classes = [];


    return (
        <Popup
            trigger={
                <NavLink exact
                    activeClassName="nav-item-active"
                    to={props.link}
                    id={`${props.id}-link`}
                >

                    <div className={`nav-item  ${props.parentName}-parent`}>
                        <div className={props.parentName}></div>
                        <div className="text-left nav-item-name" >{props.linkInnerText}</div>
                    </div>
                </NavLink>
            }
            content={props.dataContent}
            position='right center'
            on='hover'
            className="nav-tooltip" 
        />
    )
}

export default LinkElement;