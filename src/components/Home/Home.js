import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);


    return (       
        <div className="row products">
            {
                products.length === 0 && <CircularProgress style={{marginLeft: '50%', width: '100px'}} />
            }
            {
                products.map(product => <Product product={product}></Product>)
            }
        </div>

    );
};

export default Home;