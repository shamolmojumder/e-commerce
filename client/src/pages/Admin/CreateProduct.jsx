import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

// import { Option } from "Select";
const CreateProduct = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");


    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong to getting all categories")
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    //handle create funtion
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            productData.append("photo", photo);
            const { data } = axios.post("/api/v1/product/create-product", productData);
            if (data?.success) {
                toast.error(data?.message)
            } else {
                toast.success("product created succssfully");
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong in create option")
        }
    }
    return (
        <Layout title={"Dashboard - create product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>create product</h1>
                        <div className="m-1 w-75">
                            <Select bordered={false} placeholder="select a categoy" size='large' showSearch className="form-select mb-3" onChange={(value) => { setCategory(value) }}>
                                {
                                    categories?.map(c => (
                                        <options key={c._id} value={c._id}> {c.name} </options>
                                    ))
                                }
                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "upload photo"}
                                    <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className="mb-3">
                                {
                                    photo && (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className='img img-responsive' />
                                        </div>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder='write a name' className='form-control' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <textarea type="text" value={description} placeholder='write a description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={price} placeholder='write a price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={quantity} placeholder='write a quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Select bordered={false} placeholder="select shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => { setShipping(value) }}>
                                    <options value="0"> No </options>
                                    <options value="1"> Yes </options>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default CreateProduct