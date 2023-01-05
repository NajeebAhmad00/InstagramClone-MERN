import styled from 'styled-components'
import { mobile, tab } from '../responsive'

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #DBDBDB;
    padding: 0 200px;
    position: relative;
    margin-bottom: 30px;
    ${tab({ padding: '0 20px' })}
`

export const Logo = styled.img`
    height: 40px;
`

export const Input = styled.input`
    background: #EFEFEF;
    height: 35px;
    padding-left: 10px;
    width: 250px;
    border-radius: 7px;
    border: none;
    ${tab({ width: '150px' })}

    &:focus {
        outline: none;
    }
`

export const ListGroup = styled.ul`
    list-style: none;
    display: flex;
    gap: 20px;
    ${tab({ display: 'none' })}
`

export const ListItem = styled.li`
    font-size: 1.6rem;
    cursor: pointer;
`

export const ProfileLogo = styled.div`
    position: absolute;
    top: ${props => props.big ? '14px' : '70px'};
    right: ${props => props.big ? '' : '20px'};
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: url('${props => props.img}') center center/cover;
`

export const SecondNav = styled.div`
    height: 50px;
    margin: -30px 0 20px 0;
    display: none;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 20px;
    ${tab({ display: 'flex' })}
`

export const Item = styled.span`
    list-style: none;
    display: flex;
    justify-content: space-between;
`