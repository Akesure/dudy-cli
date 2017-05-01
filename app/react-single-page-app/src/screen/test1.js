/** 
 * Your Description
 * @author xxx
 * @time xxx
 */

import React, {Component} from 'react'

//import {connect} from 'react-redux'


export default class Test1 extends Component{

  componentDidMount(){
    fetch("/api/course")
  }

  render(){
    return <div>
      <h1>Test1</h1>
    </div>
  }
}


//const map = (state) => {
//  return {
//
//}
//}

