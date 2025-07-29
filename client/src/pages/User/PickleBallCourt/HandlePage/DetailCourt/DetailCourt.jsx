import { useState } from 'react';
import dayjs from 'dayjs';
import { showError } from "../../../../../components/UserComponent/CommonComponent/Message/Message"
import { searchAvalable } from '../../../../../services/users/SearchAvalable/SearchAvalable';

export const handleTimeSelectStart = (item, setSelectedTimeStart) => {
  setSelectedTimeStart(item.value); 
};

export const handleTimeSelectEnd = (item, setSelectedTimeEnd) => {
  setSelectedTimeEnd(item.value);
};

export const handleSearchCourt = async (selectedDate, selectedTimeStart, selectedTimeEnd, idCourt, setData) => {
  if (!selectedDate || !selectedTimeStart || !selectedTimeEnd) {
    showError("Vui lòng chạy ngày và giờ đầy đủ")
    return;
  }

  const timeStartInt = parseInt(selectedTimeStart);
  const timeEndInt = parseInt(selectedTimeEnd);

  if(timeEndInt <= timeStartInt) {
    showError("Vui lòng chọn giờ kết thúc lớn hơn giờ bắt đầu")
    return
  }
  const duration = timeEndInt - timeStartInt;

  const formattedDate = dayjs(selectedDate, "DD/MM/YYYY").format("YYYY-MM-DD");

  const data1 = await searchAvalable( idCourt, formattedDate, selectedTimeStart, duration)

  setData(data1)
  
};

export const getdetailallcourt =async (data) => {
  if(data) {
    return data
  }
}

const generateAvailableHours = (selectedDate) => {
  const now = new Date();
  const currentHour = now.getHours();

  const startHour = 17;
  const endHour = 22;

  const isToday =
    selectedDate &&
    new Date(selectedDate).toDateString() === now.toDateString();

  const availableHours = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    // Nếu là hôm nay, chỉ lấy giờ >= giờ hiện tại
    // Ngày khác thì lấy hết
    if (!isToday || hour >= currentHour) {
      availableHours.push({
        key: String(hour),
        label: `${hour}H`,
        value: String(hour),
      });
    }
  }

  return availableHours;
};

export const useCourtSelection = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeStart, setSelectedTimeStart] = useState(null);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);
  const [selectedCourts, setSelectedCourts] = useState([]);

  const onChangeDate = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const onRemoveCourt = (indexToRemove) => {
    const updated = selectedCourts.filter((_, i) => i !== indexToRemove);
    setSelectedCourts(updated);
  };

  const itemsStart = generateAvailableHours(selectedDate);

  const itemsEnd = selectedTimeStart
  ? itemsStart.filter((item) => Number(item.value) > Number(selectedTimeStart))
  : itemsStart;

  return {
    selectedDate,
    selectedTimeStart,
    selectedTimeEnd,
    selectedCourts,
    onChangeDate,
    onRemoveCourt,
    disabledDate,
    itemsStart,
    itemsEnd,
    setSelectedTimeStart,
    setSelectedTimeEnd,
  };
};


