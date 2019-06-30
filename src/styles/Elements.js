import styled from 'styled-components'
import {CardWrapper, MovableCardWrapper} from './Base'

export const DeleteWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: -1px;
  right: 2px;
  cursor: pointer;
`

export const GenDelButton = styled.button`
  transition: all 0.5s ease;
  display: inline-block;
  border: none;
  font-size: 15px;
  height: 15px;
  padding: 0;
  margin-top: 5px;
  text-align: center;
  width: 15px;
  background: inherit;
  cursor: pointer;
`

export const DelButton = styled.button`
  transition: all 0.5s ease;
  display: inline-block;
  border: none;
  font-size: 8px;
  height: 15px;
  line-height: 1px;
  margin: 0 0 8px;
  padding: 0;
  text-align: center;
  width: 15px;
  background: inherit;
  cursor: pointer;
  opacity: 0;
  ${MovableCardWrapper}:hover & {
    opacity: 1;
  }
`

export const MenuButton = styled.button`
  transition: all 0.5s ease;
  display: inline-block;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  height: 15px;
  line-height: 1px;
  margin: 0 0 8px;
  padding: 0;
  text-align: center;
  width: 15px;
  background: inherit;
  cursor: pointer;
`

export const LaneMenuHeader = styled.div`
    position: relative;
    margin-bottom: 4px;
    text-align: center;
`

export const LaneMenuContent = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 12px 12px;
`

export const LaneMenuItem = styled.div`
    cursor: pointer;
    display: block;
    font-weight: 700;
    padding: 6px 12px;
    position: relative;
    margin: 0 -12px;
    text-decoration: none;

    &:hover {
      background-color: #3179BA;
      color: #fff;
    }
`

export const LaneMenuTitle = styled.span`
    box-sizing: border-box;
    color: #6b808c;
    display: block;
    line-height: 30px;
    border-bottom: 1px solid rgba(9,45,66,.13);
    margin: 0 6px;
    overflow: hidden;
    padding: 0 32px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
`

export const DeleteIcon = styled.span`
  position: relative;
  display: inline-block;
  width: 4px;
  height: 4px;
  opacity: 1;
  overflow: hidden;
  border: 1px solid #83bd42;
  border-radius: 50%;
  padding: 4px;
  background-color: #83bd42;

  ${CardWrapper}:hover & {
    opacity: 1;
  }

  &:hover::before,
  &:hover::after {
    background: red;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 2px;
    width: 60%;
    top: 45%;
    left: 20%;
    background: #fff;
    border-radius: 5px;
  }

  &:before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &:after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
`

export const ExpandCollapseBase = styled.span`
  width: 36px;
  margin: 0 auto;
  font-size: 14px;
  position: relative;
  cursor: pointer;
`

export const CollapseBtn = styled(ExpandCollapseBase)`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 7px solid #444;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-radius: 6px;
  }
  &:after {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    border-bottom: 3px solid #e3e3e3;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }
`

export const ExpandBtn = styled(ExpandCollapseBase)`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-top: 7px solid #444;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-radius: 6px;
  }
  &:after {
    content: '';
    position: absolute;
    left: 4px;
    top: 0px;
    border-top: 3px solid #e3e3e3;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }
`

export const AddButton = styled.button`
  background: #5aac44;
  color: #fff;
  transition: background 0.3s ease;
  min-height: 32px;
  padding: 4px 16px;
  vertical-align: top;
  margin-top: 0;
  margin-right: 8px;
  font-weight: bold;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 0;
`

export const CancelButton = styled.button`
  background: #999999;
  color: #fff;
  transition: background 0.3s ease;
  min-height: 32px;
  padding: 4px 16px;
  vertical-align: top;
  margin-top: 0;
  font-weight: bold;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 0;
`
export const AddLaneLink = styled.button`
  background: #2b6aa3;
  border: none;
  color: #fff;
  transition: background 0.3s ease;
  min-height: 32px;
  padding: 4px 16px;
  vertical-align: top;
  margin-top: 0;
  margin-right: 0px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 0;
`
