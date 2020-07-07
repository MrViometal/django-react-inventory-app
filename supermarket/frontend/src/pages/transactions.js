import React, { Fragment } from 'react';
import AppLayout from '../components/layout/AppLayout';
import StockForm from '../components/stock/StockForm';
import TransactionsTable from '../components/transactions/TransactionTable';

const Products = () => {
  return (
    <AppLayout>
      <TransactionsTable />
    </AppLayout>
  );
};

export default Products;
