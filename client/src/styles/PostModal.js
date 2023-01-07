import styled from 'styled-components'
import { mobile } from '../responsive'

export const Flex = styled.div`
    display: flex;
    height: 100%;
    overflow: hidden;
    width: 100%;
    ${mobile({ flexDirection: 'column' })};
`

export const Box = styled.div`
    background: ${props => props.img ? '#000' : ''};
    width: 50%;
    display: flex;
    flex-direction: ${props => props.img ? '' : 'column'};
    align-items: ${props => props.img ? 'center' : ''};
    ${mobile({ width: '100%' })};
`

export const Image = styled.img`
    width: 100%;
    ${mobile({ flex: '40%' })};
`

export const PostTop = styled.div`
    height: 10%;
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
    padding: 10px;
    position: relative;
    ${mobile({ display: 'none' })};
`

export const PostCenter = styled.div`
    height: 70%;
    border-bottom: 1px solid #dbdbdb;
    overflow-y: scroll;
    padding: 10px 20px 0 20px;
    ${mobile({ padding: '0 5px 5px 5px', flex: '40%' })}
`

export const PostBottom = styled.div`
    ${mobile({ flex: '20%' })};
`

export const ProfileImg = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: url('${props => props.img}') center center/cover;
`

export const ProfileName = styled.span`
    color: #000;
    font-weight: 700;
    font-size: 15px;
    position: ${props => props.absolute ? 'absolute' : ''};
    top: 12px;
    left: 60px
`

export const BlueTick = styled.img`
    height: 20px;
    position: ${props => props.none ? '' : 'absolute'};
    top: 14px;
    left: 125px;
`

export const CommentBox = styled.div`
    display: flex;
    gap: 20px;
    margin-top: ${props => props.comment ? '10px' : ''};
    ${mobile({ marginTop: '5px' })};
`

export const InnerBox = styled.div``