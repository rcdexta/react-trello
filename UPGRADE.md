# Upgrade instictions

## Upgrade from 2.1 to 2.2

Next Board properties are removed: `addCardLink`, `customLaneHeader`, `newCardTemplate`, `newLaneTemplate`
and `customCardLayout` with `children` element. 

You must use `components` property, that contains map of custom
`React.Component`'s (not elements/templates)

| Legacy property     | Key name in components object|
| ------------------- | ---------------------------- |
| addCardLink         | AddCardLink                  |
| customLaneHeader    | LaneHeader                   |
| newCardTemplate     | NewCardForm                  |
| newLaneTemplate     | NewLaneSection               |
| customCardLayout (children) | Card |

Full list of available components keys -
[src/components/index.js](src/components/index.js)

### Migration example

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
  CustomLaneHeader: CustomLaneHeader,
  NewCardForm:      NewCard,
  NewLaneSection:   NewLane,
  Card:             CustomCard
};
<Board components={components} />
```

That's all. Have a nice day! )
