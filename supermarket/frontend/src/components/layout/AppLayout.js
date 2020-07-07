import React, { Fragment } from 'react';
import Header from './Header';

const AppLayout = ({ children }) => (
  <Fragment>
    <Header />
    <div className='container'>{children}</div>
  </Fragment>
);

export default AppLayout;
