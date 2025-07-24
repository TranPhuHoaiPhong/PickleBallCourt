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

export const getDetailUser = async( token) => {
    console.log("token detail", token);
    const res = await axiosJWT.get(`${process.env.REACT_APP_SERVER_URL}/api/user/getDetail`, {
        headers: {
            Authorization: `Bearer ${token}`
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

// export const logoutUser = async () => {
//   try {
//     const res = await axios.delete(
//       `${process.env.REACT_APP_SERVER_URL}/api/user/log-out`,
//       {
//         withCredentials: true, // để gửi cookie đi (cần thiết!)
//       }
//     );

//     return res.data;
//   } catch (error) {
//     console.log("Logout failed:", error);
//     throw error;
//   }
// };

export const logoutUser = async (cleanToken) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/user/log-out`,
      {
        headers: {
            "Authorization": `Bearer ${cleanToken}`
        },
        withCredentials: true, // để gửi cookie đi (cần thiết!)
      }
    );

    return res.data;
  } catch (error) {
    console.log("Logout failed:", error);
    throw error;
  }
};

