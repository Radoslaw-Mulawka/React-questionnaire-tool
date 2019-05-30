import React, { Component } from 'react';
import LogoBlock from './../components/LogoBlock';
import Navigation from './Navigation';
import Arrow from './../components/Arrow';



const NavigationColumn = (props) => (
    <div className="navigation-column-visible">
        <LogoBlock />
        <Navigation userCredentials={props.userCredentials} />
        <Arrow />
    </div>
);



export default NavigationColumn;