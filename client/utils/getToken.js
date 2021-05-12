export default () => {
  const authtoken = window.localStorage.getItem('token');
  if (!authtoken) {
    const error = new Error('Unauthorized');
    throw error;
  }
  const payload = {
    headers: {
      authorization: authtoken,
    },
  };
  return payload;
};
