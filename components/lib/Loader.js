import React, { Component } from 'react'

const Loader = ({ children }) => (
  <div className="loading">
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
  </div>
);

export default Loader