import React,{useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {cartEmpty,l} from './helper/carthelper';
import {getmeToken, processPayment} from './helper/paymenthelper';
import {CreateOrder} from './helper/orderhelper';
import {IsAuthenicated,signout} from '../auth/helper/index';
import DropIn from 'braintree-web-drop-in-react';

const PaymentB = ({
    products,
    reload= undefined,
    setReload = (f) => f,
}) => {
    const [info, setInfo] = useState({
        loading:false,
        success: false,
        clientToken: null,
        error:"aaa",
        instance:{},
    });

    const userId = IsAuthenicated() && IsAuthenicated().user.id;
    const token = IsAuthenicated() && IsAuthenicated().token;
    
    const getToken=(userId, token)=>{
        console.log(getmeToken(userId, token))
        getmeToken(userId,token)
        
        .then(info => {
            if(info.error){
                console.log(info.error)
                setInfo({
                    ...info,
                    error: info.error
                })
                signout(()=>{
                    return <Redirect to="/"/>
                })
            }
            else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    useEffect(()=>{
        getToken(userId,token);
    },[])

    const getAmount = () =>{
        let amount =0;
        products.map(p=>{
            amount=amount + parseFloat(p.price);
        });
        return amount
    }

    const onPurchase = () => {
        setInfo({loading:true})
        let nonce;
        console.log(info)
        let getNonce = info.instance.requestPaymentMethod()
        .then( data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount:getAmount()
            };
            processPayment(userId,token,paymentData)
            .then(response=>{
                console.log(response)
                if(response.error){
                    if(response.code == '1'){
                        console.log("Payment Failed")
                        signout(()=>{
                          return  <Redirect to="/"/>
                        })
                    }
                }
                else{

                    setInfo({
                        ...info,
                        success:response.success,
                        loading:false
                    })
                    console.log("Payment Success")
                    let product_name = ""
                    products.forEach(function(items){
                        product_name+=items.name+", "
                    });
                    
                    const orderData = {
                       
                        products: product_name,
                        transaction_id: response.transaction.id,
                        amount:response.transaction.amount
                    }
                    CreateOrder(userId, token, orderData)
                    .then(response=>{
                       
                        if(response.error){
                            if(response.code == '1'){
                                console.log("Order Failed")
                            }
                            signout(()=>{
                                return  <Redirect to="/"/>
                              })
                        }else{
                            if (response.success == true){
                                console.log("Order Placed")
                            }
                        }
                    })
                    .catch(error => {
                        setInfo({loading:false, success:false})
                        console.log("Order Failed", error)
                    })

                    cartEmpty(()=>{
                        console.log("Cart is empty out")
                    })
                    setReload(!reload)
                }
            })
            .catch(err=>console.log(err))
        })
        .catch(err => console.log(err))
    }

    const showbtnDropin = () => {
        return(
            <div>
                {
                    info.clientToken !== null && products.length > 0 ? (
                        <div>
                            <DropIn
                            options={{authorization : info.clientToken}}
                            onInstance={instance=>(info.instance= instance)}
                            > 
                            </DropIn>  
                            <button onClick={onPurchase} className="btn btn-block btn-success">Buy Now</button>
                            
                        </div>
                    ) : (
                        <h3>Please login First or Something in cart</h3>
                    )
                }
            </div>
        )
    }
    return(
    <div>
        <h3>Your Bill is {getAmount()} </h3>
        {showbtnDropin()}
    </div>
    )
}

export default PaymentB;