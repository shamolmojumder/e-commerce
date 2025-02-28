import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const CreateCategory = () => {
    return (
        <Layout title={"Dashboard - create category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>create CreateCategory </h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory