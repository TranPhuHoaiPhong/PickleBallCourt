import axios from "axios";

export const createLocation = async (accessToken, formData) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/location/create-court-location`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Error creating location:",
      error.response?.data || error.message
    );
    throw error; // để component gọi hàm này có thể xử lý lỗi
  }
};

export const getLocation = async (accessToken) => {
  try {
    
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/location/get-court-location`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
