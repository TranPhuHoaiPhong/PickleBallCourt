const User = require("../models/Pickleball/User")
const bcrypt = require("bcryptjs")
const { generateAccessToken, generateRefreshToken } = require("./JwtService")
const jwt = require('jsonwebtoken');


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

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser
}

