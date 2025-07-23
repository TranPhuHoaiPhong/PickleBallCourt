
export const convertPrice = (price) => {
    try {
      return price.toLocaleString('vi-VN') + " Đ";
    } catch (error) {
      return null;
    }
  };
