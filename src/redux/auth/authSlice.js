import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, getUser, signOut } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  loading: false,
  loadingUser: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(signIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getUser.pending, state => {
        state.error = null;
        state.loadingUser = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loadingUser = false;
        state.user.email = payload.email;
        state.user.name = payload.name;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingUser = false;
        state.token = null;
      })
      .addCase(signOut.pending, state => {
        state.error = null;
        state.loadingUser = true;
      })
      .addCase(signOut.fulfilled, (state, { payload }) => {
        state.loadingUser = false;
        state.token = null;
        // state.user.email = payload.email;
        // state.user.password = payload.password;
        // state.user.name = payload.name;
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        // state.error = payload;
        state.loadingUser = false;
      });
  },
});

export default authSlice.reducer;
