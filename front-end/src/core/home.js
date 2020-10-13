import React, {useEffect, useState} from 'react';
import {getProduct} from './helper/coreapicall';
import Base from './base';
import "../styles.css";
import Card from './card';
export default function Home(){

    const [products, setProduct]= useState([]);
    const [error, setError]=useState(false);

    const loadAllProducts = () =>{
        getProduct()
        .then((data)=>{
            if(data.error){
                setError(data.error);
                console.log(data.error);
            }
            else{
                setProduct(data);
            }   
        });
    };

    useEffect(()=>{
        loadAllProducts();
        
    },[])

    return(
        <Base title="Qhanakh" description="Welcome to qhankakh">
            <h1>Qhanakh Home Compenent</h1>
            <div className="row">
                {products.map((product,index)=>{
                    return(
                        <div key={index} className="col-4 mb-4">
                            <Card product={product}/>
                        </div>    
                    )
                })}
            </div>
        </Base>
    )
}