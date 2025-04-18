import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    // console.log("clientToken", clientToken);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price totalPrice
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            });

        } catch (error) {
            console.log(error);
        }
    }

    //delete item removeCartItem
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart))
            toast.success("you remove an item")
        } catch (error) {
            console.log(error);
        }
    }

    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken || "sandbox_s9gd7m2p_vp62s592633kc5p5")
            console.log(clientToken);
        } catch (error) {
            console.log(error);
            // toast.error(error)
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token])

    //handlePayment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/v1/product/braintree/payment', {
                nonce, cart
            })
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment successfully")
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error)
        }
    }

    // cod function
    const cod = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/cash-on-delivery', {
                cart
            })
            localStorage.removeItem('cart');
            console.log(data);
            setCart([]);
            toast.success("Order successfully")
            navigate("/dashboard/user/orders");
        } catch (error) {
            console.log(error);
            toast.error("error found in cod")
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2 mb-1'>{`hello ${auth?.token && auth?.user?.name}`}</h1>
                        <h4 className='text-center'> {cart?.length ? `You have ${cart?.length} items in your cart ${auth?.token ? "" : "Please login to check out"}` : "your cart is empty"}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {cart?.map((p) => (
                            <div className="row mb-2 p-3 card flex-row">
                                <div className="col-md-4">
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width="100px" height={"100px"} />
                                </div>
                                <div className="col-md-8">
                                    <p>{p.name} </p>
                                    <p>{p.description.substring(0, 20)} </p>
                                    <p>Price:{p.price} </p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout| Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update address</button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update address</button>
                                    ) : (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/login', { state: "/cart" })}>Please login to checkout</button>
                                    )
                                }
                            </div>
                        )}
                        <div className="mt-2">
                            {/* {
                                !cart?.length ? ("Add product") : (
                                    <>
                                        <DropIn options={{ authorization: clientToken || "sandbox_s9gd7m2p_vp62s592633kc5p5", paypal: { flow: "vault" } }} onInstance={instance => setInstance(instance)} />
                                        <button className='btn btn-primary' onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>{loading ? "processing ..." : "Make Payment"}</button>
                                    </>
                                )
                            } */}
                            {cart?.length && <button onClick={cod} className='btn btn-primary'>Cash On delivery</button>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage