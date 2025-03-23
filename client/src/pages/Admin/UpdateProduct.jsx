import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setCategory(data.product.category);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSingleProduct()
        // eslint-disable-next-line
    }, [])

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
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category._id);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            photo && productData.append("photo", photo);
            const { data } = axios.put(`/api/v1/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.error(data?.message)
            } else {
                toast.success("product updated succssfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong in create option")
        }
    };

    //delete a product
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/product/delete-product/${id}`
            );
            // console.log("data", data);
            toast.success("Product DEleted Succfully");
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - update product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product page</h1>
                        <div className="m-1 w-75">
                            <Select variant={false} placeholder="select a categoy" size='large' showSearch className="form-select mb-3" onChange={(value) => { setCategory(value) }} value={category.name}>
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
                                    photo ?
                                        (
                                            <div className="text-center">
                                                <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className='img img-responsive' />
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="text-center">
                                                <img src={`/api/v1/product/product-photo/${id}`} alt="product_photo" height={"200px"} className='img img-responsive' />
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
                                <Select variant={false} placeholder="select shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => { setShipping(value) }} value={shipping ? "Yes" : "No"}>
                                    <options value="0"> No </options>
                                    <options value="1"> Yes </options>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct;