import React, { useState, useRef, useEffect } from 'react';
import { CiTimer } from "react-icons/ci";
import './style.css';

function DropdownTime({ items = [1, 2, 3], onSelect }) {
  const [selectedLabel, setSelectedLabel] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (item) => {
    setSelectedLabel(item.label);
    setOpen(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  // Đóng dropdown nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        style={{width: '80px'}}
        className="dropdown-toggle"
        onClick={() => setOpen(!open)}
      >
        <CiTimer className="icon" />
        <span className={selectedLabel === "Khung thời gian" ? "placeholder" : ""}>
          {selectedLabel}
        </span>
      </button>

      {open && (
        <div className="dropdown-menu">
          {items.map((item) => (
            <div
              key={item.key}
              className="dropdown-item"
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownTime;
