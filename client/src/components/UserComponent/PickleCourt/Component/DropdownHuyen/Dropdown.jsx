import React, { useState} from 'react';
import { Dropdown, Space } from 'antd';
import { CiLocationOn } from "react-icons/ci";
import './style.css';

function DropdownH() {
  const [selectedHuyen, setSelectedHuyen] = useState("Chọn Quận/Huyện");

  const onClick = ({ key }) => {
    const selecteditem = items.find(item => item.key === key)
    if (selecteditem) {
      const labeltext = selecteditem.label;
      setSelectedHuyen(labeltext); 
    }
    console.log(`Click on item ${selecteditem.label}`);
  };

  const items = [
    {
      key: '1',
      label: "Huyện Ninh Kiều"
    },
    {
      key: '2',
      label: "Huyện Cái Răng"
    },        
    {
      key: '3',
      label: "Phường Cái Khế", 
    }     
  ];
  
  return (
    <Dropdown 
      menu={{ items, onClick, className: "custom-dropdown-menu", }} 
      trigger={['click']}
    >
    <a style={{}} onClick={e => e.preventDefault()}>
      <Space style={{ border: "1px solid #d9d9d9", width: "100%", padding: "10px 7px", borderRadius: "6px", display: "flex", justifyContent: "center", boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.15)" }}>
          <CiLocationOn style={{ color: "black", fontSize: "14px" }}/>
          <span 
            style={{ 
              fontSize: "14px", 
              cursor: "pointer",
          }}>
              {selectedHuyen}
          </span>
      </Space>
    </a>
  </Dropdown>
  );
};

export default DropdownH