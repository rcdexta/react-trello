import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../components/lib/Board'

describe('<Board/>', () => {

  it('snapshot test', () => {

    const component = renderer.create(
      <Board key="board1">
        Many boards here
      </Board>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

})