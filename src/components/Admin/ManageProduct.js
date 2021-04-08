import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';

const ManageProduct = ({product}) => {
    const [manageProducts, setManageProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/products')
        .then(res => res.json())
        .then(data => setManageProducts(data));
    }, []);

    const deleteProduct = id => {
        fetch(`http://localhost:3001/deleteProduct/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(result => {
            console.log('deleted successfully', result)
        })
        console.log('button clicked', id)
    }

    const ManageList = () => {
        return (
            manageProducts.map(manageProduct => {
                return (
                    <React.Fragment>
                        <tbody>
                            <tr>
                                <td>{manageProduct.productName}</td>
                                <td>{manageProduct.weight}</td>
                                <td>{manageProduct.price}</td>
                                <td><EditIcon /> <DeleteIcon onClick={() => deleteProduct(manageProduct._id)} style={{cursor: 'pointer', color: 'red'}} /></td>
                            </tr>
                        </tbody>
                    </React.Fragment>
                )
            })
        )
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
            <div className="mt-5 col-md-9">
                <h1 style={{textAlign: 'center'}}>Manage Product</h1>
                <br/>
                <table className="table w-100">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Weight</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        ManageList()
                    }
                </table>
            </div>
        </div>
    )
};

export default ManageProduct;