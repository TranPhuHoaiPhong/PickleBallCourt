const UserRouter = require("./UserRoutes/UserRouter");


const routes = (app) => {
    app.use("/api/user", UserRouter);
};

module.exports = routes;