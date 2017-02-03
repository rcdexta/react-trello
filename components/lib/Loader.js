import React, { Component } from 'react'
import {LoaderDiv, LoadingBar} from '../styles/Loader'

const Loader = ({ children }) => (
  <LoaderDiv>
    <LoadingBar/>
    <LoadingBar/>
    <LoadingBar/>
    <LoadingBar/>
  </LoaderDiv>
);

export default Loader