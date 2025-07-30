const SharedServices = require("../../services/PickleBallCourt/SharedServices");

const getTopCourt = async (req, res) => {
    try {

        const result = await SharedServices.getTopCourt();
        return res.status(200).json(result);
        
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error"
        })
    }
}

module.exports = {
    getTopCourt
}