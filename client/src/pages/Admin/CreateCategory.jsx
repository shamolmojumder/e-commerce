import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from 'axios';
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong to getting all categories")
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <Layout title={"Dashboard - create category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage CreateCategory </h1>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {
                                            categories.map((c) => (
                                                <td key={c._id}> {c.name} </td>
                                            ))
                                        }
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory