const UserService = require('../services/UserService');

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
    return res.status(200).json(result);

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

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser
};
