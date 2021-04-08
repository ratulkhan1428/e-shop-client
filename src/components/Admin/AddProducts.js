import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';

const AddProducts = () => {
    const { register, handleSubmit } = useForm();

    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const productData = {
            productName: data.name,
            price: data.price,
            weight: data.weight,
            imageURL: imageURL
        };
        const url = `http://localhost:3001/addProduct`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        })
        .then(res => console.log('server side response', res))
    };
    const handleImageUpload = product => {
        console.log(product.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '930709ba53556162c38ec62981d8008a');
        imageData.append('image', product.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    return (
        <div className="container row">
            <div style={{backgroundColor: 'aqua'}} className="col-md-3">
                <br/>
                <Link to={"/manageProduct"}><h5 style={{marginLeft: '50px'}}><DashboardIcon /> Manage Product</h5></Link>
                <br/>
                <Link to={"/addProducts"}><h5 style={{marginLeft: '50px'}}><AddIcon /> Add Product</h5></Link>
                <br/>
                <h5 style={{marginLeft: '50px'}}><EditIcon /> Edit Product</h5>
            </div>
            <div style={{textAlign: 'center'}} className="mt-5 col-md-9">
                <h1 style={{marginBottom: '40px'}}>Add Product</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4>Product Name</h4>
                    <input style={{marginBottom: '20px'}} name="name" placeholder="Enter Name" ref={register} />
                    <br/>
                    <h4>Add Price</h4>
                    <input style={{marginBottom: '20px'}} name="price" placeholder="Enter Price" ref={register} />
                    <br/>
                    <h4>Weight</h4>
                    <input style={{marginBottom: '20px'}} name="weight" placeholder="Enter Weight" ref={register} />
                    <br/>
                    <h4>Add Photo</h4>
                    <input style={{marginBottom: '20px'}} name="exampleRequired" type="file" onChange={handleImageUpload} />
                    <br/>
                    <input style={{backgroundColor: 'aqua'}} type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProducts;