import React from 'react'
import {DeleteWrapper, DeleteIcon} from '../../styles/Elements'

const DeleteButton = props => {
  return (
    <DeleteWrapper {...props}>
      <DeleteIcon />
    </DeleteWrapper>
  )
}

export default DeleteButton
