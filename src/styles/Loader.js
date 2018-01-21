import styled, {keyframes} from 'styled-components'

const keyframeAnimation = keyframes`
    0% {
      transform: scale(1);
    }
    20% {
      transform: scale(1, 2.2);
    }
    40% {
      transform: scale(1);
    }
`
export const LoaderDiv = styled.div`
  text-align: center;
  margin: 15px 0;
`

export const LoadingBar = styled.div`
  display: inline-block;
  margin: 0 2px;
  width: 4px;
  height: 18px;
  border-radius: 4px;
  animation: ${keyframeAnimation} 1s ease-in-out infinite;
  background-color: #777;

  &:nth-child(1) {
    animation-delay: 0.0001s;
  }
  &:nth-child(2) {
    animation-delay: 0.09s;
  }
  &:nth-child(3) {
    animation-delay: 0.18s;
  }
  &:nth-child(4) {
    animation-delay: 0.27s;
  }
`
