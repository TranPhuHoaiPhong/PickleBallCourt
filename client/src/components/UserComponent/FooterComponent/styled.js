import { Link } from "react-router-dom";
import styled from "styled-components";


export const LiHover = styled.li`
    &:hover {
        color: blue
    }
`

export const LinkHover = styled(Link)`
    &:hover {
        color: blue
    }
`

export const UlPadding = styled.ul`
    @media (max-width: 768px) {
    margin-left: 15px !important;
}
`



