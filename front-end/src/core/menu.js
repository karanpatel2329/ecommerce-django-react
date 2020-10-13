import React,{Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, IsAuthenicated, signup} from '../auth/helper';

const currentTab = (history,path) => {
    if(history.location.pathname === path){
        return { color:"#2ecc72" };
    }
    else{
        return { color:"#FFFFFF" };
    }
}


function Menu({history, path}){
    return(
        <div>
            
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-items"> 
    <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
                </li>
                 {
                     IsAuthenicated() && (
                        <li className="nav-items"> 
                        <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>   
                        </li>
                     )
                 }
                {
                    IsAuthenicated() && (
                    
                    <li className="nav-items"> 
                        <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">Profile</Link>
                    </li>
                    )
                }
                {
                    !IsAuthenicated() && (
                        <Fragment>
                            <li className="nav-items"> 
                                <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">Sign In</Link>
                            </li> 
                            <li className="nav-items"> 
                                <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">Sign Up</Link>
                            </li>
                        </Fragment>
                    )
                }
                {
                    IsAuthenicated() && (
                    
                    <li className="nav-items"> 
                    <span 
                        onClick={()=>{
                            signout(()=>{
                                history.push("/");
                            });
                        }}
                        className="nav-link text-warning"
                        >
                            Signout
                        </span>
                    </li>
                    )
                }

            </ul>
        </div>
    )
}

export default withRouter(Menu);