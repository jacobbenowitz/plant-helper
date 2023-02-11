import { configureStore, applyMiddleware, createStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/root-reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// export const store = configureStore({
//   reducer: rootReducer,
//   applyMiddleware: [thunk, logger],
// });

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);