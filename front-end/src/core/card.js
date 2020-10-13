import React,{useState} from 'react';
import ImageHelper from './helper/imagehelper';
import {Redirect} from 'react-router-dom';
import {addItemToCart, removeItemFromCart} from './helper/carthelper';
import {IsAuthenicated} from '../auth/helper/index';

const Card = ({
    product,
    AddToCard=true,
    RemoveFromCard=false,
    reload=undefined,
    setReload = f => f, 
}) => {
    //redirect is used for card route 
    //redirects is used for signup
    const [redirect, setRedirect]=useState(false);
    const [redirects, setRedirects]=useState(false);
    const cardtitle=product ? product.name : "Sample Photo";
    const carddescription=product ? product.description : "Sample Description";
    const cardprice=product ? product.price : "Sample Price";
    
    const addToCard=()=>{
        if(IsAuthenicated()){
            addItemToCart(product,()=>setRedirect(true));
            console.log('Add To card');
            setRedirects(false);
        }
        else{
          setRedirects(true);  
          
            console.log('Login in First',redirects);
            
        }
    }

    const getAredirect= redirect =>{
        if(redirect){
            return <Redirect to="/cart"/>
        }
    }
    const getAredirects= redirects =>{
      if(redirects){
          return <Redirect to="/signup"/>
      }
  }

    const ShowAddToCart = addTocart =>{
        return (
            AddToCard && (
            <div className="col-12">
              <button
                onClick={addToCard}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            </div>
            )
        )
    }

    const ShowRemoveFromCart = removeFromCard=>{
        return(
            RemoveFromCard && (
            <div className="col-12">
              <button
                onClick={()=>{
                    removeItemFromCart(product.id);
                    setReload(!reload);
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            </div>
            )
        )
    }

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardtitle}</div>
        <div className="card-body">
          {getAredirect(redirect)}
          {getAredirects(redirects)}  
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {carddescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">{cardprice}</p>
          <div className="row">
            {ShowAddToCart(AddToCard)}
            {ShowRemoveFromCart(RemoveFromCard)}
          </div>
        </div>
      </div>
    );
  };

  export default Card;