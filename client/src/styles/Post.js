import styled from 'styled-components'
import { mobile } from '../responsive'

export const Box = styled.div`
    background: #fff;
    border: 1px solid #dbdbdb;
    width: ${props => props.width};
    border-radius: 7px;
    margin-bottom: 20px;
    ${mobile({ width: '90%' })}
`

export const PostTop = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 15px 10px;
`

export const ProfileImage = styled.div`
    cursor: pointer;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 15px;
    background: url('${props => props.profile}') center center/cover;
`

export const ProfileName = styled.span`
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
`

export const PostTopR = styled.span`
    position: absolute;
    right: 10px;
    cursor: pointer;
`

export const PostCenter = styled.div``

export const PostCenterImg = styled.img`
    width: 100%;
`

export const Wrapper = styled.div`
    padding: 10px;
    ${mobile({ padding: '5px' })};
`

export const Text = styled.p`
    font-size: ${props => props.date ? '0.7rem' : '0.8rem'};
    margin: ${props => props.margin ? '0' : '10px'};
    color: ${props => props.gray ? '#8E8E8E' : ''};
    cursor: ${props => props.pointer ? 'pointer' : ''};
`

export const PostBottom = styled.div`
    border-top: 1px solid #dbdbdb;
`

export const Input = styled.input`
    width: 90%;
    padding: 10px;
    border: none;
    border-radius: inherit;
    ${mobile({ width: '80%' })}

    &:focus {
        outline: none;
    }
`

export const Span = styled.span`
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: #5C94E4;
    ${mobile({ marginRight: '10px' })}
`