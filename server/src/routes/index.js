const UserRouter = require("./PickleBallCourt/UserRoutes/UserRouter");
const CourtRouter = require("./PickleBallCourt/CourtRoutes/CourtRoutes")
const CourtLocationRouter = require("./PickleBallCourt/CourtLocation/CourtLocation")
const BookingCourt = require("./PickleBallCourt/BookingCourt/BookingCourt")

const routes = (app) => {
    app.use("/api/user", UserRouter);
    app.use("/api/location", CourtLocationRouter);
    app.use("/api/court", CourtRouter);
    app.use("/api/book-court", BookingCourt);
};

module.exports = routes;