import axios from 'axios';

export const getPico2Readings = async () => {
  try {
    const response = await axios.get('/api/readings/pico-2');
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
}

export const pingPico2 = async () => {
  try {
    const response = await axios.get('/api/pico-2/ping');
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
}