import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react'
import {InlineInput as _InlineInput} from 'rt/styles/Base'
import autosize from 'autosize'

interface InlineInputProps {
  onSave?: (inputValue: string) => void
  onCancel?: () => void
  border?: boolean
  placeholder?: string
  value?: string
  autoFocus?: boolean
  resize?: 'vertical' | 'horizontal' | 'none'
}

export const InlineInput: FC<PropsWithChildren<InlineInputProps>> = ({
  autoFocus = false,
  border = false,
  onSave,
  onCancel,
  placeholder = '',
  resize = 'none',
  value = ''
}) => {
  const inputRef = useRef<HTMLTextAreaElement>()
  const [inputValue, setInputValue] = useState(value)
  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.select()
  }
  const onMouseDown = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (document.activeElement != e.target) {
      e.preventDefault()
      inputRef.current.focus()
    }
  }
  const onBlur = () => {
    if (inputValue != value) {
      onSave(inputValue)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      inputRef.current.blur()
      e.preventDefault()
    }
    if (e.key === 'Escape') {
      setInputValue(value)
      inputRef.current.blur()
      e.preventDefault()
    }
    if (e.key === 'Tab') {
      if (inputValue.length == 0) {
        onCancel()
      }
      inputRef.current.blur()
      e.preventDefault()
    }
  }
  const setRef = (ref: HTMLTextAreaElement) => {
    inputRef.current = ref
    if (resize != 'none') {
      autosize(inputRef)
    }
  }
  useEffect(
    () => {
      setInputValue(value)
    },
    [resize]
  )
  return (
    <_InlineInput
      ref={setRef}
      border={border}
      onMouseDown={onMouseDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={value.length == 0 ? undefined : placeholder}
      defaultValue={value}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      rows={1}
      autoFocus={autoFocus}
    />
  )
}
