import React, { Fragment } from 'react';
import Header from './Header';
import Alerts from './Alerts';

const AppLayout = ({ children }) => (
  <Fragment>
    <Header />
    <Alerts />
    <div className='container'>{children}</div>
  </Fragment>
);

export default AppLayout;
