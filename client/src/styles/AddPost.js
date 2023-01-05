import styled from 'styled-components'

export const Heading = styled.h2`
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    border-bottom: 1px solid #dbdbdb;
    padding: 5px 0;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.noImg ? '2rem' : ''};
    padding: 10px;
    height: 100%;
    align-items: center;
    justify-content: center;
`

export const Label = styled.label`
    padding: 5px 30px;
    border-radius: 5px;
    background: #4193EF;
    cursor: pointer;
    color: #fff;
    font-weight: 600;
`

export const Input = styled.input`
    visibility: hidden;
`

export const Box = styled.div`
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => props.img ? 'center' : 'flex-start'};
`

export const Image = styled.img`
    height: 100%;
    width: fit-content;
    max-width: 100%;
`

export const TextArea = styled.textarea`
    width: 100%;
    height: 65px;
    margin-top: 20px;
    border: none;
    font-family: 'Segoe UI', arial, sans-serif;
    outline: none;
`