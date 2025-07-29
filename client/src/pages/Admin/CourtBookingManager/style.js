import styled from "styled-components";

export const LocationWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const LocationModal = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

export const LocationItem = styled.div`
  padding: 10px 20px;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
