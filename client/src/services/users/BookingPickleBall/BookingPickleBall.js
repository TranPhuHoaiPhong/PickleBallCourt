export const generateCourtBookingData = (selectedCourts = [], timeStart, timeEnd) => {
  const result = [];
  const duration = timeEnd - timeStart;
  let totalPrice = 0;

  selectedCourts.forEach(court => {
    const price = court.price * duration;
    totalPrice += price;

    result.push({
      name: court.name,
      timeStart: `${timeStart}H`,
      timeEnd: `${timeEnd}H`,
      price: price
    });
  });

  return {
    data: result,
    totalPrice
  };
};
