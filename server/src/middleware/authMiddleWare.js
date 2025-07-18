const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).json({
            status: "ERR",
            message: "Unauthorized access - No token provided"
        })}
    const token = req.headers.token.split(" ")[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, function(err, decoded) {
        if(err) {
            return res.status(404).json({
                status: "ERR",
                message: "Unauthorized access expired"
            });
        }
        const payload  = decoded;

        if(payload.isAdmin) {
            next()
        }else {
            return res.status(404).json({
                status: "ERR",
                message: "Unauthorized access - Not an admin"
            });
        }

    }
)
}

const authUserMiddleWare = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).json({
            status: "ERR",
            message: "Unauthorized access - No token provided"
        })}
    const token = req.headers.token.split(" ")[1];
    const userId = req.params.id;

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, function(err, decoded) {
        if(err) {
            return res.status(404).json({
                status: "ERR",
                message: "Unauthorized access expired"
            });
        }
        const payload  = decoded;

        if(payload?.isAdmin || payload?._id == userId) {
            next()
        }else {
            return res.status(404).json({
                status: "ERR",
                message: "Unauthorized access - Not an admin"
            });
        }

    }
)
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}