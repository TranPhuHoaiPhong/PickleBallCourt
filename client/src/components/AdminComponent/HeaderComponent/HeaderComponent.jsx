import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

const HeaderComponent = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
    toggleSidebar();
  };

  return (
    <div
      style={{
        backgroundColor: "#ff8f8f",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 24px",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleClick}
      >
        {isOpen ? <FaBars size={20} /> : <FaBarsStaggered size={20} />}
      </div>
    </div>
  );
};

export default HeaderComponent;
