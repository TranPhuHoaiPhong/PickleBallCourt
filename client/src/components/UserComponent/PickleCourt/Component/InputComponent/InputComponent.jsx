import React, { useEffect, useRef, useState } from "react";
import { InputWrapper, PWrapper } from "./style";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'; // Dùng icon của antd nếu đang dùng

const InputField = ({ label, type = "text", value, setValue, handleOnchange, isPassword = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleOnchangeInput = (e) => {
    setValue(e.target.value);
    handleOnchange(e.target.value);
  };

  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      setIsFocused(true);
    }
  }, [value]);

  return (
    <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
      <InputWrapper
        ref={inputRef}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        focus={isFocused}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value.length > 0)}
        onChange={handleOnchangeInput}
      />
      <PWrapper
        onClick={() => {
          setIsFocused(true);
          inputRef.current?.focus();
        }}
        focus={isFocused}
      >
        {label}
      </PWrapper>

      {isPassword && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '15px',
            top: '65%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            zIndex: 10,
            fontSize: '16px',
          }}
        >
          {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </div>
      )}
    </div>
  );
};

export default InputField;
