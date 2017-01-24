import React, { Component } from 'react'
import Card from './Card'
import Lane from './Lane'
import './App.scss'

export default class App extends Component {
  render () {
    return <div className='board'>

      <Lane title='Invoiced to Add'>
        <Card title='Amy Curtis'
          description='Quote Total: $70,000 Invoiced: $40,000'
          time='19 mins' />
        <Card title='Bob Jackson'
          description='Quote Total: $17,000 Invoiced: $0'
          time='15 mins' />
      </Lane>

      <Lane title='Invoiced Created'>
        <Card title='Joseph Major'
          description='Invoice Amount: $300'
          time='15 mins' />
      </Lane>

      <Lane title='Invoices Sent' />

      <Lane title='Invoices Past Due'>
        <Card title='John Doe'
          description='Invoice Amount: $20,000'
          time='1 hour' />
        <Card title='Julia Stiles'
          description='Invoice Amount: $33,000'
          time='2 hours' />
      </Lane>

      <Lane title='Invoices Paid'>
        <Card title='Mathew Williams'
          description='Invoice Amount: $53,000'
               />
        <Card title='Tim Lee'
          description='Invoice Amount: $13,000'
               />
      </Lane>

    </div>
  }
}

App.propTypes = {
  onClick: React.PropTypes.func
}
