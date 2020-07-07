import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getManufacturers,
  deleteManufacturer,
} from '../../redux/actions/manufacturersActions';

import { TrashFill } from 'react-bootstrap-icons';

export class ManufacturersTable extends Component {
  static propTypes = {
    manufacturers: PropTypes.array.isRequired,

    // Manufacturers methods
    getManufacturers: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getManufacturers();
  }

  deleteManufacturerHandler = (id) => {
    {
      if (confirm('Are you sure you want to delete this?'))
        this.props.deleteManufacturer(id);
    }
  };

  sortFunc = (a, b) => {
    return a.id - b.id;
  };

  filterFunc = (item) => {
    return item.manufacturer_code !== 'noCode';
  };

  render() {
    const { manufacturers } = this.props;

    return (
      <Fragment>
        <h2 className='mt-4'>Manufacturers</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Manufacturer Name</th>
              <th>Manufacturer Code</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {manufacturers
              .sort(this.sortFunc)
              .filter(this.filterFunc)
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id} </td>
                  <td>{item.manufacturer_name}</td>
                  <td>{item.manufacturer_code}</td>

                  <td>
                    <button
                      onClick={() => this.deleteManufacturerHandler(item.id)}
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
  manufacturers: state.manufacturersReducer.manufacturers,
});

export default connect(mapStateToProps, {
  getManufacturers,
  deleteManufacturer,
})(ManufacturersTable);
