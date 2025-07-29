import { Row } from 'antd';
import styled from 'styled-components';


export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(53, 58, 64);
    color: white;
    align-items: center; 
    flex-wrap: nowrap;
    height: 80px
`;


export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: white;
    font-weight: bold;
    text-align: left;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`