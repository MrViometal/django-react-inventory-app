import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStock, deleteStock } from '../../redux/actions/stockActions';

export class StockTable extends Component {
  static propTypes = {
    stock: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getStock();
  }

  render() {
    const { stock, deleteStock, addStock, subtractStock } = this.props;
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

              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.productCode}</td>
                <td>{item.quantity}</td>
                <td>{item.productPrice}</td>
                <td>{item.manufacturerID}</td>
                <td>{item.supplierID}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    onClick={() => addStock(item.id)}
                    className='btn btn-success btn-sm'
                  >
                    Add
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => subtractStock(item.id)}
                    className='btn btn-info btn-sm'
                  >
                    Subtract
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to?'))
                        deleteStock(item.id);
                    }}
                    className='btn btn-danger btn-sm'
                  >
                    DELETE
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

// const TableTemplate = (stock, deleteStock) => {
//   return (
//     <Fragment>
//       <h2>Stock in Market</h2>
//       <table className='table table-striped'>
//         <thead>
//           <tr>
//             <th>ID</th>

//             <th>Name</th>

//             <th>Code</th>

//             <th>Unit Price</th>

//             <th>Quantity</th>

//             <th>Description</th>

//             <th>Manufacturer</th>

//             <th>Supplier</th>

//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {stock.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>{item.productName}</td>
//               <td>{item.productCode}</td>
//               <td>{item.productPrice}</td>
//               <td>{item.quantity}</td>
//               <td>{item.description}</td>
//               <td>{item.manufacturerID}</td>
//               <td>{item.supplierID}</td>
//               <td>
//                 <button
//                   onClick={() => deleteStock(item.id)}
//                   className='btn btn-danger btn-sm'
//                 >
//                   DELETE
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Fragment>
//   );
// };

export default connect(mapStateToProps, { getStock, deleteStock })(StockTable);
