import {
  getPico2Readings, pingPico2,
} from '../util/pico-2-util';

export const RECEIVE_PICO_2_READINGS = 'RECEIVE_PICO_2_READINGS';
export const REQUEST_PICO_2_READINGS = 'REQUEST_PICO_2_READINGS';
export const REQUEST_PICO_2_CURRENT = 'REQUEST_PICO_2_CURRENT';
export const RECEIVE_PICO_2_CURRENT = 'RECEIVE_PICO_2_CURRENT';

export const receivePico2Readings = (readings) => ({
  type: RECEIVE_PICO_2_READINGS,
  data: readings,
});

export const requestPico2Readings = () => ({
  type: REQUEST_PICO_2_READINGS,
  status: 'BUSY',
});

export const requestPico2Current = () => ({
  type: REQUEST_PICO_2_CURRENT,
  status: 'BUSY',
});

export const receivePico2Current = (current) => ({
  type: RECEIVE_PICO_2_CURRENT,
  data: current,
});

export const fetchPico2Readings = () => async (dispatch) => {
  dispatch(requestPico2Readings())
  const readings = await getPico2Readings();
  return dispatch(receivePico2Readings(readings));
};

export const fetchPico2Current = () => async (dispatch) => {
  dispatch(requestPico2Current())
  const currReadings = await pingPico2()
  return dispatch(receivePico2Current(currReadings));
};