import { Link } from "react-router-dom";
import styled from "styled-components";


export const LiHover = styled.li`
    &:hover {
        color: 	rgb(255, 193, 7)
    }
`

export const LinkHover = styled(Link)`
    &:hover {
        color: red
    }
`

export const UlPadding = styled.ul`
    @media (max-width: 768px) {
    margin-left: 15px !important;
}
`



