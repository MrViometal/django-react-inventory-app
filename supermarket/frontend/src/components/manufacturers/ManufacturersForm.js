import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addManufacturer } from '../../redux/actions/manufacturersActions';

const initialState = {
  manufacturer_name: '',
  manufacturer_code: '',
};

export class StockForm extends Component {
  state = initialState;

  static propTypes = {
    // Manufacturers methods
    addManufacturer: PropTypes.func.isRequired,
  };

  //   componentDidMount() {
  //     this.props.getManufacturers();
  //     this.props.getSuppliers();
  //   }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newProduct = this.state;
    this.props.addManufacturer(newProduct);
    this.setState(initialState);
  };

  render() {
    const { manufacturer_name, manufacturer_code } = this.state;

    return (
      <div className='card card-body mt-4 mb-4'>
        <h2>Add Manufacturer</h2>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Manufacturer Name</label>
            <input
              className='form-control'
              type='text'
              name='manufacturer_name'
              onChange={this.onChange}
              value={manufacturer_name}
            />
          </div>
          <div className='form-group'>
            <label>Manufacturer Code</label>
            <input
              className='form-control'
              type='text'
              name='manufacturer_code'
              onChange={this.onChange}
              value={manufacturer_code}
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

// const mapStateToProps = (state) => ({
//   manufacturers: state.manufacturersReducer.manufacturers,
//   suppliers: state.suppliersReducer.suppliers,
// });

export default connect(null, {
  addManufacturer,
})(StockForm);
