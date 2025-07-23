import axios from "axios";
export const axiosJWT = axios.create()

export const LoginUser = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/sign-in`, data,
        {
        withCredentials: true
        }
    )
    return res.data
}

export const SignUp = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/sign-up`, data)
    return res.data
}

export const getDetailUser = async(id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_SERVER_URL}/api/user/getDetail/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    }    
    )
    return res.data
} 

export const getRefreshToken = async() => {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/getRefreshToken`,{}, {
        withCredentials: true
    })
    return res.data
}