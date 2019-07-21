import React, { Component } from 'react';
import {
    Link,
    BrowserRouter as Router,
    Route
    } from 'react-router-dom'

    class View extends Component{
      
        render() {
            return(
              <ul>
                  <li className = "list-view">
                      <Link to = "/list" className ="item-link">去到列表</Link>
                  </li>
              </ul>
            )
        }
    }
    export default View;