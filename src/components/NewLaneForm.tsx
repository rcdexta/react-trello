import React, {FC, HTMLAttributes, PropsWithChildren, useState} from 'react'
import {LaneTitle, NewLaneButtons, Section} from 'rt/styles/Base'
import {AddButton, CancelButton} from 'rt/styles/Elements'
import NewLaneTitleEditor from 'rt/widgets/NewLaneTitleEditor'
import uuidv1 from 'uuid/v1'
import {ThemedStyledFunction} from 'styled-components'
import createTranslate from 'rt/helpers/createTranslate'

interface NewLaneFormProps extends HTMLAttributes<ThemedStyledFunction<'section', any, {}, never>> {
  onCancel: () => void
  onAdd: ({id, title}: {id: string; title: string}) => void
  t: typeof createTranslate
}
export const NewLaneForm: FC<PropsWithChildren<NewLaneFormProps>> = ({onAdd, onCancel, t}) => {
  const [refInput, setRefInput] = useState<any>()
  const handleSubmit = () => {
    onAdd({
      id: uuidv1(),
      title: getValue()
    })
  }

  const getValue = () => refInput

  return (
    <Section>
      <LaneTitle>
        <NewLaneTitleEditor
          ref={ref => {
            setRefInput(ref)
          }}
          placeholder={t('placeholder.title')}
          onCancel={onCancel}
          onSave={handleSubmit}
          resize="vertical"
          border
          autoFocus
        />
      </LaneTitle>
      <NewLaneButtons>
        <AddButton onClick={handleSubmit}>{t('button.Add lane')}</AddButton>
        <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
      </NewLaneButtons>
    </Section>
  )
}
