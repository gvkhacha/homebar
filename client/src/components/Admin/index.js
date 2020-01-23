import React from 'react';

import { useSelector } from 'react-redux';

import Layout from '../Layout';

const Admin = () => {
    const user = useSelector(state => state.user);

    return (
        <Layout>
            <h1>Admin Dashboard</h1>
        </Layout>
    )
}

export default Admin;