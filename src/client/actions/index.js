import axios from 'axios';

export const FETCH_LAUNCH_DETAILS = 'FETCH_LAUNCH_DETAILS';

export const fetchSpaceXLaunches = (year, successfulLaunch, successfulLand) => async (dispatch) => {
  const url = 'https://api.spaceXdata.com/v3/launches';
  const param = {};
  param.limit = 100;
  const res = await axios(url, { params: param });
  dispatch({
    type: FETCH_LAUNCH_DETAILS,
    payload: res.data,
  });
};
