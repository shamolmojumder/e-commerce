import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div class="list-group">
                    <div>
                        <h4>Admin Dashboard</h4>
                        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create category</NavLink>
                        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create product</NavLink>
                        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminMenu