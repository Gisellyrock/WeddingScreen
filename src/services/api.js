import { create } from 'apisauce';

const api = create({
  baseURL:
    process.env.REACT_APP_IP_BACKEND + ':' + process.env.REACT_APP_PORT_BACKEND,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

// api.addResponseTransform((response) => {});

// api.addAsyncRequestTransform((request) => async () => {
//   request.headers['Authorization'] = `bearer`;
// });

export default api;
