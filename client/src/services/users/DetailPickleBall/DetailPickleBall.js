import axios from "axios";

export const getDetailCourtLocation = async (id) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/location/get-detail/${id}`);
    return res.data;
  } catch (error) {
    console.log("Lấy thông tin thất bại:", error);
    throw error;
  }
};