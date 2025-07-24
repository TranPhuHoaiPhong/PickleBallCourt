import React, { useState } from 'react';
import { Dropdown, Space } from 'antd';
import { CiTimer } from "react-icons/ci";
import './style.css';

function DropdownTime({ items }) {
  const [selectedHuyen, setSelectedHuyen] = useState("Khung thời gian");

  const onClick = ({ key }) => {
    const selectedItem = items.find(item => item.key === key);
    if (selectedItem) {
      const labeltext = selectedItem.label;
      setSelectedHuyen(labeltext);
      console.log(`Click on item ${labeltext}`);
    }
  };

  const isDefault = selectedHuyen === "Khung thời gian";

  return (
    <Dropdown 
      menu={{ items, onClick, className: "custom-dropdown-menu" }} 
      trigger={['click']}
    >
      <button
        type="button"
        onClick={e => e.preventDefault()}
        className="dropdown-time-button"
      >
        <Space className="dropdown-time-space">
          <CiTimer style={{ color: "black", fontSize: "14px" }} />
          <span
            style={{
              fontSize: "14px",
              color: isDefault ? "#aaa" : "#000"
            }}
          >
            {selectedHuyen}
          </span>
        </Space>
      </button>
    </Dropdown>
  );
}

export default DropdownTime;
