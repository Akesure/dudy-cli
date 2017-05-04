import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Test from "screen/Test"
import {AppContainer} from 'container'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import {get_current_path} from 'helper'


// 获取当前的网址
const base = get_current_path()


const Entry = () => {
  return <Router> 
    <Route exact path={base} component={Test} />
  </Router>
}


ReactDOM.render(
  <AppContainer>
    <Entry />
  </AppContainer>, 
  document.getElementById("app"))
