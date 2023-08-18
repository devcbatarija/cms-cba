require('dotenv').config();
const server = require("./src/app");
const { conn } = require("./src/db");
const {
    PORT
  } = process.env;
  
server.get("/", (req, res) => {
    res.status(200).send("<h1>Server is running</h1>")
})
server.use((req, res) => {
    res.status(404).send("<h1>404</h1>")
})

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running in port: http://localhost:${PORT}`);
    })
});
