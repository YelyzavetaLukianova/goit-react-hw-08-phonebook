import PropTypes from 'prop-types';
import { HiOutlineLogout } from 'react-icons/hi';
import './userMenu.css';

// import { authOperations } from 'redux/auth';

const UserMenu = ({ userEmail, handleSignOut }) => {
  return (
    <>
      <div>
        <p>{userEmail}</p>
        <span className="user__span nav__link" onClick={handleSignOut}>
          <HiOutlineLogout color="#ff6b0a" size="15px" />
          Sing out
        </span>
      </div>
    </>
  );
};

UserMenu.propTypes = {
  userEmail: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

export default UserMenu;
