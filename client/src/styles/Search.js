import styled from 'styled-components'

export const ListGroup = styled.ul`
    list-style: none
`

export const ListItem = styled.li`
    cursor: pointer;
    position: relative;
    padding: 10px;
    display: flex;
    gap: 20px;
    border-radius: 10px;

    &:first-child {
        margin-top: 10px;
    }

    &:hover {
        border: 1px solid #dbdbdb;
    }
`

export const ProfileImg = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: url('${props => props.img}') center center/cover;
`

export const UserName = styled.h4`
    display: inline;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
`

export const ProfileName = styled.h5`
    color: #8E8E8E;
    font-size: 0.9rem;
    font-weight: 500;
`

export const SearchBox = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    margin: 0 0 20px 0;

    &:focus {
        outline: none;
    }
`