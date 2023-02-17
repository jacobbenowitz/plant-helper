import { combineReducers } from 'redux';

import pico2Reducer from './pico-2-reducer';

const rootReducer = combineReducers({
  pico2: pico2Reducer,
});

export default rootReducer;