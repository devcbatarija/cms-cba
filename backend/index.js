require('dotenv').config();
const server = require("./src/app");
const { conn } = require("./src/db");
const resError = require('./src/utils/resError');
const { createServer } = require('http'); //vanilla node
const { initSocketIo } = require('./src/webSocket/webSockets');
const { sendNotification } = require('./src/services/expoNotificationsConfig');
const { Server } = require('socket.io');
const { PORT } = process.env;


server.get("/", (req, res) => {
    res.status(200).send("<h1>Server is running</h1>");
});

// Middleware para manejo de errores
server.use((err, req, res, next) => {
    const { statusCode, message } = err;
    resError(res, statusCode, message);
});

// Crear el servidor HTTP con Express
const serverHttp = createServer(server);
const io = initSocketIo(serverHttp);

conn.sync({ force: false }).then(() => {
    serverHttp.listen(PORT, async () => {
        console.log(`SERVER IS RUNNING on port ${PORT}`);
    });
})
