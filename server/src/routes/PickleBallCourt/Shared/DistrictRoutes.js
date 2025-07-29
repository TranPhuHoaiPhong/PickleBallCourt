const express = require("express");
const routes = express.Router();
const DistrictControllers = require("../../../controllers/PickleBallCourt/DistrictControllers");
const { authMiddleWare } = require("../../../middleware/authMiddleWare");

routes.get("/districts", DistrictControllers.getDistrict);

routes.post("/districts", DistrictControllers.createDistrict); //authMiddleWare, xử lý frontend

module.exports = routes;
