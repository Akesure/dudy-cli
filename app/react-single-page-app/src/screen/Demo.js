/** 
 * Your Description
 * @author xxx
 * @time xxx
 */

import React, {Component} from 'react'

//import {connect} from 'react-redux'

export default class Demo extends Component{

  render(){
    return (
      <div>
        <div>
          THis is a demo page
      </div>
        <div>
          <a onTouchTap={() => this.props.history.goBack()}>Back</a>
        </div>
      </div>
    )
  }

}

