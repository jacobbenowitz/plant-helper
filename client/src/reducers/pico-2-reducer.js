import {
  RECEIVE_PICO_2_CURRENT,
  RECEIVE_PICO_2_READINGS,
  REQUEST_PICO_2_CURRENT,
  REQUEST_PICO_2_READINGS
} from '../actions/pico-2-actions';

const BUSY = 'BUSY';
const IDLE = 'IDLE';
const DONE = 'DONE';

const initState = {
  status: IDLE,
  readings: [],
  current: {},
}

const pico2Reducer = (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_PICO_2_READINGS:
      return {
        ...state,
        status: DONE,
        readings: action.data,
      };
    case REQUEST_PICO_2_READINGS:
      return {
        ...state,
        status: BUSY,
      }
    case REQUEST_PICO_2_CURRENT:
      return {
        ...state,
        status: BUSY,
      }
    case RECEIVE_PICO_2_CURRENT:
      return {
        ...state,
        status: DONE,
        current: action.data,
      }
    default:
      return state;
  }
}

export default pico2Reducer;