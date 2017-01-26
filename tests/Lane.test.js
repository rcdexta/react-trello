import React from 'react'
import renderer from 'react-test-renderer'
import Lane from '../components/lib/Lane'

describe('<Lane/>', () => {
  it('snapshot test', () => {
    const component = renderer.create(
      <Lane key='Lane1'
        title='First Lane'
        rightHeader='Total: 3'>
        Many cards here
      </Lane>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
