import React from 'react';

import Layout from '../Layout';
import DrinkForm from './DrinkForm';
const Admin = () => {

    return (
        <Layout>
            <h1>Admin Dashboard</h1>
            <DrinkForm />
        </Layout>
    )
}

export default Admin;