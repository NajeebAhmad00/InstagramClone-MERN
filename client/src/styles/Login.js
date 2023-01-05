import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`

export const Section = styled.section`
    height: 85vh;
`

export const Banner = styled.img`
    height: 85vh;
`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    background: #fff;
    border: 1px solid #dbdbdb;
    margin-top: 20px;
`

export const Logo = styled.img`
    height: 60px;
    margin: 30px auto 50px auto;
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
    margin: 0 auto;
    height: 32px;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    border-radius: 7px;
    background: #4796ea;
    border: none;
`

export const Text = styled.p`
    text-align: center;
    color: ${props => props.pass ? '#143667' : ''};
    margin: ${props => props.pass ? '30px 0 20px 0' : '30px 0'};
    cursor: ${props => props.pass ? 'pointer' : ''};
    font-size: ${props => props.pass ? '' : '14px'};
`

export const Err = styled.div`
    color: red;
    margin-bottom: 20px;
    text-align: center;
`