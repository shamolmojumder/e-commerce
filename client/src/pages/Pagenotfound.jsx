import { Link } from 'react-router-dom';
import Layout from './../components/Layout/Layout';
import React from 'react'

const Pagenotfound = () => {
    return (
        <Layout>
            <div className="pnf">
                <h1 className='pnf-title'>404</h1>
                <h2 className=' '>Oops ! Page Not found</h2>
                <Link to="/" className='pnf-btn'>Go back</Link>
            </div>
        </Layout>
    )
}

export default Pagenotfound;