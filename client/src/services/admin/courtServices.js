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
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateLocation = async (accessToken, locationId, formData) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/location/update-location/${locationId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createCourt = async (accessToken, formData) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/court/create-court`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCourts = async (accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/court/all-court`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCourt = async (accessToken, courtId, courtData) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/court/update-court/${courtId}`,
      courtData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating court:", error);
    throw error;
  }
};
