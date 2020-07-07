import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    const {
      error: {
        msg: {
          //products fields
          product_name,
          product_code,
          product_quantity,
          product_price,
          product_description,
          product_manufacturer,
          product_supplier,

          //manufacturers fields
          manufacturer_name,
          manufacturer_code,

          //suppliers fields
          supplier_name,
          supplier_code,
        },
      },
      message: {
        addProduct,
        deleteProduct,

        addStock,
        subtractStock,

        addManufacturer,
        deleteManufacturer,

        addSupplier,
        deleteSupplier,
      },
    } = this.props;

    if (error !== prevProps.error) {
      if (product_name) alert.error(`Product Name: ${product_name.join()}`);

      if (product_code) alert.error(`Product Code: ${product_code.join()}`);

      if (product_quantity)
        alert.error(`Product Quantity: ${product_quantity.join()}`);

      if (product_price) alert.error(`Product Price: ${product_price.join()}`);

      if (product_description)
        alert.error(`Product Description: ${product_description.join()}`);

      if (product_manufacturer)
        alert.error(`Product Manufacturer: ${product_manufacturer.join()}`);

      if (product_supplier)
        alert.error(`Product Supplier: ${product_supplier.join()}`);

      if (manufacturer_name)
        alert.error(`Manufacturer Name: ${manufacturer_name.join()}`);

      if (manufacturer_code)
        alert.error(`Manufacturer Code: ${manufacturer_code.join()}`);

      if (supplier_name) alert.error(`Supplier Name: ${supplier_name.join()}`);

      if (supplier_code) alert.error(`Supplier Code: ${supplier_code.join()}`);
    }
    if (message !== prevProps.message) {
      if (addProduct) alert.success(addProduct);

      if (deleteProduct) alert.success(deleteProduct);

      if (addStock) alert.success(addStock);

      if (subtractStock) alert.success(subtractStock);

      if (addManufacturer) alert.success(addManufacturer);

      if (deleteManufacturer) alert.success(deleteManufacturer);

      if (addSupplier) alert.success(addSupplier);

      if (deleteSupplier) alert.success(deleteSupplier);
    }
  }

  render() {
    return <Fragment />;
  }
}
const mapStateToProps = (state) => ({
  error: state.errorsReducer,
  message: state.messagesReducer,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
