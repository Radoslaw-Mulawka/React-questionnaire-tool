import React from 'react';
import Main from './Main';
import Footer from './../components/Footer';
import {withRouter} from 'react-router-dom';

const ContentColumn = (props) => (
  <div className="content-column">
    <Main stateToDefault={props.stateToDefault} changeUserCredentials={props.changeUserCredentials}/>
    <Footer />
  </div>
)

export default withRouter(ContentColumn);
