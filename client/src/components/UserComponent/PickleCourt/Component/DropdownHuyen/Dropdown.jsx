import React, { useState} from 'react';
import { Dropdown, Space } from 'antd';
import { CiLocationOn } from "react-icons/ci";

function DropdownH() {
  const [selectedHuyen, setSelectedHuyen] = useState("Chọn Quận/Huyện");

  const onClick = ({ key }) => {
    const selecteditem = items.find(item => item.key === key)
    if (selecteditem) {
      const labeltext = selecteditem.label.props.children;
      setSelectedHuyen(labeltext); 
    }
    console.log(`Click on item ${selecteditem.label.props.children}`);
  };

  const items = [
    {
      key: '1',
      label: (
        <div style={{
          textAlign: "center",
        }}>
          Huyện Ninh Kiều
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{
          textAlign: "center",
        }}>
          Huyện Cái Răng
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div style={{
          textAlign: "center",
        }}>
          Phường Cái Khế
        </div>
      ),
    }
  ];
  
  return (
    <Dropdown 
      menu={{ items, onClick }} 
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