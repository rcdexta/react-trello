const REPLACE_TABLE = {
  addCardLink: 'Card',
  customLaneHeader: 'LaneHeader',
  newLaneTemplate: 'NewLaneSection',
  newCardTemplate: 'NewCardForm',
  children: 'Card',
  customCardLayout: 'Card'
}

const warn = (prop) => {
  const use = REPLACE_TABLE[prop]
  console.warn(`react-trello property '${prop}' is removed. Use 'components.${use}' instead. More - https://github.com/rcdexta/react-trello/blob/master/UPGRADE.md`)
}

export default (props) => {
  Object.keys(REPLACE_TABLE).forEach((key) => {
    if (props.hasOwnProperty(key)) {
      warn(key)
    }
  })
}
