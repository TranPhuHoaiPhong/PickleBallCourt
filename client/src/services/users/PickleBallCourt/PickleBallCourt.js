import axios from "axios";
export const axiosJWT = axios.create()

export const searchKeyWord = async (keyword) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/court/search?address=${encodeURIComponent(keyword)}`);
    return res.data;
  } catch (error) {
    console.log("Tìm kiếm thất bại:", error);
    throw error;
  }
};
