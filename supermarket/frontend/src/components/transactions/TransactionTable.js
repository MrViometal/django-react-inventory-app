import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getProducts,
  deleteProduct,
  addStock,
  subtractStock,
} from '../../redux/actions/stockActions';
// import { getTransactions } from '../../redux/actions/transactionsActions';
import {
  getTransactions,
  negativeTransaction,
  positiveTransaction,
} from '../../redux/actions/transactionsActions';

// import {
//   TrashFill,
//   PlusSquareFill,
//   DashSquareFill,
// } from 'react-bootstrap-icons';

export class TransactionsTable extends Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired,
    // // Stock methods
    // getProducts: PropTypes.func.isRequired,
    // deleteProduct: PropTypes.func.isRequired,
    // addStock: PropTypes.func.isRequired,
    // subtractStock: PropTypes.func.isRequired,
    // Transactions methods
    // positiveTransaction: PropTypes.func.isRequired,
    // negativeTransaction: PropTypes.func.isRequired,
    getTransactions: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getTransactions();
  }

  // deleteProductHandler = (id) => {
  //   {
  //     if (confirm('Are you sure you want to delete this?'))
  //       this.props.deleteProduct(id);
  //   }
  // };

  // addStockHandler = (item) => {
  //   const { inputQuantity } = this.state;
  //   const total = Number(item.product_quantity) + Number(inputQuantity);
  //   if (inputQuantity)
  //     if (total > 10000) {
  //       alert(`Quantity can't be more than 10,000`);
  //     } else {
  //       if (
  //         confirm(
  //           `are you sure you want to add ${inputQuantity} items? total will be ${total}`,
  //         )
  //       ) {
  //         this.props.addStock(item.id, {
  //           ...item,
  //           product_quantity: item.product_quantity + Number(inputQuantity),
  //         });
  //         this.props.positiveTransaction(item.id, Number(inputQuantity));
  //       }
  //     }
  // };

  // subtractStockHandler = (item) => {
  //   const { inputQuantity } = this.state;
  //   const total = Number(item.product_quantity) - Number(inputQuantity);
  //   if (inputQuantity)
  //     if (total < 0) {
  //       alert(`Quantity can't be less than 0`);
  //     } else {
  //       if (
  //         confirm(
  //           `are you sure you want to add ${inputQuantity} items? total will be ${total}`,
  //         )
  //       ) {
  //         this.props.subtractStock(item.id, {
  //           ...item,
  //           product_quantity: item.product_quantity - Number(inputQuantity),
  //         });
  //         this.props.negativeTransaction(item.id, Number(inputQuantity));
  //       }
  //     }
  // };

  // changeQuantity = (value) => {
  //   this.setState({ inputQuantity: value });
  // };

  // snippetDescription = (str) => {
  //   return str.length < 20 ? str : str.substr(0, 20) + '...';
  // };

  sortFunc = (a, b) => {
    return a.id - b.id;
  };

  render() {
    const { transactions } = this.props;

    return (
      <Fragment>
        <h2 className='mt-4'>Transactions Records</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Transaction Type</th>
              <th>Transaction Amount</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {transactions.sort(this.sortFunc).map((item) => (
              <tr key={item.id}>
                <td>{item.id} </td>
                <td>{item.product_name}</td>
                <td>{item.transaction_type}</td>
                <td>{`${item.transaction_amount} Units`}</td>

                {/* <td>
                  <button
                    onClick={() => this.deleteProductHandler(item.id)}
                    className='btn btn-danger btn-sm'
                  >
                    <TrashFill />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactionsReducer.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
})(TransactionsTable);
