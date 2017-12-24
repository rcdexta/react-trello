import styled from 'styled-components'
import {CardWrapper} from './Base'

export const DeleteWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: -8px;
  right: -8px;
`

export const DeleteIcon = styled.span`
  position: relative;
  display: inline-block;
  width: 6px;
  height: 6px;
  opacity: 0;
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
