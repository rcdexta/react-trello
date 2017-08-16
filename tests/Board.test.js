import React from 'react'
import renderer from 'react-test-renderer'
import Board from '../src/components/Board'

describe('<Board/>', () => {
  it('snapshot test', () => {
    const data = {lanes: [{id: 'Lane1', title: 'Lane1', cards: []}]}
    const component = renderer.create(
      <Board key='board1' data={data} style={{backgroundColor: '#eee'}}/>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
