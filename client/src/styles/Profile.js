import styled from 'styled-components'
import { mobile } from '../responsive'

export const Container = styled.div`
    width: 70%;
    margin: 0 auto 30px auto;
    ${mobile({ width: '95%' })};
`

export const ProfileInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 60px;
    ${mobile({ gap: '20px' })}
`

export const ProfileImg = styled.div`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background: url('${props => props.src}') center center/cover;
    cursor: ${props => props.pointer ? 'pointer' : ''};
    ${mobile({ height: '80px', width: '80px' })};
`

export const Info = styled.div`
    width: 60%;
    ${mobile({ width: '80%' })};
`

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.column ? 'column' : ''};
    gap: ${props => props.column ? '5px' : '20px'};
    margin-top: ${props => props.marginTop ? '15px' : '0'};
`

export const ProfileName = styled.h3`
    font-weight: 300;
    font-size: 2rem;
`

export const Button = styled.button`
    height: 30px;
    margin-top: 10px;
    border: none;
    width: 100px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    color: ${props => props.white ? '#000' : '#fff'};
    background: ${props => props.white ? '#fafafa' : '#4193EF'};
    border: ${props => props.white ? '1px solid #dbdbdb' : ''};
`

export const Text = styled.p`
    font-size: 1rem;
    font-weight: 400;
    cursor: ${props => props.pointer ? 'pointer' : ''};
`

export const Span = styled.span`
    font-weight: bold;
    font-size: ${props => props.name ? '1.2rem' : ''};
`

export const GalleryBox = styled.div`
    display: grid;
    padding-top: 20px;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #dbdbdb;
    margin-top: 30px;
    ${mobile({ gap: '5px' })}
`

export const Image = styled.div`
    background: url('${props => props.src}') center center/cover;
    cursor: pointer;
    height: 300px;
    position: relative;
    ${mobile({ height: '123px' })}
`

export const ImageBox = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    background: rgba(0,0,0,0.3);
    display: none;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #fff;
    ${Image}:hover {
        display: flex;
    }
`

export const BlueTick = styled.img`
    height: 20px;
    margin: ${props => props.search ? '0' : props.feed ? '0 0 0 10px' : '15px 0 0 -10px'};
`