import React, {FC, HTMLAttributes, PropsWithChildren} from 'react'
import {DeleteWrapper, DelButton} from 'rt/styles/Elements'
import {StyledComponent, ThemedStyledFunction} from 'styled-components'

interface DeleteButtonProps extends HTMLAttributes<HTMLDivElement> {}
export const DeleteButton: FC<PropsWithChildren<DeleteButtonProps>> = ({...rest}) => {
  return (
    <DeleteWrapper {...rest}>
      <DelButton>&#10006;</DelButton>
    </DeleteWrapper>
  )
}
