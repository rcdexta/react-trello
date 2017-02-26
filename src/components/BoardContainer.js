import React, {Component} from 'react'
import {BoardDiv} from '../styles/Base'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Lane from './Lane'

const boardActions = require('../actions/board_actions')

class BoardContainer extends Component {

  state = {data: this.props.data}

  componentDidMount() {
    // if (this.props.draggable) {
    //   dragula([...document.querySelectorAll('.drag-inner-list')])
    //     .on('drag', (el) => el.classList.add('is-moving'))
    //     .on('dragend', (el) => el.classList.remove('is-moving'))
    // }
    this.props.actions.loadBoard(this.props.data)
  }

  componentWillReceiveProps(nextProps) {
    console.log('board received new props')
    this.setState({data: nextProps.newData})
  }


  render() {
    const {data} = this.state
    return <BoardDiv>
      {
        data.lanes.map((lane) => {
          const {id, ...otherProps} = lane
          return <Lane key={id}
                       id={id}
                       {...otherProps}
                       onCardClick={this.props.onCardClick}
                       onScroll={this.props.onLaneScroll}
                       laneSortFunction={this.props.laneSortFunction}
          />
        })}
    </BoardDiv>
  }
}

BoardContainer.propTypes = {
  data: React.PropTypes.object.isRequired,
  onLaneScroll: React.PropTypes.func,
  onCardClick: React.PropTypes.func,
  laneSortFunction: React.PropTypes.func,
  draggable: React.PropTypes.bool,
  onDragStart: React.PropTypes.func,
  onDragEnd: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {newData: state}
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(boardActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
