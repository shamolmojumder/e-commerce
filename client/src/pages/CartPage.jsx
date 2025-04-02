import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    return (
        <Layout>
            <div className="container">
                <div className="col-md-12">
                    <h1 className='text-center bg-light p-2 mb-1'>{`hello ${auth?.token && auth?.user?.name}`}</h1>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage