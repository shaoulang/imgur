import React, { Component }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class TarzanForm extends Component {

    componentWillMount() {
        document.title = 'Tarzan - Conquer the Jungle Volunteer Register';
    }    
    render() {
    
    return (
        <div>
        </div>
    );
    }
};

export default connect(null, actions)(TarzanForm);

