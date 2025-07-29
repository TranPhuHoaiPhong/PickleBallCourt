const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const User = require('../models/PickleBallCourt/User');

const authMiddleWare = (req, res, next) => {
    let authorization = req.header('Authorization')

    if (!authorization ) {
        return res.status(401).json({
            status: "ERR",
            message: "Unauthorized access - No token provided"
        })}
    authorization = authorization.split(" ")[1];

    jwt.verify(authorization, process.env.JWT_ACCESS_SECRET, function(err, decoded) {
        if(err) {
            return res.status(401).json({
                status: "ERR",
                message: "Unauthorized access expired"
            });
        }
        const payload  = decoded;

        if(payload.isAdmin) {
            req.user = payload;
            next()
        }else {
            return res.status(403).json({
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






const authUserLogoutMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization; 
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: "ERR",
            message: "No token provided or token malformed",
        });
    }

    const token = authHeader.split(" ")[1]; // lấy phần sau 'Bearer '


    jwt.verify(token, process.env.JWT_ACCESS_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).json({
                status: "ERR",
                message: "Unauthorized - token expired or invalid",
            });
        }

        req.user = decoded;

        if (req.user?._id) {
            next();
        } else {
            return res.status(403).json({
                status: "ERR",
                message: "Unauthorized - insufficient privileges",
            });
        }
    });
};

const VerifyUser = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "ERR",
      message: "Unauthorized access - No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded._id);

    if(!user) {
        return res.status(403).json({
        status: "ERR",
        message: "Forbidden - User not found in database",
      });
    }
    
    req.user = user; // Có thể dùng ở middleware/controller sau này
    next();

  } catch (error) {
    return res.status(401).json({
        status: "ERR",
        message: "Unauthorized access - token expired or invalid",
    })
  }
};

module.exports = {
    authMiddleWare,
    authUserMiddleWare,
    authUserLogoutMiddleWare,
    VerifyUser
}