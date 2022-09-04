import React, {FC, PropsWithChildren} from 'react'
import {DeleteWrapper, DelButton} from 'rt/styles/Elements'

export const DeleteButton: FC<PropsWithChildren<{}>> = ({...rest}) => {
  return (
    <DeleteWrapper {...rest}>
      <DelButton>&#10006;</DelButton>
    </DeleteWrapper>
  )
}
