import React from 'react';
import { filter } from 'fuzzaldrin-plus';
import { Table, Avatar, Text, Pane, TextDropdownButton } from 'evergreen-ui';

const entryFields = {
  c1: 'id',
  c2: 'manufacturer_name',
  c3: 'manufacturer_code',
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

    // TODO: make that change when you finish
    // The second column is dynamic.
    // The third column is fixed to the `ltv` property.
    if (orderedColumn === 2) propKey = entryFields.c2;
    if (orderedColumn === 3) propKey = entryFields.c3;

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
      const result = filter([item.manufacturer_name], searchQuery);
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
          <Avatar name={item.manufacturer_name} />
          <Text marginLeft={8} size={300} fontWeight={500}>
            {item.manufacturer_name}
          </Text>
        </Table.Cell>

        <Table.TextCell>{item.manufacturer_code}</Table.TextCell>
      </Table.Row>
    );
  };

  render() {
    const {
      columnsNames: { C1, C2, C3 },
      width,
      height,
      data,
    } = this.props;
    const items = this.filter(this.sort(data));
    return (
      <Table border>
        <Table.Head>
          {this.renderNColumnName(C1, 1)}

          <Table.SearchHeaderCell
            onChange={this.handleFilterChange}
            value={this.state.searchQuery}
          />

          {/* {this.renderNColumn(C2, 2)} */}
          {this.renderNColumnName(C3, 3)}
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
