import axios from 'axios';

export const FETCH_LAUNCH_DETAILS = 'FETCH_LAUNCH_DETAILS';

export const fetchSpaceXLaunches = (year, successfulLaunch, successfulLand) => async (dispatch) => {
  const url = 'https://api.spaceXdata.com/v3/launches';
  let param = {
    limit: 100,
  };
  if (year !== '') {
    param = {
      ...param,
      launch_year: year,
    };
  }
  if (successfulLaunch !== '') {
    param = {
      ...param,
      launch_success: successfulLaunch,
    };
  }
  if (successfulLand !== '') {
    param = {
      ...param,
      land_success: successfulLand,
    };
  }
  const res = await axios(url, { params: param });
  dispatch({
    type: FETCH_LAUNCH_DETAILS,
    payload: res.data,
  });
};
