import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    const body = { ...credentials };
    try {
      const { data } = await axios.post(`/users/signup`, body);
      // console.log(data);
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    const body = { ...credentials };
    try {
      const { data } = await axios.post(`/users/login`, body);
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const signOut = createAsyncThunk('/users/logout', async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {}
});

const getUser = createAsyncThunk('auth/getUser', async (_, thunkApi) => {
  const persistedToken = thunkApi.getState().auth.token;

  if (!persistedToken) {
    return thunkApi.rejectWithValue();
  }
  token.set(persistedToken);

  try {
    const { data } = await axios.get(`/users/current`);
    return data;
  } catch (error) {
    token.unset();
    const errMsg = error.response.data;
    return thunkApi.rejectWithValue(errMsg);
  }
});

export { signUp, signIn, getUser, signOut };
