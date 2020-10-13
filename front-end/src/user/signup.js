import Base from '../core/base';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../auth/helper/index';



const SignUpTemplate = () => {
    const [values, setValues] = useState({
        name:"",
        emails:"",
        password:"",
        error:"",
        success:false,
    });

    const {name,emails,password,error,success}=values;

    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value});
    };

    const handleSubmit =  (event) =>{
        event.preventDefault();
        setValues({...values, error:false});
        signup({name,emails,password})
        .then(data=>{
            console.log("data",data)
            if(data.emails === emails){
                setValues({
                    ...values,
                    name:"",
                    emails:"",
                    password:"",
                    error:false,
                    success:true,
                })
            }
            else{
                setValues({
                    ...values,
                    error:true,
                    success:false,

                })
            }
        })
        .catch(err=>console.log(err))
    };

    const signupForm = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                            className="form-control"
                            value={name}
                            type="text"
                            onChange={handleChange("name")}
                            />
                        </div>

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
                        onClick={handleSubmit}
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

    return(
        <Base title="SignUp" description="Signup page">
            {successMessage()}
            {errorMessage()}
            {signupForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>

    );
}



export default SignUpTemplate;