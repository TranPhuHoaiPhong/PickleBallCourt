import React, { useEffect, useRef, useState } from "react";
import { InputWrapper, PWrapper } from "./style";


const InputField = ({ label, type = "text", value, setValue, handleOnchange  }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const handleOnchangeInput = (e) => {
    setValue(e.target.value);
    handleOnchange(e.target.value)
  };

  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      setIsFocused(true);
    }
  })
  

  return (
    <div style={{ position: "relative", width: "100%", marginBottom: "20px" }}>
      <InputWrapper
        ref={inputRef}
        type={type}
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
    </div>
  );
};

export default InputField;
