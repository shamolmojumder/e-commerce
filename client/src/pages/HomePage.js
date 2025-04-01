import React from "react";
import Layout from "./../components/Layout/Layout";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Checkbox, Radio } from 'antd';
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(categories);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category')
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, [])

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      setTotal(data?.total)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page])

  //load more 
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }



  //handle by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();

  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio])
  //get filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={"All products - Best offers "}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter by category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* //filter by price */}
          <h4 className="text-center mt-4">Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}> {p.name} </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={() => window.location.reload()}>Reset the filter</button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center"> All products</h1>
          <div className="d-flex flex-wrap">
            {
              products?.map((p) => (

                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 20)} ...</p>
                    <p className="card-text text-danger">$ {p.price}</p>
                    <p className="card-text text-success">{p.category?._id}</p>
                    <button href="#" className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                    <button href="#" className="btn btn-secondary ms-1">Add to card</button>

                  </div>
                </div>

              ))
            }
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-warning" onClick={(e) => {
                e.preventDefault();
                setPage(page + 1)
              }}>
                {loading ? "Loading..." : "load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
