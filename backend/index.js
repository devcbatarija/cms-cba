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
//model to update
server.use((err, req, res, next) => {
    const { statusCode, message } = err;
    console.log('Muestrame el error ',statusCode,message); 
    resError(res, statusCode, message);
});

conn.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
        console.log('SERVER IS RUNNING')
    })
});
 