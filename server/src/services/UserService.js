const User = require("../models/Pickleball/User")
const bcrypt = require("bcryptjs")
const { generateAccessToken, generateRefreshToken } = require("./JwtService")
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { setCode, getCode } = require("../itls/verifyCache")

const createUser = (newUser) => {
    return new Promise( async(resolve, reject) => {
        const { name, email, password, phone } = newUser
        try {
            const checkEmail = await User.findOne({
                email: email
            })

            if (checkEmail !== null) { 
                return resolve({
                    status: "ERR",
                    message: "Email already exists"
                })
            }
            const hashPassword = bcrypt.hashSync(password, 10)

            const createdUser = await User.create({
                name,
                email,
                password: hashPassword,
                phone,
            })

            if(createdUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser
                })
                
            }
        } catch (error) {
            reject(error);
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise( async(resolve, reject) => {
        const {  email, password } = userLogin
        try {
            const checkEmail = await User.findOne({
                email: email
            })

            if (checkEmail === null) { 
                return resolve({
                    status: "ERR",
                    message: "User is not defined"
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkEmail.password)
            if (!comparePassword) {
                return resolve({
                    status: "ERR",
                    message: "Password is not correct"
                })
            }
            payload = {
                _id: checkEmail._id,
                isAdmin: checkEmail.isAdmin,
            }

            const access_token = await generateAccessToken(payload)
            const refresh_token = await generateRefreshToken(payload);
            if(comparePassword){
                return resolve({
                    status: "OK",
                    message: "Login successful",
                    ACCESSTOKEN: access_token,
                    REFRESHTOKEN: refresh_token,
                })
            }

            

            
        } catch (error) {
            reject(error);
        }
    })
}

const updateUser = (id, data) => {
    return new Promise( async(resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            
            if (checkUser === null) {
                return resolve({
                    status: "ERR",
                    message: "User not found"
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
            
            return resolve({
                status: "OK",
                message: "Updaated successfully",
                data: updatedUser
            })

            

            
        } catch (error) {
            reject(error);
        }
    })
}

const deleteUser = (id) => {
    return new Promise( async(resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            
            if (checkUser === null) {
                return resolve({
                    status: "ERR",
                    message: "User not found"
                })
            }

            const deletedUser = await User.findByIdAndDelete(id, {new: true})
            
            return resolve({
                status: "OK",
                message: "Deleted successfully"
            })

            

            
        } catch (error) {
            reject(error);
        }
    })
}

const getAllUser = () => {
    return new Promise( async(resolve, reject) => {
        try {
            const allUser = await User.find()
            
            return resolve({
                status: "OK",
                message: "Get all users successfully",
                data: allUser
            })           
        } catch (error) {
            reject(error);
        }
    })
}

const getDetail = (id) => {
    return new Promise( async(resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            
            if (checkUser === null) {
                return resolve({
                    status: "ERR",
                    message: "User not found"
                })
            }
            return resolve({
                status: "OK",
                message: "SUCCESS",
                data: checkUser
            })
            
        } catch (error) {
            reject(error);
        }
    })
}

const verifyUser = (email) => {
    return new Promise( async(resolve, reject) => {
        
        try {
           const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,      // email bạn dùng để gửi
                pass: process.env.GMAIL_PASS   // mật khẩu ứng dụng (App password)
            }
            });

            const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Mã xác minh của bạn',
            text: `Mã xác minh của bạn là: ${verificationCode}`
            };

            const res = await transporter.sendMail(mailOptions);

            setCode(email, verificationCode)


            return resolve({
                status: "OK",
                message: "SENT TO THE GMAIL SUCCESSFULLY"
            })
        } catch (error) {
            reject(error);
        }
    })
}

const verifyCode = (verifyCode, email) => {
    const savedverifyCode = getCode(email);
    if (!savedverifyCode) {
        return {
        status: "ERROR",
        code: 200,
        message: "Mã xác minh không tồn tại hoặc đã hết hạn"
        };
    }
    if(savedverifyCode !== verifyCode) {
        return {
        status: "ERROR",
        code: 200,
        message: "Mã xác minh không đúng"
        };
    }
    return {
        status: "SUCCESS",
        code: 200,
        message: "Xác minh thành công"
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetail,
    verifyUser,
    verifyCode
}

