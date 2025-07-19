export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}


export const convertPrice = (price) => {
    try {
      return price.toLocaleString('vi-VN') + " Đ";
    } catch (error) {
      return null;
    }
  };
  

