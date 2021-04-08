import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({product}) => {
    const {imageURL, productName, price, _id, weight} = product;
    console.log(_id)
    return (
        <div style={{paddingLeft: '100px'}} className="col-md-4">
            <img style={{height: '300px'}} src={imageURL} alt=""/>
            <h4>{productName} - {weight}</h4>
            <h3>{price}</h3>
            <Link to={"/checkout/"+_id}><button style={{backgroundColor: 'lightGreen', width: '100px', height: '40px', borderRadius: '10px', marginBottom: '40px'}}>BUY NOW</button></Link>
        
        </div>
    );
};

export default Product;