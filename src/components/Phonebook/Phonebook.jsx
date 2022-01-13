import ContactForm from '../ContactForm/ContactForm';
// import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import {
  getContacts,
  addContact,
  deleteContact,
} from '../../redux/contacts/contactsOperations';

const Phonebook = () => {
  const contacts = useSelector(state => state.contacts.data.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const addNewContact = newContact => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
    );
    if (isDuplicate) {
      // return toast.error(`${newContact.name} is already in contacts`);
      return alert(`${newContact.name} is already in contacts`);
    }

    dispatch(addContact(newContact));
  };

  const handleDelete = idToDelete => {
    dispatch(deleteContact(idToDelete));
  };

  const getFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const filterContacts = getFilterContacts();

  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        <ContactForm addNewContact={addNewContact} />
        <h2>Contacts</h2>
        <Filter />
      </div>

      {filterContacts.length > 0 && (
        <ContactList
          filterContacts={filterContacts}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Phonebook;
