import React from 'react'
import renderer from 'react-test-renderer'
import Card from '../src/components/Card'

describe('<Card/>', () => {
  it('snapshot test', () => {
    let spyClicked = false

    const component = renderer.create(
      <Card key='card1'
        title='Card title'
        description='New Description'
        rightHeader='Overdue'
        onClick={() => spyClicked = true} />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(spyClicked).toBe(true)
  })
})
