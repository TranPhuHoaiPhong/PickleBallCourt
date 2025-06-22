import { Button, Col, Row } from 'antd';
import styled from 'styled-components';

export const WrapperDiv = styled.div `
    margin-top: -4px
`

export const WrapperSecondDiv = styled.div `
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
`;

export const WrapperRow = styled(Row)
`
    margin-bottom: 50px;
    width: 100%
`

export const WrapperCol = styled(Col)
`
    position: relative;
    text-align: center;
    margin-top: 4%;
`

export const WrapperImg = styled.img
`
    width: 92%;
    height: 100%;
    border: 1px solid rgb(0, 0, 0);
`

export const WrapperButton = styled(Button)`
    position: absolute;
    right: 7%;
    bottom: 5%;
    border-radius: 10px 0 10px 0;
    padding: 20px 20px;
    font-size: 12px;
    border: 1px solid #fff;
`;