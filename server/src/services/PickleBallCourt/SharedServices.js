const CourtModel = require("../../models/PickleBallCourt/Court/CourtModel");

const getTopCourt = () => {
    return new Promise ( async (resolve, reject) => {
        try {

            const topCourt = await CourtModel.find().limit(5);

            resolve({
                message: "Lấy 5 sân!",
                topCourt
            })
            
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getTopCourt
}