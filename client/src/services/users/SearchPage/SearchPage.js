import axios from 'axios';

export const getAllCourts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/court/all-court`);
  return response.data.data;
};

export const handleBookingClick = (courtId) => {
  console.log("Đặt sân có ID:", courtId);
};
