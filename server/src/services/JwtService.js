const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateAccessToken = (payload) => {
    return jwt.sign(
        payload, // Bọc payload cho dễ hiểu thôi, bên auth verify token sẽ phải decoded.payload.
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '120s' }
    );
}

const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '365d' }
    );
}

const handleRefreshToken = async (refreshToken) => {
    try {
        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const access_token = generateAccessToken({ // nếu bọc thêm payload thì bên này cũng phải user.payload?._id.
            id: user._id,
            isAdmin: user.isAdmin,
            // isSeller: user.isSeller,
        });

        return {
            status: "OK",
            message: "Lấy token thành công!",
            access_token,
        };

    } catch (error) {
        return {
            status: "ERROR",
            message: "Token không hợp lệ hoặc đã hết hạn",
        };
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    handleRefreshToken
};