import styled, {injectGlobal} from 'styled-components'

injectGlobal`
  .comPlainTextContentEditable {
    -webkit-user-modify: read-write-plaintext-only;
  }

  .comPlainTextContentEditable--has-placeholder::before {
    content: attr(placeholder);
    opacity: 0.5;
    color: inherit;
    cursor: text;
  }
  
  .react_trello_dragClass {
    transform: rotate(3deg);
  }
  
  .react_trello_dragLaneClass {
    transform: rotate(3deg);
  }
`

export const BoardDiv = styled.div`
  background-color: #23719f;
  overflow-y: hidden;
  padding: 5px;
  color: #393939;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
`

export const Header = styled.header`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export const Section = styled.section`
  background-color: #e3e3e3;
  border-radius: 3px;
  margin: 5px 5px;
  position: relative;
  padding: 10px;
  display: inline-flex;
  height: auto;
  max-height: 90%;
  flex-direction: column;
`

export const LaneHeader = styled(Header)`
	z-index: 1000;
	padding: 0px 5px;
	margin-bottom: 0px;
`

export const LaneFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  height: 10px;
`

export const ScrollableLane = styled.div`
	flex: 1;
	overflow-y: auto;
	min-width: 250px;
	overflow-x: hidden;
	align-self: center;
	max-height: 90vh;
	padding-bottom: ${props => (props.isDraggingOver ? '130px' : '30px')};
	margin-top: 10px;
	flex-direction: column;
	justify-content: space-between;
`

export const Title = styled.span`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  cursor: grab;
  width: 70%;
`

export const RightContent = styled.span`
  width: 30%;
  text-align: right;
  padding-right: 10px;
  font-size: 13px;
`
export const CardWrapper = styled.article`
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: relative;
  padding: 10px;
  cursor: pointer;
  max-width: 250px;
  margin-bottom: 7px;
  min-width: 230px;
`

export const MovableCardWrapper = styled(CardWrapper)`
  &:hover {
    background-color: #f0f0f0;
  }
`

export const CardHeader = styled(Header)`
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
`

export const CardTitle = styled(Title)`
  font-size: 14px;
`

export const CardRightContent = styled(RightContent)`
  font-size: 10px;
`

export const Detail = styled.div`
  font-size: 12px;
  color: #4d4d4d;
  white-space: normal;
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
  border-radius: 3px;
  margin: 2px 5px;
  font-size: 70%;
`

export const AddCardLink = styled.a`
  border-radius: 0 0 3px 3px;
  color: #838c91;
  display: block;
  padding: 5px 2px;
  position: absolute;
  text-decoration: none;
  cursor: pointer;
  bottom: 3px;

  &:hover {
    //background-color: #cdd2d4;
    color: #4d4d4d;
    text-decoration: underline;
  }
`
