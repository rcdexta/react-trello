const REPLACE_TABLE = {
  addCardLink: 'components.Card',
  customLaneHeader: 'components.LaneHeader',
  newLaneTemplate: 'components.NewLaneSection',
  newCardTemplate: 'components.NewCardForm',
  children: 'components.Card',
  customCardLayout: 'components.Card',
  addLaneTitle: '`t` function with key "Add another lane"',
  addCardLink: '`t` function with key "Click to add card"',
}

const warn = (prop) => {
  const use = REPLACE_TABLE[prop]
  console.warn(`react-trello property '${prop}' is removed. Use '${use}' instead. More - https://github.com/rcdexta/react-trello/blob/master/UPGRADE.md`)
}

export default (props) => {
  Object.keys(REPLACE_TABLE).forEach((key) => {
    if (props.hasOwnProperty(key)) {
      warn(key)
    }
  })
}
