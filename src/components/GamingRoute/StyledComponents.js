import styled from 'styled-components'

export const GameCard = styled.div`
  background-color: ${props => (!props.isDark ? '#ffffff' : '#0f0f0f')};
`

export const Image = styled.img`
  width: 100%;
`
