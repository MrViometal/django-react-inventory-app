import React, { Fragment } from 'react';
import StockTable from './StockTable';
import StockForm from './StockForm';
import TransactionsTable from '../transactions/TransactionTable';
import ManufacturersTable from '../manufacturers/ManufacturersTable';
import ManufacturersForm from '../manufacturers/ManufacturersForm';
import SuppliersTable from '../suppliers/SuppliersTable';
import SuppliersForm from '../suppliers/SuppliersForm';

export default function Dashboard() {
  return (
    <Fragment>
      <StockForm />
      <StockTable />

      <TransactionsTable />

      <ManufacturersForm />
      <ManufacturersTable />

      <SuppliersForm />
      <SuppliersTable />
    </Fragment>
  );
}
