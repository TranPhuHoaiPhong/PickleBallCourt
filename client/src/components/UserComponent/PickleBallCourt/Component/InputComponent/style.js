
import styled from 'styled-components';



export const InputWrapper = styled.input`
  position: relative;
  margin-top: 20px;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  font-size: 20px;
  text-indent: 15px;
  transition: 0.3s ease;
  outline: none;
  border: ${(props) => (props.focus ? '1px solid black' : '1px solid #ccc')}; 
  box-sizing: border-box;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

// export const PWrapper = styled.p`
//   position: absolute;
//   top: ${(props) => (props.focus ? '10%' : '40%')};
//   left: 15px;
//   background: ${(props) => (props.focus ? 'white' : 'transparent')};
//   padding: ${(props) => (props.focus ? '0 10px' : '0px')};
//   font-size: ${(props) => (props.focus ? '14px' : '16px')};
//   transform: translateY(-50%);
//   transition: 0.3s ease;
//   cursor: pointer; 
//   color: ${(props) => (props.focus ? 'black' : '#ccc')};
// `;

export const PWrapper = styled.p`
  position: absolute;
  top: ${(props) => (props.focus || props.value ? '10%' : '40%')};
  left: 15px;
  background: ${(props) => (props.focus || props.value ? 'white' : 'transparent')};
  padding: ${(props) => (props.focus || props.value ? '0 10px' : '0px')};
  font-size: ${(props) => (props.focus || props.value ? '14px' : '16px')};
  transform: translateY(-50%);
  transition: 0.3s ease;
  cursor: pointer; 
  color: ${(props) => (props.focus || props.value ? 'black' : '#ccc')};
  pointer-events: none;
`;
