import React, { Fragment } from 'react';
import StockTable from './StockTable';
import StockForm from './StockForm';
import TransactionsTable from '../transactions/TransactionTable';

export default function Dashboard() {
  return (
    <Fragment>
      <StockForm />
      <StockTable />
      <TransactionsTable />
    </Fragment>
  );
}
