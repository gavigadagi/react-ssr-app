import { FETCH_LAUNCH_DETAILS } from '../actions/index';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_LAUNCH_DETAILS:
      return action.payload;

    default:
      return state;
  }
};
