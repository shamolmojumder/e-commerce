import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);


    //initial product detail
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])
    // get product 
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error);
        }
    }

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        console.log(pid, cid);
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products)
            console.log("line34" + data?.products);
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img width="350px" height="300" src={`/api/v1/product/product-photo/${product._id}`} className='card-img-top' alt={product.name} srcset="" />
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>Product details</h1>
                    <h6>Name:{product.name}</h6>
                    <h6>Description:{product.description}</h6>
                    <h6>Price:{product.price}</h6>
                    <h6>Category:{product.category?.name}</h6>
                    <button href="#" className="btn btn-secondary ms-1">Add to card</button>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h6> similar products</h6>
                {relatedProducts.length < 1 && <p className='text-center'>No Similar Product found</p>}
                <div className="d-flex flex-wrap">
                    {
                        relatedProducts?.map((p) => (

                            <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 20)} ...</p>
                                    <p className="card-text text-danger">$ {p.price}</p>
                                    <p className="card-text text-success">{p.category?.name}</p>
                                    <button href="#" className="btn btn-secondary ms-1">Add to card</button>
                                    <button href="#" className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails