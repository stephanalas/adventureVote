const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`APP IS LIVE AT PORT:${PORT}`));

module.exports = app;
