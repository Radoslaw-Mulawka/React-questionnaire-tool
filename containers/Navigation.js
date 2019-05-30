import React, {Component} from 'react';
import UserBlock from './../components/UserBlock';
import LinkElement from './../components/NavLink';


const Navigation = (props)=> (
    <nav>
        <UserBlock userCredentials={props.userCredentials} />
        <LinkElement id="dashboard" link="/home" dataContent="Dashboard" parentName="dashboard" linkInnerText="DASHBOARD"/>
        {/* <LinkElement id="results" link="/answers" dataContent="Wyniki" parentName="results" linkInnerText="WYNIKI"/> */}
        <LinkElement id="campaigns" link="/campaigns" dataContent="Kampanie" parentName="campaigns" linkInnerText="KAMPANIE"/>
        <LinkElement id="add-campaign" link="/campaigns/create" dataContent="Dodaj kampanię" parentName="add-campaign" linkInnerText="DODAJ KAMPANIĘ"/>
        {/* <LinkElement id="places" link="/places" dataContent="Miejsca" parentName="places" linkInnerText="MIEJSCA"/> */}
    </nav>  
);

export default Navigation;