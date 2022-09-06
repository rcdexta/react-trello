import React, {CSSProperties, EventHandler, FC, MouseEvent, PropsWithChildren} from 'react'
import {MovableCardWrapper, CardHeader, CardRightContent, CardTitle, Detail, Footer} from 'rt/styles/Base'
import {InlineInput} from 'rt/widgets/InlineInput'
import {Tag, TagProps} from './Card/Tag'
import {DeleteButton} from 'rt/widgets/DeleteButton'
import {createTranslate} from '..'
import {Card as ICard} from 'rt/types/Board'
import {StyledComponent} from 'styled-components'

export type CardProps = {
  showDeleteButton?: boolean
  onDelete?: () => void
  onClick?: (e) => void
  onChange?: (card: ICard) => void
  style?: CSSProperties
  tagStyle?: CSSProperties
  className?: string
  id: string
  index: number
  title?: string
  label?: string
  description?: string
  tags?: TagProps[]
  cardDraggable?: boolean
  editable?: boolean
  t: typeof createTranslate
} & {[key: string]: any}

export const Card: FC<PropsWithChildren<CardProps>> = ({
  onDelete,
  onChange,
  id,
  onClick,
  style,
  className,
  description,
  label,
  t,
  tags,
  title,
  cardDraggable,
  editable,
  showDeleteButton,
  tagStyle
}) => {
  const _onDelete = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<StyledComponent<'div', any>>) => {
    onDelete()
    e.stopPropagation()
  }
  const updateCard = (card: Partial<ICard>) => {
    onChange({...card, id})
  }

  return (
    <MovableCardWrapper data-id={id} onClick={onClick} style={style} className={className}>
      <CardHeader>
        <CardTitle draggable={cardDraggable}>
          {editable ? (
            <InlineInput
              value={title}
              border
              placeholder={(t('placeholder.title') as unknown) as string}
              resize="vertical"
              onSave={(value: ICard['title']) => updateCard({title: value})}
            />
          ) : (
            title
          )}
        </CardTitle>
        <CardRightContent>
          {editable ? (
            <InlineInput
              value={label}
              border
              placeholder={(t('placeholder.label') as unknown) as string}
              resize="vertical"
              onSave={(value: ICard['label']) => updateCard({label: value})}
            />
          ) : (
            label
          )}
        </CardRightContent>
        {showDeleteButton && <DeleteButton onClick={_onDelete} />}
      </CardHeader>
      <Detail>
        {editable ? (
          <InlineInput
            value={description}
            border
            placeholder={(t('placeholder.description') as unknown) as string}
            resize="vertical"
            onSave={(value: ICard['description']) => updateCard({description: value})}
          />
        ) : (
          description
        )}
      </Detail>
      {tags &&
        tags.length > 0 && (
          <Footer>
            {tags.map(tag => (
              <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
            ))}
          </Footer>
        )}
    </MovableCardWrapper>
  )
}
