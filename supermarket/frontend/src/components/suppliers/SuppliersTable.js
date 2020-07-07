import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getSuppliers,
  deleteSupplier,
} from '../../redux/actions/suppliersActions';

import { TrashFill } from 'react-bootstrap-icons';

export class SuppliersTable extends Component {
  static propTypes = {
    suppliers: PropTypes.array.isRequired,

    //Supplier methods
    getSuppliers: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSuppliers();
  }

  deleteSupplierHandler = (id) => {
    {
      if (confirm('Are you sure you want to delete this?'))
        this.props.deleteSupplier(id);
    }
  };

  sortFunc = (a, b) => {
    return a.id - b.id;
  };

  filterFunc = (item) => {
    return item.supplier_code !== 'noCode';
  };

  render() {
    const { suppliers } = this.props;

    return (
      <Fragment>
        <h2 className='mt-4'>Suppliers</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier Name</th>
              <th>Supplier Code</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {suppliers
              .sort(this.sortFunc)
              .filter(this.filterFunc)
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id} </td>
                  <td>{item.supplier_name}</td>
                  <td>{item.supplier_code}</td>

                  <td>
                    <button
                      onClick={() => this.deleteSupplierHandler(item.id)}
                      className='btn btn-danger btn-sm'
                    >
                      <TrashFill />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  suppliers: state.suppliersReducer.suppliers,
});

export default connect(mapStateToProps, {
  getSuppliers,
  deleteSupplier,
})(SuppliersTable);
