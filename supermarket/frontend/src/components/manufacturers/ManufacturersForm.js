import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addManufacturer } from '../../redux/actions/manufacturersActions';

const initialState = {
  manufacturer_name: '',
  manufacturer_code: '',
};

export class ManufacturersForm extends Component {
  state = initialState;

  static propTypes = {
    // Manufacturers methods
    addManufacturer: PropTypes.func.isRequired,
  };

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
          <div className='row'>
            <div className='col'>
              <input
                placeholder='Manufacturer Name'
                className='form-control'
                type='text'
                name='manufacturer_name'
                onChange={this.onChange}
                value={manufacturer_name}
              />
            </div>
            <div className='col'>
              <input
                placeholder='Manufacturer Code'
                className='form-control'
                type='text'
                name='manufacturer_code'
                onChange={this.onChange}
                value={manufacturer_code}
              />
            </div>
          </div>

          <div className='form-group mt-3'>
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
  addManufacturer,
})(ManufacturersForm);
