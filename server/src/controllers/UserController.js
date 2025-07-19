const UserService = require('../services/UserService');
const JWT = require("../services/JwtService")


const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const checkEmail = reg.test(email);
    if (!name || !email || !password || !phone) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required"
      })
    }
    if (!checkEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Email is not valid"
      })
    }
    const result = await UserService.createUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "Email and password are required"
      });
    }
    const result = await UserService.loginUser(req.body);
    const {REFRESHTOKEN, ...new_response} = result;
    
    res.cookie("refresh_token", REFRESHTOKEN, {
      httpOnly: true,
      Secure: true
    })
    return res.status(200).json(new_response);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error logging in",
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "User ID is required"
      });
      
    }
    const result = await UserService.updateUser(userId, data);
    return res.status(200).json(result);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating user",
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "User ID is required"
      });
      
    }
    const result = await UserService.deleteUser(userId);
    return res.status(200).json(result);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting user",
    });
  }
}

const getAllUser = async (req, res) => {
  try {
    const result = await UserService.getAllUser();
    return res.status(200).json(result);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error get all user",
    });
  }
}

const getDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "User ID is required"
      });
      
    }
    const result = await UserService.getDetail(userId);
    return res.status(200).json(result);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error get all user",
    });
  }
}

const getRefreshToken = async (req, res) => {
  try {
   if (!req.cookies.refresh_token) {
        return res.status(404).json({
            status: "ERR",
            message: "Unauthorized access - No token provided"
        })}
    const token = req.cookies.refresh_token

    const result = await JWT.handleRefreshToken(token)
    return res.status(200).json(result);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error get all user",
    });
  }
}

const verifyUser = async (req, res) => {
  try {
    if (!req.body?.email) {
      return res.status(200).json({
        status: "ERR",
        message: "The gmail is required"
      });
    }
    const { email } = req.body;
    
    const result = await UserService.verifyUser(email);
    return res.status(200).json(result);


  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      status: "ERR",
      message: "Internal server error while sending verification code",
    });
  }
};

const verifyCode = async (req, res) => {
  try {
    if (!req.body?.verifyCode || !req.body?.email) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required"
      });
    }
    const { verifyCode, email } = req.body;
    
    const result = await UserService.verifyCode(verifyCode, email);
    return res.status(result.code).json({
      status: result.status,
      message: result.message
    });


  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      status: "ERR",
      message: "Internal server error while sending verification code",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetail,
  getRefreshToken,
  verifyUser,
  verifyCode
};
