import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarTogglerDemo01'
          aria-controls='navbarTogglerDemo01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
          <Link className='navbar-brand' exact to={'/'}>
            Supermarket Stock Manager
          </Link>

          <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' exact to={'/'}>
                Products
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' exact to={'/manufacturers'}>
                Manufacturers
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' exact to={'/suppliers'}>
                Suppliers
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' exact to={'/transactions'}>
                Transactions
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;

// navbar navbar-dark bg-dark
