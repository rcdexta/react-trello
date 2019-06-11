import React, {Component, Suspense} from 'react'
import {storiesOf} from '@storybook/react'
import { useTranslation, I18nextProvider } from 'react-i18next';

import Board from '../src'
import defaultTranslation from '../src/helpers/defaultTranslation'
import i18n from './i18n'

const smallData = require('./data/data-sort')

const customTranslation = (key) => '*' + defaultTranslation(key) + '*'

const I18nBoard = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div>
        <button onClick={() => i18n.changeLanguage('en')}>English</button>
        <button onClick={() => i18n.changeLanguage('ru')}>Русский</button>
      </div>
      <Board data={smallData} t={t} editable canAddLanes draggable />
    </div>
  )
}

storiesOf('I18n', module)
  .addDecorator(story => <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>)
  .add(
    'Custom texts',
    () =>  <Board data={smallData} t={customTranslation} editable canAddLanes draggable /> ,
    {info: 'Have custom text titles'}
  )
  .add(
    'Using i18next',
    () => <I18nBoard /> ,
    {info: 'Availability to switching between languages'}
  )
