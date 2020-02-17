import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
    window.localStorage.setItem('access_token', token)
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken
