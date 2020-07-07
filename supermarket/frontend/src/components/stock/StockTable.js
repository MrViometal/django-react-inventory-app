import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getProducts,
  deleteProduct,
  addStock,
  subtractStock,
} from '../../redux/actions/stockActions';
import {
  positiveTransaction,
  negativeTransaction,
} from '../../redux/actions/transactionsActions';

import {
  TrashFill,
  PlusSquareFill,
  DashSquareFill,
} from 'react-bootstrap-icons';

export class StockTable extends Component {
  state = {
    inputQuantity: 0,
  };
  static propTypes = {
    stock: PropTypes.array.isRequired,

    // Stock methods
    getProducts: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    addStock: PropTypes.func.isRequired,
    subtractStock: PropTypes.func.isRequired,

    // Transactions methods
    positiveTransaction: PropTypes.func.isRequired,
    negativeTransaction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getProducts();
  }

  deleteProductHandler = (id) => {
    {
      if (confirm('Are you sure you want to delete this?'))
        this.props.deleteProduct(id);
    }
  };

  addStockHandler = (item) => {
    const { inputQuantity } = this.state;
    const total = Number(item.product_quantity) + Number(inputQuantity);
    if (inputQuantity)
      if (total > 10000) {
        alert(`Quantity can't be more than 10,000`);
      } else {
        if (
          confirm(
            `are you sure you want to add ${inputQuantity} items? total will be ${total}`,
          )
        ) {
          this.props.addStock(item.id, {
            ...item,
            product_quantity: item.product_quantity + Number(inputQuantity),
          });
          this.props.positiveTransaction(item.id, Number(inputQuantity));
        }
      }
  };

  subtractStockHandler = (item) => {
    const { inputQuantity } = this.state;
    const total = Number(item.product_quantity) - Number(inputQuantity);
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
            product_quantity: item.product_quantity - Number(inputQuantity),
          });
          this.props.negativeTransaction(item.id, Number(inputQuantity));
        }
      }
  };

  changeQuantity = (value) => {
    this.setState({ inputQuantity: value });
  };

  snippetDescription = (str) => {
    return str.length < 20 ? str : str.substr(0, 20) + '...';
  };

  sortFunc = (a, b) => {
    return a.id - b.id;
  };

  render() {
    const { stock } = this.props;

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
            {stock.sort(this.sortFunc).map((item) => (
              <tr key={item.id}>
                <td>{item.id} </td>
                <td>{item.product_name}</td>
                <td>{item.product_code}</td>
                <td>{item.product_quantity}</td>
                <td>{`$${item.product_price}`}</td>
                <td>{item.manufacturer_name}</td>
                <td>{item.supplier_name}</td>

                <td>{this.snippetDescription(item.product_description)}</td>
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
                    onClick={() => this.deleteProductHandler(item.id)}
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
  stock: state.stockReducer.stock,
});

export default connect(mapStateToProps, {
  getProducts,
  deleteProduct,
  addStock,
  subtractStock,
  positiveTransaction,
  negativeTransaction,
})(StockTable);
