import React from 'react';
import Menu from '../core/menu';
function Base({
    title="My Title",
    description="My Description",
    className="bg-dark text-white p-4",
    children
}){
    return(
        <div>
            <Menu/>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>
                {children}
                </div>
            </div>

            <footer className="footer bg-dark mt-auto py-3"> 
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you have question, contact me at instagram</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                    <div className="container">
                        <span className="text-warning"> 
                            i am so Good..!!!
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Base;