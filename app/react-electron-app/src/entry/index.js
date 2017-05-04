import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Index from "screen/Index"
import {AppContainer} from 'container'

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import {get_current_path} from 'helper'



// 获取当前的网址
const base = get_current_path()


console.log(base)
const Entry = () => {
  return <Router> 
    <Route exact path={base} component={Index} />
  </Router>
}


ReactDOM.render(
  <AppContainer>
    <Entry />
  </AppContainer>, 
  document.getElementById("app"))
