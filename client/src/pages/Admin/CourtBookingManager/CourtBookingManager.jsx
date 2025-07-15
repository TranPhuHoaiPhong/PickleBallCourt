import { message } from "antd";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { LocationItem, LocationModal, LocationWrapper } from "./style";

// Dữ liệu giờ và sân
const hours = [
  "6 giờ - 8 giờ",
  "8 giờ - 10 giờ",
  "10 giờ - 12 giờ",
  "12 giờ - 14 giờ",
  "14 giờ - 16 giờ",
  "16 giờ - 18 giờ",
  "18 giờ - 20 giờ",
  "20 giờ - 22 giờ",
];

const courts = ["Sân 1", "Sân 2", "Sân 3", "Sân 4"];
const locations = ["Hà Nội", "Đà Nẵng", "Hồ Chí Minh"];

// Styled Component cho dropdown

const CourtBookingManager = () => {
  const [selectedLocation, setSelectedLocation] = useState("Hà Nội");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [bookedSlotsByLocation, setBookedSlotsByLocation] = useState({});

  const toggleDropdown = () => {
    setShowLocationDropdown((prev) => !prev);
  };

  const handleLocationSelect = (loc) => {
    setSelectedLocation(loc);
    setShowLocationDropdown(false);
  };

  const handleBookAField = (court, hourIndex) => {
    const slotKey = `${selectedLocation}_${court}_${hourIndex}`;
    const currentBooked = bookedSlotsByLocation[slotKey];

    if (currentBooked) {
      message.info("Khung giờ này đã được đặt!");
      return;
    }

    setBookedSlotsByLocation((prev) => ({
      ...prev,
      [slotKey]: true,
    }));

    message.success(
      `Đã đặt ${court} vào khung ${hours[hourIndex]} tại ${selectedLocation}`
    );
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#f9f9f9" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Quản lý đặt sân</h2>

        <LocationWrapper onClick={toggleDropdown}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FaLocationDot />
            <div>{selectedLocation}</div>
          </div>

          {showLocationDropdown && (
            <LocationModal>
              {locations.map((loc) => (
                <LocationItem
                  key={loc}
                  onClick={() => handleLocationSelect(loc)}
                >
                  {loc}
                </LocationItem>
              ))}
            </LocationModal>
          )}
        </LocationWrapper>
      </div>

      {/* Time headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "150px repeat(8, 1fr)",
          gap: "10px",
          marginBottom: 10,
        }}
      >
        <div></div>
        {hours.map((hour, idx) => (
          <div
            key={idx}
            style={{
              background: "#1890ff",
              color: "white",
              textAlign: "center",
              padding: "10px 0",
              borderRadius: 6,
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {hour}
          </div>
        ))}
      </div>

      {/* Rows per court */}
      {courts.map((court, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "150px repeat(8, 1fr)",
            gap: "10px",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: 6,
              textAlign: "center",
              fontWeight: "bold",
              boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
            }}
          >
            {court}
          </div>

          {hours.map((_, hourIdx) => {
            const slotKey = `${selectedLocation}_${court}_${hourIdx}`;
            const isBooked = bookedSlotsByLocation[slotKey];

            return (
              <div
                key={hourIdx}
                style={{
                  backgroundColor: isBooked ? "#52c41a" : "#fff",
                  color: isBooked ? "white" : "inherit",
                  padding: "10px 0",
                  borderRadius: 6,
                  textAlign: "center",
                  cursor: isBooked ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
                }}
                onClick={() => handleBookAField(court, hourIdx)}
              >
                {isBooked ? "Đã đặt" : "Đặt"}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CourtBookingManager;
