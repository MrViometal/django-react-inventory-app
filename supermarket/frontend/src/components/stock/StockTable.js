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

import { filter } from 'fuzzaldrin-plus';
import { Table, Avatar, Text, Pane, TextDropdownButton } from 'evergreen-ui';

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

  filterFunc = (item) => {
    return item.product_code !== 'noCode';
  };

  render() {
    const { stock } = this.props;

    return (
      <Fragment>
        <h2 className='mt-4'>Stock in Market</h2>
        <SmartTable
          columnsNames={{
            C1: 'id',
            C2: 'Name',
            C3: 'Code',
            C4: 'Manufacturer',
            C5: 'Supplier',
            C6: 'Description',
            C7: 'Unit Price',
            C8: 'Quantity',
            C9: '',
            C10: '',
          }}
          width={1100}
          height={400}
          data={stock.sort(this.sortFunc)}
          changeQuantity={this.changeQuantity}
          addStockHandler={this.addStockHandler}
          subtractStockHandler={this.subtractStockHandler}
          deleteProductHandler={this.deleteProductHandler}
          snippetDescription={this.snippetDescription}
        />
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

const entryFields = {
  c1: 'id',
  c2: 'product_name',
  c3: 'product_code',
  c4: 'manufacturer_name',
  c5: 'supplier_name',
  c6: 'product_description',
  c7: 'product_price',
  c8: 'product_quantity',
};

//Ordering options
const Order = {
  NONE: 'NONE',
  ASC: 'ASC',
  DESC: 'DESC',
};

//Component
class SmartTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      orderedColumn: 1,
      ordering: Order.NONE,
    };
  }

  sort = (data) => {
    const { ordering, orderedColumn } = this.state;
    // Return if there's no ordering.
    if (ordering === Order.NONE) return data;

    // Get the property to sort each item on.
    // By default use the `name` property.
    let propKey = entryFields.c1;

    // The second column is dynamic.
    // The third column is fixed to the `ltv` property.
    if (orderedColumn === 2) propKey = entryFields.c2;
    if (orderedColumn === 3) propKey = entryFields.c3;
    if (orderedColumn === 4) propKey = entryFields.c4;
    if (orderedColumn === 5) propKey = entryFields.c5;
    if (orderedColumn === 6) propKey = entryFields.c6;
    if (orderedColumn === 7) propKey = entryFields.c7;
    if (orderedColumn === 8) propKey = entryFields.c8;

    return data.sort((a, b) => {
      let aValue = a[propKey];
      let bValue = b[propKey];

      // Support string comparison
      const sortTable = { true: 1, false: -1 };

      // Order ascending (Order.ASC)
      if (this.state.ordering === Order.ASC) {
        return aValue === bValue ? 0 : sortTable[aValue > bValue];
      }

      // Order descending (Order.DESC)
      return bValue === aValue ? 0 : sortTable[bValue > aValue];
    });
  };

  // Filter the data based on the name property.
  filter = (data) => {
    const searchQuery = this.state.searchQuery.trim();

    // If the searchQuery is empty, return the data as is.
    if (searchQuery.length === 0) return data;

    return data.filter((item) => {
      // Use the filter from fuzzaldrin-plus to filter by name.
      const result = filter([item.product_name], searchQuery);
      return result.length === 1;
    });
  };

  getIconForOrder = (order) => {
    switch (order) {
      case Order.ASC:
        return 'arrow-up';
      case Order.DESC:
        return 'arrow-down';
      default:
        return 'caret-down';
    }
  };

  handleFilterChange = (value) => {
    this.setState({ searchQuery: value });
  };

  renderNColumnName = (name, order) => {
    return (
      <Table.HeaderCell>
        <Pane
          onClick={(value) => {
            if (order)
              this.setState({
                orderedColumn: order,
                ordering: this.state.ordering === 'ASC' ? 'DESC' : 'ASC',
              });
          }}
        >
          {order && (
            <TextDropdownButton
              icon={
                this.state.orderedColumn === order
                  ? this.getIconForOrder(this.state.ordering)
                  : 'caret-down'
              }
            >
              {name}
            </TextDropdownButton>
          )}
        </Pane>
      </Table.HeaderCell>
    );
  };

  renderRow = ({ item }) => {
    return (
      <Table.Row key={item.id} height='auto'>
        {/* <Table.TextCell>{item.id}</Table.TextCell> */}

        <Table.Cell flexBasis={100} alignItems='center'>
          <Avatar name={item.product_name} />
          <Text marginLeft={8} size={300} fontWeight={500}>
            {item.product_name}
          </Text>
        </Table.Cell>

        <Table.TextCell>{item.product_code}</Table.TextCell>
        <Table.TextCell>{item.manufacturer_name}</Table.TextCell>
        <Table.TextCell>{item.supplier_name}</Table.TextCell>
        {/* <Table.TextCell>{item.product_description}</Table.TextCell> */}
        <Table.TextCell>
          {this.props.snippetDescription(item.product_description)}
        </Table.TextCell>
        <Table.TextCell>{`$${item.product_price}`}</Table.TextCell>
        <Table.TextCell>{item.product_quantity}</Table.TextCell>
        <Table.Cell flexBasis={70}>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Amount'
              onChange={(e) => this.props.changeQuantity(e.target.value)}
              style={{ width: '30px' }}
            />
            <div className='input-group-append' id='button-addon4'>
              <button
                onClick={() => this.props.addStockHandler(item)}
                className='btn btn-success btn-sm'
                style={{ width: '30px' }}
              >
                <PlusSquareFill />
              </button>
              <button
                onClick={() => this.props.subtractStockHandler(item)}
                className='btn btn-info btn-sm'
                style={{ width: '30px' }}
              >
                <DashSquareFill />
              </button>
            </div>
          </div>
        </Table.Cell>
        <Table.Cell>
          <button
            onClick={() => this.props.deleteProductHandler(item.id)}
            className='btn btn-danger btn-sm'
          >
            <TrashFill />
          </button>
        </Table.Cell>
      </Table.Row>
    );
  };

  render() {
    const {
      columnsNames: { C1, C2, C3, C4, C5, C6, C7, C8, C9, C10 },
      width,
      height,
      data,
    } = this.props;
    const items = this.filter(this.sort(data));
    return (
      <Table border>
        <Table.Head>
          {/* {this.renderNColumnName(C1, 1)} */}

          {/* {this.renderNColumn(C2, 2)} */}
          <Table.SearchHeaderCell
            flexBasis={100}
            placeholder='Search Name'
            onChange={this.handleFilterChange}
            value={this.state.searchQuery}
          />

          {this.renderNColumnName(C3, 3)}
          {this.renderNColumnName(C4, 4)}
          {this.renderNColumnName(C5, 5)}
          {this.renderNColumnName(C6, 6)}
          {this.renderNColumnName(C7, 7)}
          {this.renderNColumnName(C8, 8)}
          {this.renderNColumnName(C9)}
          {this.renderNColumnName(C10)}
          <Table.HeaderCell width={48} flex='none' />
        </Table.Head>
        <Table.VirtualBody width={width} height={height}>
          {items.map((item) => this.renderRow({ item: item }))}
        </Table.VirtualBody>
      </Table>
    );
  }
}

// ! ****************************\
{
  /* <table className='table table-striped'>
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
    {stock
      .sort(this.sortFunc)
      .filter(this.filterFunc)
      .map((item) => (
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
</table>; */
}
