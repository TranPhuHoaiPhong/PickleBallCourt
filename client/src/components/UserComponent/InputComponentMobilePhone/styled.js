import styled from "styled-components";

export const InputWrapper = styled.input`
  position: relative;
  height: 50px;
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 15px;
  text-indent: 15px;
  transition: 0.3s ease;
  outline: none;
  border: ${(props) => (props.focus ? '1px solid black' : '1px solid #ccc')}; 
  box-sizing: border-box;
`;
