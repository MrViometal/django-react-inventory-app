import React from 'react';
import { filter } from 'fuzzaldrin-plus';
import { Table, Avatar, Text, Pane, TextDropdownButton } from 'evergreen-ui';

const entryFields = {
  c1: 'id',
  c2: 'product_name',
  c3: 'product_code',
  c4: 'manufacturer_name',
  c5: 'supplier_name',
  c6: 'product_description',
  c7: 'product_price',
  c8: 'product_Quantity',
};

//Ordering options
const Order = {
  NONE: 'NONE',
  ASC: 'ASC',
  DESC: 'DESC',
};

//Component
class QuestionnairesTable extends React.Component {
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

  renderNColumn = (name, order) => {
    return (
      <Table.HeaderCell>
        <Pane
          onClick={(value) => {
            this.setState({
              orderedColumn: order,
              ordering: this.state.ordering === 'ASC' ? 'DESC' : 'ASC',
            });
          }}
        >
          <TextDropdownButton
            icon={
              this.state.orderedColumn === order
                ? this.getIconForOrder(this.state.ordering)
                : 'caret-down'
            }
          >
            {name}
          </TextDropdownButton>
        </Pane>
      </Table.HeaderCell>
    );
  };
  //   renderFirstColumn = (name) => {
  //     return (
  //       <Table.HeaderCell>
  //         <Pane
  //           onClick={(value) => {
  //             this.setState({
  //               orderedColumn: 2,
  //               ordering: this.state.ordering === 'ASC' ? 'DESC' : 'ASC',
  //             });
  //           }}
  //         >
  //           <TextDropdownButton
  //             icon={
  //               this.state.orderedColumn === 2
  //                 ? this.getIconForOrder(this.state.ordering)
  //                 : 'caret-down'
  //             }
  //           >
  //             {name}
  //           </TextDropdownButton>
  //         </Pane>
  //       </Table.HeaderCell>
  //     );
  //   };

  //   renderSecondColumn = (name) => {
  //     return (
  //       <Table.TextHeaderCell>
  //         <Table.HeaderCell>
  //           <Pane
  //             onClick={(value) => {
  //               this.setState({
  //                 orderedColumn: 3,
  //                 ordering: this.state.ordering === 'ASC' ? 'DESC' : 'ASC',
  //               });
  //             }}
  //           >
  //             <TextDropdownButton
  //               icon={
  //                 this.state.orderedColumn === 3
  //                   ? this.getIconForOrder(this.state.ordering)
  //                   : 'caret-down'
  //               }
  //             >
  //               {name}
  //             </TextDropdownButton>
  //           </Pane>
  //         </Table.HeaderCell>
  //       </Table.TextHeaderCell>
  //     );
  //   };

  renderRow = ({ item }) => {
    return (
      <Table.Row key={item.id}>
        <Table.Cell display='flex' alignItems='center'>
          <Text marginLeft={8} size={300} fontWeight={500}>
            {item.product_name}
          </Text>
        </Table.Cell>
        <Table.TextCell>{item.product_code}</Table.TextCell>
        <Table.TextCell isNumber>{item.columnTwo}</Table.TextCell>
        {/* <Table.Cell width={48} flex='none'>
          <Popover
            content={this.renderRowMenu}
            position={Position.BOTTOM_RIGHT}
          >
            <IconButton icon='more' height={24} appearance='minimal' />
          </Popover>
        </Table.Cell> */}
      </Table.Row>
    );
  };

  render() {
    const {
      columnsNames: { C1, C2 },
      width,
      height,
      data,
    } = this.props;
    const items = this.filter(this.sort(data));
    return (
      <Table border>
        <Table.Head>
          <Table.SearchHeaderCell
            onChange={this.handleFilterChange}
            value={this.state.searchQuery}
          />
          {this.renderFirstColumn(C1)}
          {this.renderSecondColumn(C2)}
          <Table.HeaderCell width={48} flex='none' />
        </Table.Head>
        <Table.VirtualBody width={width} height={height}>
          {items.map((item) => this.renderRow({ item: item }))}
        </Table.VirtualBody>
      </Table>
    );
  }
}

export default QuestionnairesTable;

//! *********************************************************************

import React from 'react';
import { filter } from 'fuzzaldrin-plus';
import { Table, Avatar, Text, Pane, TextDropdownButton } from 'evergreen-ui';

const entryFields = {
  c1: 'id',
  c2: 'product_name',
  c3: 'product_code',
  c4: 'manufacturer_name',
  c5: 'supplier_name',
  c6: 'product_description',
  c7: 'product_price',
  c8: 'product_Quantity',
};

//Ordering options
const Order = {
  NONE: 'NONE',
  ASC: 'ASC',
  DESC: 'DESC',
};

//Component
class QuestionnairesTable extends React.Component {
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
            this.setState({
              orderedColumn: order,
              ordering: this.state.ordering === 'ASC' ? 'DESC' : 'ASC',
            });
          }}
        >
          <TextDropdownButton
            icon={
              this.state.orderedColumn === order
                ? this.getIconForOrder(this.state.ordering)
                : 'caret-down'
            }
          >
            {name}
          </TextDropdownButton>
        </Pane>
      </Table.HeaderCell>
    );
  };

  renderRow = ({ item }) => {
    return (
      <Table.Row key={item.id}>
        <Table.TextCell>{item.id}</Table.TextCell>

        <Table.Cell display='flex' alignItems='center'>
          <Avatar name={item.product_name} />
          <Text marginLeft={8} size={300} fontWeight={500}>
            {item.product_name}
          </Text>
        </Table.Cell>

        <Table.TextCell>{item.product_code}</Table.TextCell>
        <Table.TextCell>{item.manufacturer_name}</Table.TextCell>
        <Table.TextCell>{item.supplier_name}</Table.TextCell>
        <Table.TextCell>
          {this.snippetDescription(item.product_description)}
        </Table.TextCell>
        <Table.TextCell>{`$${item.product_price}`}</Table.TextCell>
        <Table.TextCell>{item.product_Quantity}</Table.TextCell>
        <Table.TextCell>
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
        </Table.TextCell>
        <Table.TextCell>
          <button
            onClick={() => this.deleteProductHandler(item.id)}
            className='btn btn-danger btn-sm'
          >
            <TrashFill />
          </button>
        </Table.TextCell>
      </Table.Row>
    );
  };

  render() {
    const {
      columnsNames: { C1, C2, C3, C4, C5, C6, C7, C8 },
      width,
      height,
      data,
    } = this.props;
    const items = this.filter(this.sort(data));
    return (
      <Table border>
        <Table.Head>
          {this.renderNColumnName(C1, 1)}

          {/* {this.renderNColumn(C2, 2)} */}
          <Table.SearchHeaderCell
            onChange={this.handleFilterChange}
            value={this.state.searchQuery}
          />

          {this.renderNColumnName(C3, 3)}
          {this.renderNColumnName(C4, 4)}
          {this.renderNColumnName(C5, 5)}
          {this.renderNColumnName(C6, 6)}
          {this.renderNColumnName(C7, 7)}
          {this.renderNColumnName(C8, 8)}
          <Table.HeaderCell width={48} flex='none' />
        </Table.Head>
        <Table.VirtualBody width={width} height={height}>
          {items.map((item) => this.renderRow({ item: item }))}
        </Table.VirtualBody>
      </Table>
    );
  }
}

export default QuestionnairesTable;
