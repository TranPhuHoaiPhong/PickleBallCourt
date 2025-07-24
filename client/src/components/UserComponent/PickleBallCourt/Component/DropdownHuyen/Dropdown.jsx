import React, { useState } from 'react';
import { Dropdown, Space } from 'antd';
import { CiLocationOn } from "react-icons/ci";
import './style.css';

function DropdownH({ items = [], defaultLabel = "Chọn Quận/Huyện", onSelect = () => {} }) {
  const [selectedHuyen, setSelectedHuyen] = useState(defaultLabel);

  const handleClick = ({ key }) => {
    const selectedItem = items.find(item => item.key === key);
    if (selectedItem) {
      setSelectedHuyen(selectedItem.label)
      onSelect(selectedItem)
    }
  };

  return (
    <Dropdown 
      menu={{ items, onClick: handleClick, className: "custom-dropdown-menu" }} 
      trigger={['click']}
    >
      <button
        type="button"
        onClick={e => e.preventDefault()}
        style={{
          all: 'unset', 
          width: "100%",
        }}
      >
        <Space style={{
          border: "1px solid #d9d9d9",
          width: "100%",
          padding: "10px 7px",
          borderRadius: "6px",
          display: "flex",
          justifyContent: "center",
          boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.15)",
          cursor: "pointer"
        }}>
          <CiLocationOn style={{ color: "black", fontSize: "14px" }} />
          <span style={{ fontSize: "14px" }}>
            {selectedHuyen}
          </span>
        </Space>
      </button>
    </Dropdown>
  );
}

export default DropdownH;
