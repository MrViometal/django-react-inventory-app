import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSupplier } from '../../redux/actions/suppliersActions';

const initialState = {
  supplier_name: '',
  supplier_code: '',
};

export class SupplierForm extends Component {
  state = initialState;

  static propTypes = {
    // suppliers methods
    addSupplier: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newProduct = this.state;
    this.props.addSupplier(newProduct);
    this.setState(initialState);
  };

  render() {
    const { supplier_name, supplier_code } = this.state;

    return (
      <div className='card card-body mt-4 mb-4'>
        <h2>Add Supplier</h2>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Supplier Name</label>
            <input
              className='form-control'
              type='text'
              name='supplier_name'
              onChange={this.onChange}
              value={supplier_name}
            />
          </div>
          <div className='form-group'>
            <label>Supplier Code</label>
            <input
              className='form-control'
              type='text'
              name='supplier_code'
              onChange={this.onChange}
              value={supplier_code}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className=' btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, {
  addSupplier,
})(SupplierForm);
