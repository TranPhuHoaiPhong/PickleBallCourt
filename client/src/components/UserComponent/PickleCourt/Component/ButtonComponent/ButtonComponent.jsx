import { Button } from 'antd'
import React from 'react'
import {
    SearchOutlined
  } from '@ant-design/icons';

const ButtonComponent = ({size, textButton, ...rests}) => {
  return (
    <div>
       <Button  
        size={size} 
        type="primary" 
        {...rests}
       >
        <span>{textButton}</span>
      </Button>
    </div>
  )
}

const ButtonCommon = ({ text, onClick }) => {
  return (
      <button 
          onClick={onClick}
          style={{ 
              padding: '20px 0', 
              justifyContent: 'center',
              width: '70%', 
              color: 'white', 
              background: 'black',
              border: 'none', 
              borderRadius: '30px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              cursor: 'pointer',
              margin: 'auto',
              marginTop: "20px"
          }}
      >
          {text}
      </button>
  );
};

export { ButtonComponent, ButtonCommon }