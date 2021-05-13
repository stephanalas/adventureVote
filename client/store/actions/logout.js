export const LOGOUT = 'LOGOUT';

export const _logout = () => {
  return {
    type: LOGOUT,
  };
};

export default () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(_logout());
};
