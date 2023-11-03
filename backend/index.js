require('dotenv').config();
const server = require("./src/app");
const { conn } = require("./src/db");
const resError = require('./src/utils/resError');
const {
    PORT
  } = process.env;
  
server.get("/", (req, res) => {
    res.status(200).send("<h1>Server is running</h1>")
})
server.use((err, req, res, next) => {
    const { statusCode, message } = err;
    resError(res, statusCode, message);
});

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
    })
});
 