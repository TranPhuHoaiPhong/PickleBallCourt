import axios from "axios";

export const getAllUser = async () => {

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/user/getAll`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`, // nếu bạn có token
    //       // hoặc các header khác bạn muốn thêm
    //     }
    //   }
    );
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error.response?.data || error.message);
  }
};
