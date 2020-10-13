import React from 'react';

function ImageHelper({product}){
    const ImageUrl = product ? product.image : `https://live.staticflickr.com/4561/38054606355_26429c884f_b.jpg`
    return(
        <div className="rounded border border-success p-2">
            <img src={ImageUrl}
                style={{maxHeight:"100%",maxWidth:"100%"}}
                className="mb-3 rounded"
               alt=""/>
        </div>
    )
}

export default ImageHelper