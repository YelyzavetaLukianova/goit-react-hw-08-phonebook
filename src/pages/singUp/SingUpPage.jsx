import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './singUp.css';

import * as authOperations from '../../redux/auth/authOperations';
import * as authSelectors from '../../redux/auth/authSelectors';

export const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(authSelectors.getLoading);
  const error = useSelector(authSelectors.getError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    const credentials = { name, email, password };
    dispatch(authOperations.signUp(credentials));
  };

  const isBtnDisabled = loading || !name || !email || !password;

  return (
    <div>
      <div style={{ padding: 20 }}>
        <form className="sing__up__form" onSubmit={handleSubmit}>
          <label className="sing__up__label">
            Name
            <input
              className="sing__up__input"
              value={name}
              type="text"
              placeholder="John Doe"
              required
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label className="sing__up__label">
            Email
            <input
              className="sing__up__input"
              value={email}
              type="text"
              placeholder="email@mail.com"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label className="sing__up__label">
            Password
            <input
              className="sing__up__input"
              value={password}
              type="text"
              placeholder="qwerty1234"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <button
            className="sing__up__btn"
            type="submit"
            disabled={isBtnDisabled}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
