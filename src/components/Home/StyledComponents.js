import styled from 'styled-components'

export const HomeCard = styled.div`
  background-color: ${props => (!props.isDark ? '#ffffff' : '#181818')};
`

export const Image = styled.img`
  width: 100%;
`
export const LowerCard = styled.div`
  display: flex;
`
