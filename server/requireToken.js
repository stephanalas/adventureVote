const { User } = require('./db/models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const user = await User.byToken(token);
      req.user = user;
      next();
    } catch (error) {
      console.log('Error in requireToken middleware', error);
    }
  } else res.sendStatus(401);
};
