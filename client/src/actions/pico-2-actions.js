import {
  getPico2Readings,
} from '../util/pico-2-util';

export const RECEIVE_PICO_2_READINGS = 'RECEIVE_PICO_2_READINGS';
export const REQUEST_PICO_2_READINGS = 'REQUEST_PICO_2_READINGS';

export const receivePico2Readings = (readings) => ({
  type: RECEIVE_PICO_2_READINGS,
  readings,
});

export const requestPico2Readings = () => ({
  type: REQUEST_PICO_2_READINGS,
});

export const fetchPico2Readings = () => (dispatch) => {
  dispatch(requestPico2Readings())
  return getPico2Readings().then((readings) =>
    dispatch(receivePico2Readings(readings)))
};