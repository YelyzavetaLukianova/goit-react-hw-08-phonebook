import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
const API_ENDPOINT = 'contacts';

const getContacts = createAsyncThunk('contacts/getContactStatus', async () => {
  const { data } = await api.getData(API_ENDPOINT);
  return data;
});

const addContact = createAsyncThunk(
  'contacts/addContactStatus',
  async newContact => {
    const { data } = await api.saveItem(API_ENDPOINT, newContact);
    return data;
  },
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContactStatus',
  async id => {
    await api.deleteItem(API_ENDPOINT, id);
    return id;
  },
);

export { getContacts, addContact, deleteContact };
