import { css } from 'styled-components'

export const laptop = (props) => {
    return css`
        @media (max-width: 1200px) {
            ${props}
        }
    `
}

export const tab = (props) => {
    return css`
        @media (max-width: 768px) {
            ${props}
        }
    `
}

export const mobile = (props) => {
    return css`
        @media (max-width: 500px) {
            ${props}
        }
    `
}