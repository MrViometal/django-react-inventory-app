import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import ManufacturersForm from '../components/manufacturers/ManufacturersForm';
import ManufacturersTable from '../components/manufacturers/ManufacturersTable';

const Manufacturers = () => {
  return (
    <AppLayout>
      <ManufacturersForm />
      <ManufacturersTable />
    </AppLayout>
  );
};

export default Manufacturers;
