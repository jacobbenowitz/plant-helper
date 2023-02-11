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