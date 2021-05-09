const app = require('./app');
const db = require('./db');
const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    await db.sync({ force: true });
    app.listen(PORT, () => console.log(`APP IS LIVE AT PORT:${PORT}`));
  } catch (error) {
    console.log('issue with intializing');
  }
};

const server = init();
module.exports = server;
