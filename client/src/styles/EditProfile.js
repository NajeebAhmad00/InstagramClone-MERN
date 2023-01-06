import styled from 'styled-components'

export const Container = styled.section`
    width: 70%;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    margin-bottom: 3rem;
`

export const Box = styled.div`
    display: flex;
    position: relative;
`

export const ProfileImage = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: url('${props => props.img}') center center/cover;
`

export const Right = styled.div`
    margin-left: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Label = styled.label`
    font-size: 1.1rem;
    font-weight: 600;
    position: absolute;
    left: -4rem;
`

export const Input = styled.input`
    border: 1px solid #dbdbdb;
    height: 2rem;
    width: 20rem;
    padding: 1rem 0.5rem;
    border-radius: 0.2rem;
`

export const Text = styled.p`
    color: #8E8E8E;
    width: 20rem;
`

export const Textarea = styled.textarea`
    width: 20rem;
    min-width: 20rem;
    max-width: 20rem;
    height: 7rem;
    min-height: 7rem;
    max-height: 7rem;
    border: 1px solid #dbdbdb;
    padding: 1rem 0.5rem;
    border-radius: 0.2rem;
    font-family: 'Segoe UI', sans-serif;
`

export const Button = styled.button`
    color: #fff;
    background: #4193EF;
    border: none;
    cursor: pointer;
    font-weight: 600;
    border-radius: 0.2rem;
    padding: 0.5rem 1rem;
`

export const PhotoLabel = styled.label`
    cursor: pointer;
    margin-top: 0.7rem;
    margin-left: 0.5rem;
    color: #4193EF;
    font-weight: 600;
    font-size: 1rem;
`