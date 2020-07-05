import React, { Fragment } from 'react';
import StockTable from './StockTable';
import StockForm from './StockForm';

export default function Dashboard() {
  return (
    <Fragment>
      <StockForm />
      <StockTable />
    </Fragment>
  );
}
