import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <div>
                        <h4>Admin Dashboard</h4>
                        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create category</NavLink>
                        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create product</NavLink>
                        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
                        <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Orders</NavLink>
                        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminMenu