import styled from 'styled-components'

export const VideoCard = styled.div`
  background-color: ${props => (!props.isDark ? '#ffffff' : '#0f0f0f')};
`

export const Image = styled.img`
  width: 100%;
`
export const LikeBtn = styled.button`
  color: ${props => (props.isLike === 'LIKE' ? '#2563eb' : '#64748b')};
`

export const DisLikeBtn = styled.button`
  color: ${props => (props.isLike === 'DISLIKE' ? '#2563eb' : '#64748b')};
`

export const SaveBtn = styled.button`
  color: #2563eb;
`
