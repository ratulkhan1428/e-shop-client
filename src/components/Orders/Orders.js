import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [productData, setProductData] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/orders')
        .then(res => res.json())
        .then(data => setOrders(data));
    }, [])

    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // useEffect(() => {
    //     fetch('http://localhost:3001/orders?email='+loggedInUser.email, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             authorization: `Bearer ${sessionStorage.getItem('token')}`
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => setOrders(data));
    // }, [])

    const orderList = () => {
        return (
            orders.map(order => {
                return (
                    <React.Fragment>
                        <tbody>
                            <tr>
                                <td>{order.productName}</td>
                                <td>{(new Date(order.orderDate).toDateString('dd/MM/yyyy'))}</td>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.price}</td>
                            </tr>
                        </tbody>
                    </React.Fragment>
                )
            })
        )
    }

    return (
        <div className="container mt-5">
            <table className="table w-100">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Ordered Date</th>
                        <th>Ordered By</th>
                        <th>Email Address</th>
                        <th>Price</th>
                    </tr>
                </thead>
                {
                    orderList()
                }
            </table>
        </div>
    )

    // return (
    //     <div>
    //         <h3>You have: {orders.length} orders</h3>
    //         {
    //             orders.map(order => <li key={order._id}>{order.name} {(new Date(order.orderDate).toDateString('dd/MM/yyyy'))}</li>)
    //         }
    //     </div>
    // );
};

export default Orders;