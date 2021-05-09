const app = require('./app');
const db = require('./db');
const PORT = process.env.PORT || 3000;
const seed = require('./seed');

const init = async () => {
  try {
    await db.sync({ force: true });
    await seed();
    app.listen(PORT, () => console.log(`APP IS LIVE AT PORT:${PORT}`));
  } catch (error) {
    console.log('issue with intializing');
    console.log(error);
  }
};

const server = init();
module.exports = server;
