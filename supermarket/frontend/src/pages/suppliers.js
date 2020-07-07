import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import SuppliersForm from '../components/suppliers/SuppliersForm';
import SuppliersTable from '../components/suppliers/SuppliersTable';

const Products = () => {
  return (
    <AppLayout>
      <SuppliersForm />
      <SuppliersTable />
    </AppLayout>
  );
};

export default Products;
