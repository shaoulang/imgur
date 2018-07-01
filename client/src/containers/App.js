import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import TarzanVolunteer from './Tarzan/list';
import TarzanForm from './Tarzan/form';

class App extends Component {

  render() {
    return (
      <div className="container" style={{width: '90%'}}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/tarzan-conquer-the-jungle/register" component={TarzanForm} />
            <Route exact path="/volunteers-list/tarzan-conquer-the-jungle" component={TarzanVolunteer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);