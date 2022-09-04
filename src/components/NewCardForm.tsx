import React, {FC, PropsWithChildren, useState} from 'react'
import {CardForm, CardHeader, CardRightContent, CardTitle, CardWrapper, Detail} from 'rt/styles/Base'
import {AddButton, CancelButton} from 'rt/styles/Elements'
import {EditableLabel} from 'rt/widgets/EditableLabel'
import createTranslate from 'rt/helpers/createTranslate'

interface FormState {
  title: string
  description: string
  label: string
}

interface NewCardFormProps {
  onCancel: () => void
  onAdd: (formState: FormState) => void
  t: typeof createTranslate
}
export const NewCardForm: FC<PropsWithChildren<NewCardFormProps>> = ({onCancel, onAdd, t}) => {
  const [formState, setFormState] = useState<FormState>()

  const handleAdd = () => {
    onAdd(formState)
  }

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState({...formState, [field]: value})
  }

  return (
    <CardForm>
      <CardWrapper>
        <CardHeader>
          <CardTitle>
            <EditableLabel
              placeholder={(t('placeholder.title') as unknown) as string}
              onChange={(val: FormState['title']) => updateField('title', val)}
              autoFocus
            />
          </CardTitle>
          <CardRightContent>
            <EditableLabel
              placeholder={(t('placeholder.label') as unknown) as string}
              onChange={(val: FormState['label']) => updateField('label', val)}
            />
          </CardRightContent>
        </CardHeader>
        <Detail>
          <EditableLabel
            placeholder={(t('placeholder.description') as unknown) as string}
            onChange={(val: FormState['description']) => updateField('description', val)}
          />
        </Detail>
      </CardWrapper>
      <AddButton onClick={handleAdd}>{t('button.Add card')}</AddButton>
      <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
    </CardForm>
  )
}
