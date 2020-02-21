const { Router } = require("express");
const axios = require("axios");

const ReservationController = require("./controllers/ReservationController");

const routes = Router();

routes.get("/", (req, res) => res.json({ message: "Hello World!" }));
routes.post("/reservations", ReservationController.index);

module.exports = routes;
