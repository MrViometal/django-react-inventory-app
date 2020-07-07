import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import StockForm from '../components/stock/StockForm';
import StockTable from '../components/stock/StockTable';

const Products = () => {
  return (
    <AppLayout>
      <StockForm />
      <StockTable />
    </AppLayout>
  );
};

export default Products;
