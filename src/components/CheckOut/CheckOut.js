import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const CheckOut = () => {
    
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        orderDate: new Date()
    });

    const handleOrder = () => {
        const newOrder = {...product, ...loggedInUser, ...selectedDate};
        fetch('http://localhost:3001/addOrder', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newOrder)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    useEffect(()=> {
        fetch(`http://localhost:3001/product/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data[0]));
    }, [id])


    return (
        <div style={{textAlign: 'center'}}>
            <h1>Check Out your product</h1>
            <img style={{width: '300px'}} src={product.imageURL} alt=""/>
            <h4>{product.name}</h4>
            <br/>
            <h3>Price: {product.price}</h3>
            <br/>
            <Link to={"/orders"}><button onClick={handleOrder} style={{width: '150px', height: '50px', backgroundColor: 'lawngreen'}}><b>Checkout</b></button></Link>
        </div>
    );
};
export default CheckOut;