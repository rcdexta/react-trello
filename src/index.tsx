import React from 'react'

import {Draggable} from './dnd/Draggable'
import Container from './dnd/Container'
import BoardContainer from './controllers/BoardContainer'
import Lane from './controllers/Lane'
import deprecationWarnings from './helpers/deprecationWarnings'
import DefaultComponents from './components'
import locales from './locales'

export * from './widgets'

import createTranslate from './helpers/createTranslate'
import {Board} from './controllers/Board'

export {Draggable, Container, BoardContainer, Lane, createTranslate, locales}

export {DefaultComponents as components}

const DEFAULT_LANG = 'en'

export default ({components = {}, lang = DEFAULT_LANG, ...otherProps}) => {
  deprecationWarnings(otherProps)
  const translate = createTranslate(locales[lang].translation)
  return <Board t={translate} components={{...DefaultComponents, ...components}} {...otherProps} />
}
