import React, {Component, Suspense} from 'react'
import {storiesOf} from '@storybook/react'
import { useTranslation, I18nextProvider } from 'react-i18next';

import Board from '../src'
import i18n from './helpers/i18n'
import createTranslate from 'rt/helpers/createTranslate'

const smallData = require('./data/data-sort')

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
  .add(
    'Custom texts',
    () =>  {

      const TEXTS = {
        "Add another lane": "NEW LANE",
        "Click to add card": "Click to add card",
        "Delete lane": "Delete lane",
        "Lane actions": "Lane actions",
        "button": {
          "Add lane": "Add lane",
          "Add card": "Add card",
          "Cancel": "Cancel"
        },
        "placeholder": {
          "title": "title",
          "description": "description",
          "label": "label"
        }
      }

      const customTranslation = createTranslate(TEXTS)
      return <Board data={smallData} t={customTranslation} editable canAddLanes draggable />
    },
    {info: 'Have custom text titles'}
  )
  .add(
    'Flat translation table',
    () =>  {
      const FLAT_TRANSLATION_TABLE = {
        "Add another lane": "+ Weitere Liste erstellen",
        "Click to add card": "Klicken zum Erstellen einer Karte",
        "Delete lane": "Liste löschen",
        "Lane actions": "Listenaktionen",
        "button.Add lane": "Liste hinzufügen",
        "button.Add card": "Karte hinzufügen",
        "button.Cancel": "Abbrechen",
        "placeholder.title": "Titel",
        "placeholder.description": "Beschreibung",
        "placeholder.label": "Label"
      };

      return <Board data={smallData} t={key => FLAT_TRANSLATION_TABLE[key]} editable canAddLanes draggable />
    },
    {info: 'Flat translation table'}
  )

storiesOf('I18n', module)
  .addDecorator(story => <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>)
  .add(
    'Using i18next',
    () => <I18nBoard /> ,
    {info: 'Availability to switching between languages'}
  )
