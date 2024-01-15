import styled from 'styled-components'

export const NavCard = styled.nav`
  border: 2px solid red;
  background-color: ${props => (!props.isDark ? '#ffffff' : '#0f0f0f')};

  @media screen and (min-width: 768px) {
    display: none;
  }
`
export const HeadPop = styled.div`
  background-color: ${props => (!props.isDark ? '#ffffff' : '#0f0f0f')};
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
