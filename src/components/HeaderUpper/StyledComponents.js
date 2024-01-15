import styled from 'styled-components'

export const NavCard = styled.nav`
  border: 2px solid red;
  background-color: ${props => (!props.isDark ? '#ffffff' : '#0f0f0f')};
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`

export const Image = styled.img`
  width: 100px;
`

export const SideNav = styled.nav`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`
