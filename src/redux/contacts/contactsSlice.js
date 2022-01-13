import { createSlice } from '@reduxjs/toolkit';
import { getContacts, addContact, deleteContact } from './contactsOperations';

const initialState = {
  data: {
    items: [],
    loading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    changeFilter: (state, { payload }) => ({ ...state, filter: payload }),
  },

  extraReducers: builder => {
    builder
      .addCase(getContacts.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        state.data.items = payload;
      })
      .addCase(getContacts.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })

      .addCase(addContact.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        state.data.items.push(payload);
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })

      .addCase(deleteContact.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        const idx = state.data.items.findIndex(
          contact => contact.id === payload,
        );
        state.data.items.splice(idx, 1);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      });
  },
});

export const { changeFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
