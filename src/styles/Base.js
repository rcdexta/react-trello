import styled from 'styled-components'

export const BoardDiv = styled.div`
  background-color: none;
  
  padding: 20px 5px 5px 30px;
  font: 14px/18px "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #393939;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`
// lane
export const Section = styled.section`
  border-radius: 3px;
  margin: 5px 5px;
  padding: 5px;
  min-width: 170px;
  max-width: 170px;
  height: auto;
  max-height: 676px;
  min-height:93px;
  overflow-y: scroll;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: #4d4d50;
  background-color: #ffffff;
`

export const Header = styled.header`
  border-bottom: 2px solid #d61638;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export const Title = styled.span`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  cursor: grab;
  width: 80%;
`

export const RightContent = styled.span`
  width: 30%;
  text-align: right;
  font-size: 13px;
`

export const DraggableList = styled.div`
  min-height: 100px;
  overflow-y: scroll;
`

export const CardWrapper = styled.article`
  border-radius: 3px;
  margin: 10px 0px;
  padding: 13px 10px 5px 5px;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.23, 1, 0.32, 1);;
  background-color: #ECECEC;
  font-size: 11px;
  color: #4a4a4a;
  max-width: 250px;
  min-height: 93px;

  &:hover {
    background-color: #F0F0F0;
  }

  &.is-moving {
    background-color: rgba(black, 0.8);
  }
`

export const Placeholder = styled.section`
  background-color: #CCC;
  margin: 5px 0px;
  padding: 10px;
  min-width: 226px;
  height: 45px;
  max-height: 95%;
  overflow-y: scroll;
`

export const CardHeader = styled(Header)`
  border-bottom: 1px solid #eee;
`

export const CardTitle = styled(Title)`
 font-size: 11px;
`

export const CardRightContent = styled(RightContent)`
  font-size: 10px;
`

export const Detail = styled.div`
  font-size: 10px;
  color: #4d4d4d;
  line-height: 13px;
`

export const Footer = styled.div`
  border-top: 1px solid #eee;
  padding-top: 6px;
  text-align: right;
   display: flex;
   justify-content: flex-end;
   flex-direction: row;
   flex-wrap: wrap;
`

export const TagSpan = styled.span`
  padding: 2px 3px;
  font-size: 80%;
  border-radius: 3px;
  margin: 2px 5px;
  font-size: 70%;
`
