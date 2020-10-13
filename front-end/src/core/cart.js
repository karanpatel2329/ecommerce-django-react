import React,{useState, useEffect} from 'react';
import Base from './base';
import Card from './card';
import { loadCart } from './helper/carthelper';
import PaymentB from './paymentB';

const Cart = () => {

    const [products, setProducts]=useState([]);
    const [reload, setReload]=useState([]);
    
    useEffect(()=>{
        setProducts(loadCart())
    },[reload])

    const loadAllProduct=(products)=>{
        return(
            <div>
                {products.map((product,index)=>(
                <Card
                key={index}
                product={product}
                RemoveFromCard={true}
                AddToCard={false}
                reload={reload}
                setReload={setReload}
                />
                ))}
                
            </div>
        )
    }

    const loadCheckout=()=>{
        return(
            <h1>checkout</h1>
        )
    }
    return(
        <Base title="Cart page" description="Welcome to checkout">
            <div className="row text-center">
                <div className="col-6">
                    {loadAllProduct(products)}
                </div>
                <div className="col-6">
                   
                    {
                        products.length > 0 ?(
                            <PaymentB  products={products} setReload={setReload}/>
                        ) :
                        (
                            <h3> Please login or Add product</h3>
                        )
                    }
                </div>
            </div>
        </Base>
    )
}

export default Cart;