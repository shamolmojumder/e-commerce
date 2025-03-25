import React from "react";
import Layout from "./../components/Layout/Layout";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Checkbox, Radio } from 'antd';
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([])
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
    getAllCategories()
  }, [])

  //get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
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
    getAllProducts()
  }, [])
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
        </div>
        <div className="col-md-9">
          {JSON.stringify(radio, null, 4)}
          <h1 className="text-center"> All products</h1>
          <div className="d-flex flex-wrap">
            {
              products?.map((p) => (

                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text text-success">{p.category.name}</p>
                    <button href="#" className="btn btn-primary ms-1">More details</button>
                    <button href="#" className="btn btn-secondary ms-1">Add to card</button>

                  </div>
                </div>

              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
