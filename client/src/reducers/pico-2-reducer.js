import {
  RECEIVE_PICO_2_READINGS
} from '../actions/pico-2-actions';

const BUSY = 'BUSY';
const IDLE = 'IDLE';
const DONE = 'DONE';

const initState = {
  status: IDLE,
  readings: [],
}

const pico2Reducer = (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_PICO_2_READINGS:
      return {
        ...state,
        status: DONE,
        readings: action.readings,
      };
    default:
      return state;
  }
}

export default pico2Reducer;