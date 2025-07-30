const UserRouter = require("./PickleBallCourt/UserRoutes/UserRouter");
const CourtRouter = require("./PickleBallCourt/CourtRoutes/CourtRoutes");
const CourtLocationRouter = require("./PickleBallCourt/CourtLocation/CourtLocation");
const BookingCourt = require("./PickleBallCourt/BookingCourt/BookingCourt");
const DistrictRoutes = require("../routes/PickleBallCourt/Shared/DistrictRoutes");
const SharedRoutes = require("../routes/PickleBallCourt/Shared/SharedRoutes");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/location", CourtLocationRouter);
  app.use("/api/court", CourtRouter);
  app.use("/api/book-court", BookingCourt);

  app.use("/api/shared/location", DistrictRoutes);
  app.use("/api/shared/court", SharedRoutes)
};

module.exports = routes;
