import axios from 'axios';

const API_URL = 'https://gst-verification-api-get-profile-returns-data.p.rapidapi.com/v1/gstin';
const API_KEY = '6e5af72813msh61ccab474951c38p1c6adbjsn9c163d0f878c'; // 🔐 Replace with your actual key

export const verifyGST = async (gstin) => {
  try {
    const response = await axios.get(`${API_URL}/${gstin}/details`, {
      headers: {
        'x-rapidapi-host': 'gst-verification-api-get-profile-returns-data.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error verifying GST:', error.response?.data || error.message);
    throw error;
  }
};
