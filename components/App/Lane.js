import React, { Component } from 'react'

export default class Lane extends Component {
  render() {
    return <section className="list">
      <header>{this.props.title}</header>
      {this.props.children}
    </section>
  }
}