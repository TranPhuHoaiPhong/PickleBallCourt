import axios from "axios"

export const sendGmail= async (email) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/sign-up/verify`, {email})
        
    } catch (error) {
        console.log(error);
    }
  
}