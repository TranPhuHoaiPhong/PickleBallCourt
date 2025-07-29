const express = require("express");
const routes = express.Router();
const SharedControllers = require("../../../controllers/PickleBallCourt/SharedControllers");

routes.get("/top-court", SharedControllers.getTopCourt);

module.exports = routes;