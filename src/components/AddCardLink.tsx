import React, {FC, HTMLAttributes, PropsWithChildren} from 'react'
import {AddCardLink as _AddCardLink} from 'rt/styles/Base'
import {createTranslate} from '..'

interface AddCardLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  t: typeof createTranslate
}
export const AddCardLink: FC<PropsWithChildren<AddCardLinkProps>> = ({onClick, t}) => (
  <_AddCardLink onClick={onClick}>{t('Click to add card')}</_AddCardLink>
)
