const app = require('./server.js');
const PORT = process.env.PORT || 4095;

const serverInstance = app.listen(PORT, () => {
  console.log(`Overview is listening at port http://localhost:${PORT}`)
});

const closeServer = () => {
  serverInstance.close();
}

exports.closeServer = closeServer;