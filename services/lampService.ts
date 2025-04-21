import axios from 'axios';

const API_URL = 'YOUR_IOT_API_ENDPOINT';

interface LampControlParams {
  room: string;
  state: boolean;
}

export const controlLamp = async ({ room, state }: LampControlParams) => {
  try {
    const response = await axios.post(API_URL, {
      device: room,
      state: state ? 'on' : 'off'
    });
    return response.data;
  } catch (error) {
    console.error('IoT control error:', error);
    throw error;
  }
};