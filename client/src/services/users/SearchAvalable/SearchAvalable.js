import axios from "axios";
export const axiosJWT = axios.create()

export const searchAvalable = async ( id,date, hour, duration =1) => {
  try { 
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/book-court/available?date=${date}&hour=${hour}:00&duration=${duration}&locationId=${id}`);
    return res.data.availableCourts;
  } catch (error) {
    console.log("Tìm kiếm thất bại:", error);
    throw error;
  } 
};
