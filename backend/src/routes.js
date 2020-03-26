const express = require("express")

const OngController = require("./controllers/OngController")
const IncidentController = require("./controllers/IncidentController")
const SessionController = require("./controllers/SessionController")

const routes = express.Router()

routes.post("/sessions", SessionController.create)

routes.post("/ongs", OngController.create)
routes.get("/ongs", OngController.index)

routes.post("/incident", IncidentController.create)
routes.get("/ongs/:id/incidents", IncidentController.show)
routes.get("/incident", IncidentController.index)
routes.delete("/incident/:id", IncidentController.delete)

module.exports = routes