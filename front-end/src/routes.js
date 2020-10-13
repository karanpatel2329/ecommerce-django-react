import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/home';
import PrivateRoutes from './auth/helper/privateroute';
import signUp from './user/signup';
import signin from './user/signin';
import Cart from './core/cart';
import UserDashboard from './user/userDashboard';

const Routes =() => {
    return(
    <BrowserRouter>
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/signin" exact component={signin}/>
        <Route path="/signup" exact component={signUp}/>
        <PrivateRoutes path="/cart" exact component={Cart}/>
        <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}/>
    </Switch>
    </BrowserRouter>
    )
}

export default Routes;