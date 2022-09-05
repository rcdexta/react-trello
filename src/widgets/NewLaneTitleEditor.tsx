import React, {HTMLAttributes, PropsWithChildren, useRef, useState} from 'react'
import {InlineInput} from 'rt/styles/Base'
import autosize from 'autosize'

interface NewLaneTitleEditorProps extends HTMLAttributes<HTMLTextAreaElement> {
  onSave?: (inputValue: string) => void
  onCancel?: () => void
  border?: boolean
  placeholder?: string
  value?: string
  autoFocus?: boolean
  autoResize?: boolean
  resize?: 'vertical' | 'horizontal' | 'none'
  inputRef: React.MutableRefObject<HTMLTextAreaElement>
}
export const NewLaneTitleEditor: React.FC<PropsWithChildren<NewLaneTitleEditorProps>> = ({
  autoFocus = false,
  autoResize = false,
  border = false,
  onCancel = () => {},
  onSave = () => {},
  placeholder = '',
  resize = 'none',
  value = '',
  inputRef
}) => {
  const [inputValue, setInputValue] = useState(value)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      inputRef.current.blur()
      saveValue()
      e.preventDefault()
    }
    if (e.key === 'Escape') {
      setInputValue(value)
      inputRef.current.blur()
      cancel()
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
  const cancel = () => {
    setInputValue('')
    onCancel()
    inputRef.current.blur()
  }
  const saveValue = () => {
    if (inputValue !== value) {
      onSave(inputValue)
    }
  }
  return (
    <InlineInput
      style={{resize: resize}}
      ref={setRef}
      border={border}
      onKeyDown={onKeyDown}
      placeholder={inputValue.length === 0 ? undefined : placeholder}
      defaultValue={value}
      rows={3}
      // autoResize={autoResize}
      autoFocus={autoFocus}
    />
  )
}
