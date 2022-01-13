import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import * as authOperations from '../../redux/auth/authOperations';
import * as authSelectors from '../../redux/auth/authSelectors';
import './singIn.css';

export const SignInPage = () => {
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
    const credentials = { email, password };
    dispatch(authOperations.signIn(credentials));
  };

  const isBtnDisabled = loading || !email || !password;

  return (
    <div>
      <div style={{ padding: 20 }}>
        <form className="sing__in__form" onSubmit={handleSubmit}>
          <label className="sing__in__label">
            Email
            <input
              className="sing__in__input"
              value={email}
              type="text"
              placeholder="email@mail.com"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label className="sing__in__label">
            Password
            <input
              className="sing__in__input"
              value={password}
              type="text"
              placeholder="qwerty1234"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <button
            className="sing__in__btn"
            type="submit"
            disabled={isBtnDisabled}
          >
            Sing in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
