import React, { useEffect, useRef, useState } from "react";
import { InputWrapper, PWrapper } from "./styled";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const InputFieldMobilePhone = ({ label, type = "text", value, setValue, handleOnchange, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleOnchangeInput = (e) => {
    setValue(e.target.value);
    if (handleOnchange) {
      handleOnchange(e.target.value);
    }
  };

  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      setIsFocused(true);
    }
  }, [value]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: "80%"}}>
      <div style={{ position: "relative", width: "100%" }}>
        <InputWrapper
          ref={inputRef}
          placeholder="Nhập tìm kiếm.."
          type={type}
          focus={isFocused}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(Boolean(value))}
          onChange={handleOnchangeInput}
        />
      </div>
      <div>
        <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
        <button style={{
          height: '100%',
          width: '100px',
          border: "1px solid #e1983a",
          borderBottomRightRadius: '10px',
          borderTopRightRadius: '10px',
          color: 'white',
          backgroundColor: "#e1983a",
          cursor: 'pointer'
        }}
        onClick={() => onSearch && onSearch(value)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#cf852f'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e1983a'}
        >
          Tìm kiếm
        </button>
        </Link>
      </div>
    </div>
  );
};

export default InputFieldMobilePhone;
