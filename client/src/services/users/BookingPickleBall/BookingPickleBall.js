import axios from "axios";


export const generateCourtBookingData = (_id, selectedDate, selectedCourts = [], timeStart, timeEnd) => {
  const result = [];
  const duration = timeEnd - timeStart;
  let totalPrice = 0;

  const [day, month, year] = selectedDate.split("/");

  const formattedDate = `${year}-${month}-${day}`;

  const formattedStart = timeStart.replace("H", ":00");
  const formattedEnd = timeEnd.replace("H", ":00");
  console.log("selectedCourts", selectedCourts);

  selectedCourts.forEach(court => {
    const price = court.price * duration;
    totalPrice += price;

    result.push({
      id_court: court.key,
      id_user: _id,
      name: court.name,
      date: formattedDate,
      timeStart: `${formattedStart}:00`,
      timeEnd: `${formattedEnd}:00`,
      price: price,
    });
  });

  return {
    data: result,
    totalPrice
  };
};

export const BookCourtAPI = async (bookingData, namee, phonee) => {
 

  let access = localStorage.getItem("access-token")
  access = access?.replace(/^"|"$/g, "");


  try {
    const body = bookingData.map(item => ({
      courtId: item.id_court,
      userId: item.id_user,
      date: item.date,
      startHour: item.timeStart,
      endHour: item.timeEnd,
      totalPrice: item.price,
      name: namee,    
      phone: phonee
    }));
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/book-court/create`,
      body,
      {
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    );
    return res.data
  } catch (error) {
    console.log("Đặt sân thất bại: ", error.response?.data || error.message);
    return {
      status : false,
      message : "Đặt sân thất bại, ân đã được đặt trước"
    }
  }
};

export const getBookedCourt = async() => {
  let access = localStorage.getItem("access-token")
  access = access?.replace(/^"|"$/g, "");

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/book-court/court-booked`,
      {
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    );
    return res.data
  } catch (error) {
    console.log("Lấy thông tin thất bại: ", error.response?.data || error.message);
    return {
      status : false,
      message : "Lấy thông tin thất bại"
    }
  }
}
