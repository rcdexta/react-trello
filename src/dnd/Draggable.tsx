import React, {FC, HTMLAttributes, PropsWithChildren, ReactElement} from 'react'
import {constants} from 'trello-smooth-dnd'
const {wrapperClass} = constants

interface DraggableProps {
  render: () => ReactElement
}
export const Draggable: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement> & DraggableProps>> = ({
  className,
  render,
  children,
  ...rest
}) => {
  if (render) {
    return React.cloneElement(render(), {className: wrapperClass})
  }

  const clsName = `${className ? className + ' ' : ''}`

  return (
    <div {...rest} className={`${clsName}${wrapperClass}`}>
      {children}
    </div>
  )
}
