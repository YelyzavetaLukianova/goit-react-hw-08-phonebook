import './App.css';

import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Phonebook from './components/Phonebook/Phonebook';
import Loader from './components/Loader/Loader';
import * as authOperation from './redux/auth/authOperations';
import * as authSelectors from './redux/auth/authSelectors';
import Navigation from './components/Navigation/Navigation';

const SignInPage = lazy(() => import('./pages/singIn/SingInPage'));
const SignUpPage = lazy(() => import('./pages/singUp/SingUpPage'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperation.getUser());
  }, [dispatch]);

  const isLoadingUser = useSelector(authSelectors.getLoadingUser);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const userEmail = useSelector(authSelectors.getUserEmail);

  if (isLoadingUser) {
    return <Loader />;
  }
  return (
    <>
      <Navigation userEmail={userEmail ?? ''} />
      <Suspense fallback="Loading...">
        <Switch>
          {/* PUBLIC */}
          <Route path="/contacts">
            {isLoggedIn ? <Phonebook /> : <Redirect to="/login" />}
          </Route>
          {/* NOT AUTH */}
          <Route exact path="/register">
            {!isLoggedIn ? <SignUpPage /> : <Redirect to="/contacts" />}
          </Route>

          <Route exact path="/login">
            {!isLoggedIn ? <SignInPage /> : <Redirect to="/contacts" />}
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
