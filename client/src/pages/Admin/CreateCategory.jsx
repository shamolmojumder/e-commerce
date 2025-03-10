import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategories();
                // setName("")

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form")
        }
    }
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
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories?.map((c) => (
                                            <>
                                                <tr>
                                                    <td key={c._id}> {c.name}</td>
                                                    <td>
                                                        <button className='btn btn-primary ms-2'>Edit</button>
                                                        <button className='btn btn-danger ms-2'>Delete</button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    }
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