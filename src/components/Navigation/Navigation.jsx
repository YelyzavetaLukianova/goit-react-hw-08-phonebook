import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu';
import * as authSelectors from '../../redux/auth/authSelectors';
import { signOut } from '../../redux/auth/authOperations';

import {
  HiOutlineUserAdd,
  HiOutlineLogin,
  HiOutlineHome,
} from 'react-icons/hi';
import './navigation.css';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const userEmail = useSelector(authSelectors.getUserEmail);
  const dispatch = useDispatch();

  const handleSignOut = () => dispatch(signOut());

  return (
    <nav className="nav__wrap">
      <NavLink to={'/contacts'} className="nav__link" activeClassName="active">
        <HiOutlineHome size="15px" />
        Home
      </NavLink>
      {!isLoggedIn && (
        <>
          <div className="nav__div">
            <div>
              <NavLink
                to={'/login'}
                className="nav__link"
                activeClassName="active"
              >
                <HiOutlineLogin size="15px" />
                Sing In
              </NavLink>
            </div>
            <div>
              <NavLink
                to={'/register'}
                className="nav__link"
                activeClassName="active"
              >
                <HiOutlineUserAdd size="15px" />
                Sing Up
              </NavLink>
            </div>
          </div>
        </>
      )}

      {isLoggedIn && (
        <UserMenu handleSignOut={handleSignOut} userEmail={userEmail ?? ''} />
      )}
    </nav>
  );
};

export default Navigation;
