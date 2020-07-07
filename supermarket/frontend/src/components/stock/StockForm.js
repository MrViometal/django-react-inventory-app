import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getManufacturers } from '../../redux/actions/manufacturersActions';
import { getSuppliers } from '../../redux/actions/suppliersActions';
import { addProduct } from '../../redux/actions/stockActions';

const initialState = {
  product_name: '',
  product_code: '',
  product_price: 0,
  product_quantity: 0,
  product_description: '',
  product_manufacturer: 1,
  product_supplier: 1,
};

export class StockForm extends Component {
  state = initialState;

  static propTypes = {
    // Manufacturers methods
    getManufacturers: PropTypes.func.isRequired,

    // Suppliers methods
    getSuppliers: PropTypes.func.isRequired,

    // Products methods
    addProduct: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getManufacturers();
    this.props.getSuppliers();
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newProduct = this.state;
    this.props.addProduct(newProduct);
    this.setState(initialState);
  };

  filterFunc = (item) => {
    return (
      item.manufacturer_code !== 'noCode' && item.supplier_code !== 'noCode'
    );
  };
  render() {
    const {
      product_name,
      product_code,
      product_price,
      product_quantity,
      product_description,
    } = this.state;
    const { manufacturers, suppliers } = this.props;

    return (
      <div className='card card-body mt-4 mb-4'>
        <h2>Add Product</h2>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Product Name</label>
            <input
              className='form-control'
              type='text'
              name='product_name'
              onChange={this.onChange}
              value={product_name}
            />
          </div>
          <div className='form-group'>
            <label>Product Code</label>
            <input
              className='form-control'
              type='text'
              name='product_code'
              onChange={this.onChange}
              value={product_code}
            />
          </div>
          <div className='form-group'>
            <label>Product Price</label>
            <input
              className='form-control'
              type='number'
              name='product_price'
              onChange={this.onChange}
              value={product_price}
            />
          </div>

          <div className='form-group'>
            <label>Product Quantity</label>
            <input
              className='form-control'
              type='number'
              name='product_quantity'
              onChange={this.onChange}
              value={product_quantity}
            />
          </div>

          <div className='form-group'>
            <label>Product Description</label>
            <input
              className='form-control'
              type='text'
              name='product_description'
              onChange={this.onChange}
              value={product_description}
            />
          </div>

          {manufacturers && (
            <div className='form-group'>
              <label>Product Manufacturer </label>

              <select
                name='product_manufacturer'
                id='product_manufacturer'
                onChange={this.onChange}
              >
                {manufacturers.filter(this.filterFunc).map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.manufacturer_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {suppliers && (
            <div className='form-group'>
              <label>Product Supplier </label>

              <select
                name='product_supplier'
                id='product_supplier'
                onChange={this.onChange}
              >
                {suppliers.filter(this.filterFunc).map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.supplier_name}
                  </option>
                ))}
              </select>
            </div>
          )}

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

const mapStateToProps = (state) => ({
  manufacturers: state.manufacturersReducer.manufacturers,
  suppliers: state.suppliersReducer.suppliers,
});

export default connect(mapStateToProps, {
  addProduct,
  getManufacturers,
  getSuppliers,
})(StockForm);
