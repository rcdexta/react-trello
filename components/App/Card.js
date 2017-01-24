import React, { Component } from 'react'

export default class Card extends Component {
  render() {
    return <article className="card">
      <header>{this.props.title}</header>
      <div className="detail">{this.props.description}</div>
    </article>
  }
}