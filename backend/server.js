const http = require("http")
const app = require("./app")
require("dotenv").config()
/*Initialisation du serveur http*/
const port = process.env.PORT
app.set("port", port)

const server = http.createServer(app)
server.listen(port, () => console.info(`Backend démarré sur l'adresse http://localhost:${port}`))
