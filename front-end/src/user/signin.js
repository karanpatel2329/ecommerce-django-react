import React, { useState } from 'react';
import Base from '../core/base';
import {Link, Redirect} from 'react-router-dom';
import {authenicate, signin,IsAuthenicated} from '../auth/helper/index';

const SignInTemplate = () => {

    const [values, setValues]= useState({
        name:"",
        emails:"paka@gmail.com",
        password:"1234",
        error:false,
        success:false,
        loading:false,
        didRedirect:false,
    })
    const {name,emails,password,error,success, loading, didRedirect}=values;
    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value});
    };

    const performRedirect = () => {
        if(IsAuthenicated()){
           return <Redirect to="/"/>
        }
    };

    const loadingMsg =()=>{
        return (loading && <h2 className="alert alert-info">Loading....</h2>
        )    
        }

    const signinForm = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                            className="form-control"
                            value={emails}
                            type="text"
                            onChange={handleChange("emails")}
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                            className="form-control"
                            value={password}
                            type="password"
                            onChange={handleChange("password")}
                            />
                        </div>

                        <button 
                        onClick={onSubmit}
                        className="btn btn-success btn-block">
                        Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    };

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                    className="alert alert-success"
                    style={{display:success?"":"none"}}
                    >
                    New Account Created Successfull. Please 
                   <Link to="/login"> 
                    Login</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                    className="alert alert-danger"
                    style={{display:error?"":"none"}}
                    >
                    Error!! Please Check all feild again
                    </div>
                </div>
            </div>
        )
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({
            ...values, error:false, loading:true
        })
        signin({emails, password})
        .then(data=>{
            console.log("Data",data);
            if(data.token){
               // let sessiontoken = data.token;
                authenicate(data,()=>{
                    console.log("TOKKEN ADDED")
                    setValues({
                        ...values,
                        didRedirect:true,
                    })
                });
            }
            else{
                setValues({
                    ...values,
                    loading:false,
                })
            }
        })
        .catch(err=>console.log(err,"akjsj"));

    }

    return(
        <Base title="SignIn">
            {loadingMsg()}
            
            {signinForm()}
            <p className="text-center">
                {JSON.stringify(values)}
            </p>
            {performRedirect()}
        </Base>
    )
}


export default SignInTemplate;