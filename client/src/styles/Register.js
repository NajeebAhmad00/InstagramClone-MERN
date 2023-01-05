import styled from 'styled-components'
import { mobile } from '../responsive'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    background: #fff;
    border: 1px solid #dbdbdb;
    margin-top: 20px !important;
    ${mobile({ margin: '0' })}
`

export const Logo = styled.img`
    height: 60px;
    margin: 30px auto 10px auto;
`

export const Text = styled.p`
    color: #8E8E8E;
    width: 80%;
    font-weight: ${props => props.top ? '600' : ''};
    font-size: ${props => props.top ? '17px' : '12px'};
    margin: ${props => props.top ? '0 auto' : '10px auto'};
    text-align: center;
`

export const Input = styled.input`
    display: block;
    width: 80%;
    margin: 10px auto 10px auto;
    border: 1px solid #dbdbdb;
    height: 36px;
    border-radius: 3px;
    color: #8E8E8E;
    background: #FAFAFA;
    padding-left: 10px;

    &:focus {
        outline: none;
        border: 1px solid rgb(48, 48, 48);
    }
`

export const Button = styled.button`
    width: 80%;
    margin: 0 auto 30px 35px;
    height: 32px;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    border-radius: 7px;
    background: #4796ea;
    border: none;
`

export const TextBottom = styled.p`
    text-align: center;
    margin: 30px 0;
    font-size: 14px;
`