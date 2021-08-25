import axios from 'axios';

const client = axios.create();

// default url
client.defaults.baseURL = '/';
// // header
// client.defaults.headers.common['Authorization'] = 'bearer a1b2c3d4';
// // intercepter
// axios.intercepter.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default client;
