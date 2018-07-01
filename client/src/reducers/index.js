import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import volunteerReducer from './volunteerReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
    volunteer       : volunteerReducer,
    form            : reduxForm,
    surveys         : surveysReducer
});