import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getStock,
  deleteStock,
  addStock,
  subtractStock,
} from '../../redux/actions/stockActions';
import { getManufacturers } from '../../redux/actions/manufacturersActions';
import { getSuppliers } from '../../redux/actions/suppliersActions';

import {
  TrashFill,
  PlusSquareFill,
  DashSquareFill,
} from 'react-bootstrap-icons';

export class StockTable extends Component {
  state = {
    quantity: 0,
  };
  static propTypes = {
    stock: PropTypes.array.isRequired,

    // Stock methods
    getStock: PropTypes.func.isRequired,
    addStock: PropTypes.func.isRequired,
    subtractStock: PropTypes.func.isRequired,
    deleteStock: PropTypes.func.isRequired,

    // Manufacturers methods
    getManufacturers: PropTypes.func.isRequired,

    // Suppliers methods
    getSuppliers: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getManufacturers();
    this.props.getSuppliers();
    this.props.getStock();
  }

  deleteStockHandler = (id) => {
    {
      if (confirm('Are you sure you want to delete this?'))
        this.props.deleteStock(id);
    }
  };

  addStockHandler = (item) => {
    const { quantity: inputQuantity } = this.state;
    const total = Number(item.quantity) + Number(inputQuantity);
    if (inputQuantity)
      if (total > 10000) {
        alert(`Quantity can't be more than 1000`);
      } else {
        if (
          confirm(
            `are you sure you want to add ${inputQuantity} items? total will be ${total}`,
          )
        ) {
          this.props.addStock(item.id, {
            ...item,
            quantity: item.quantity + Number(inputQuantity),
          });
        }
      }
  };

  subtractStockHandler = (item) => {
    const { quantity: inputQuantity } = this.state;
    const total = Number(item.quantity) - Number(inputQuantity);
    if (inputQuantity)
      if (total < 0) {
        alert(`Quantity can't be less than 0`);
      } else {
        if (
          confirm(
            `are you sure you want to add ${inputQuantity} items? total will be ${total}`,
          )
        ) {
          this.props.subtractStock(item.id, {
            ...item,
            quantity: item.quantity - Number(inputQuantity),
          });
        }
      }
  };

  changeQuantity = (value) => {
    this.setState({ quantity: value });
    console.log(this.state.quantity);
  };

  render() {
    const { stock, manufacturers, suppliers } = this.props;
    let JoinedTable;

    if (manufacturers.length && suppliers.length) {
      JoinedTable = stock
        .sort(function (a, b) {
          return a.id - b.id;
        })
        .map((item) => (
          <tr key={item.id}>
            <td>{item.id} </td>
            <td>{item.productName}</td>
            <td>{item.productCode}</td>
            <td>{item.quantity}</td>
            <td>{`$${item.productPrice}`}</td>
            <td>
              {
                manufacturers.find(
                  (person) => person.id === item.manufacturerID,
                ).manufacturerName
              }
            </td>
            <td>
              {
                suppliers.find((person) => person.id === item.supplierID)
                  .supplierName
              }
            </td>
            <td>
              {item.description.length < 20
                ? item.description
                : item.description.substr(0, 20) + '...'}
            </td>
            <td>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Quantity'
                  onChange={(e) => this.changeQuantity(e.target.value)}
                  style={{ width: '50px' }}
                />
                <div className='input-group-append' id='button-addon4'>
                  <button
                    onClick={() => this.addStockHandler(item)}
                    className='btn btn-success btn-sm'
                    style={{ width: '50px' }}
                  >
                    <PlusSquareFill />
                  </button>
                  <button
                    onClick={() => this.subtractStockHandler(item)}
                    className='btn btn-info btn-sm'
                    style={{ width: '50px' }}
                  >
                    <DashSquareFill />
                  </button>
                </div>
              </div>
            </td>

            <td>
              <button
                onClick={() => this.deleteStockHandler(item.id)}
                className='btn btn-danger btn-sm'
              >
                <TrashFill />
              </button>
            </td>
          </tr>
        ));
    }
    return (
      <Fragment>
        <h2>Stock in Market</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Manufacturer</th>
              <th>Supplier</th>
              <th>Description</th>
              <th>Change Quantity</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {JoinedTable ? (
              JoinedTable
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  stock: state.stockReducer.stock,
  manufacturers: state.manufacturersReducer.manufacturers,
  suppliers: state.suppliersReducer.suppliers,
});

export default connect(mapStateToProps, {
  getStock,
  getManufacturers,
  getSuppliers,
  deleteStock,
  addStock,
  subtractStock,
})(StockTable);

{
  /* {stock
              .sort(function (a, b) {
                return a.id - b.id;
              })
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id} </td>
                  <td>{item.productName}</td>
                  <td>{item.productCode}</td>
                  <td>{item.quantity}</td>
                  <td>{`$${item.productPrice}`}</td>
                  <td>{item.manufacturerID}</td>
                  // {/* {console.log(
                  //     manufacturers.find(
                  //       (person) => person.id === item.manufacturerID,
                  //     ).manufacturerName,
                  //   )} 
                  <td>{item.supplierID}</td>
                  <td>
                    {item.description.length < 20
                      ? item.description
                      : item.description.substr(0, 20) + '...'}
                  </td>
                  <td>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Quantity'
                        onChange={(e) => this.changeQuantity(e.target.value)}
                        style={{ width: '50px' }}
                      />
                      <div className='input-group-append' id='button-addon4'>
                        <button
                          onClick={() => this.addStockHandler(item)}
                          className='btn btn-success btn-sm'
                          style={{ width: '50px' }}
                        >
                          <PlusSquareFill />
                        </button>
                        <button
                          onClick={() => this.subtractStockHandler(item)}
                          className='btn btn-info btn-sm'
                          style={{ width: '50px' }}
                        >
                          <DashSquareFill />
                        </button>
                      </div>
                    </div>
                  </td>

                  <td>
                    <button
                      onClick={() => this.deleteStockHandler(item.id)}
                      className='btn btn-danger btn-sm'
                    >
                      <TrashFill />
                    </button>
                  </td>
                </tr>
              ))} */
}
