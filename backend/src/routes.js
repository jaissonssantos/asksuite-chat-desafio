const { Router } = require("express");
const axios = require("axios");

// const Dev = require("./models/Dev");

const ReservationController = require("./controllers/ReservationController");

// const DevController = require("./controllers/DevController");
// const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/", (req, res) => res.json({ message: "Hello World!" }));
routes.post("/reservations", ReservationController.index);
// routes.get("/devs", DevController.index);
// routes.post("/devs", DevController.store);

// routes.get("/search", SearchController.index);

module.exports = routes;