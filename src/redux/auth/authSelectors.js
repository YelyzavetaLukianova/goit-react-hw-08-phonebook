const getUserName = state => state.auth.user.name;
const getIsLoggedIn = state => !!state.auth.token;
const getToken = state => state.auth.token;
const getLoading = state => state.auth.loading;
const getLoadingUser = state => state.auth.loadingUser;
const getError = state => state.auth.error;
const getUserEmail = state => state.auth.user.email;

export {
  getUserName,
  getIsLoggedIn,
  getToken,
  getLoading,
  getLoadingUser,
  getError,
  getUserEmail,
};
