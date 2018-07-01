import axios from 'axios';
import qs from 'qs';

import { FETCH_USER } from './types';

export const fetchUser = (params) => async dispatch => {
  const paramsString = qs.stringify(params , { encode: false });

  await axios.get(`../api/volunteers?${paramsString}`)
    .then(function (res) {
      console.log(res);
      dispatch({ type: FETCH_USER, payload: res.data });
    })
    .catch(function (error) {
      console.log(error);
      dispatch({ type: '', payload: error });
    });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};