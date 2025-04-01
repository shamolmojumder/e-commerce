import React from 'react'
import Layout from "./../components/Layout/Layout";
import { useSearch } from '../context/search';
const Search = () => {
    const [values, setValues] = useSearch();
    console.log(values);
    return (
        <Layout title={"search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search results</h1>
                    <h6> {values?.results.length < 1 ? "no product found" : `found ${values.results.length}`} </h6>
                    <div className="d-flex flex-wrap">
                        {
                            values.results?.map((p) => (

                                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 20)} ...</p>
                                        <p className="card-text text-danger">$ {p.price}</p>


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
    )
}

export default Search