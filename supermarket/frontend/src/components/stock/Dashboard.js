import React, { Fragment } from 'react';
import StockTable from './StockTable';
import StockForm from './StockForm';
import TransactionsTable from '../transactions/TransactionTable';
import ManufacturersTable from '../manufacturers/ManufacturersTable';
import ManufacturersForm from '../manufacturers/ManufacturersForm';

export default function Dashboard() {
  return (
    <Fragment>
      <StockForm />
      <StockTable />
      <TransactionsTable />
      <ManufacturersForm />
      <ManufacturersTable />
    </Fragment>
  );
}
