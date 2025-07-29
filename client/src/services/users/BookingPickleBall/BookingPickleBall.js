export const generateCourtBookingData = (selectedCourts=[], timeStart, timeEnd) => {
    const result = []

    console.log("selectedCourts", selectedCourts);

    const a = timeEnd - timeStart

    selectedCourts.forEach(court => {
        for (let hour = timeStart; hour < timeEnd; hour++) {
            result.push({
                name: court.name,
                timeStart: timeStart,
                timeEnd: timeEnd,
                price: court.price * a
            })
        }
    });

    return result
}