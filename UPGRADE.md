# Upgrade instictions

## Upgrade from 2.1 to 2.2

### Texts

Boths text properties are removed: `addLaneTitle` and `addCardLink`.
Use translation function `t` to full control texts:

| Legacy property     | Key name in components object|
| ------------------- | ---------------------------- |
| addLaneTitle         | "Add another lane"         |
| addCardLink          | "Click to add card"       |

[Complete list of available translation keys](src/locales/en/translation.json)

#### Migration example

Instead of

```javascript
<Board
  addLaneTitle="NEW LANE"
  addCardLink="ADD CARD"
/>
```

Use

```javascript

import { createTranslate } from 'react-trello'

const TEXTS = {
  "Add another lane": "NEW LANE",
  "Click to add card": "Click to add card",
  "Delete lane": "Delete lane",
  "Lane actions": "Lane actions",
  "button": {
    "Add lane": "Add lane",
    "Add card": "ADD CARD",
    "Cancel": "Cancel"
  },
  "placeholder": {
    "title": "title",
    "description": "description",
    "label": "label"
  }
}
<Board t={createTranslate(TEXTS)}/>
```

### Components customization

These properties are removed: `addCardLink`, `customLaneHeader`, `newCardTemplate`, `newLaneTemplate`
and `customCardLayout` with `children` element. 

You must use `components` property, that contains map of custom
`React.Component`'s (not elements/templates)

| Legacy property     | Key name in components map|
| ------------------- | ---------------------------- |
| addCardLink         | AddCardLink                  |
| customLaneHeader    | LaneHeader                   |
| newCardTemplate     | NewCardForm                  |
| newLaneTemplate     | NewLaneSection               |
| customCardLayout (children) | Card |

Full list of available components keys -
[src/components/index.js](src/components/index.js)

#### Migration example

Instead of 

```javascript
<Board 
  addCardLink     ={<button>New Card</button>}
  customLaneHeader={<CustomLaneHeader />}
  newCardTemplate ={<NewCard />} 
  newLaneTemplate ={<NewLane />}
  customCardLayout
  >
  <CustomCard />
</Board>

```

Use

```javascript
const components = {
  AddCardLink:      () => <button>New Card</button>,
  LaneHeader:       CustomLaneHeader,
  NewCardForm:      NewCard,
  NewLaneSection:   NewLane,
  Card:             CustomCard
};
<Board components={components} />
```

That's all. Have a nice day! )
