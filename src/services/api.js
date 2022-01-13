import axios from 'axios';

const API_ENDPOINT = 'contacts';

// const fetchData = async (API_ENDPOINT, options = {}) => {
//   const res = await fetch(`${BASE_URL}/${API_ENDPOINT}`, options);
//   return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
// };

const getData = (endpoint, options) => axios.get(endpoint);

const saveItem = (endpoint, item, options = {}) => {
  return axios.post(endpoint, item);
};

const deleteItem = (endpoint, id, options = {}) =>
  axios.delete(`${endpoint}/${id}`);

export { getData, saveItem, deleteItem, API_ENDPOINT };
