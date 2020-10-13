import React, { Component } from 'react';
import  {Route, Redirect} from 'react-router-dom';
import {IsAuthenicated} from './index'

const privateRoutes=({component:Component , ...rest})=>{
    return(
    <Route
      {...rest}
      render={(props) =>
        IsAuthenicated()
        ? (
          <Component {...props}/>
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
    )
}

export default privateRoutes