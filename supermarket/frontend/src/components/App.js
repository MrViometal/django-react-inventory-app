import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../redux/store';

import {
  Products,
  Manufacturers,
  Suppliers,
  Transactions,
  FourOFour,
} from '../pages';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Switch>
            <Route exact path='/products' component={Products} />
            <Redirect from='/' exact to='/products' />
            <Route exact path='/manufacturers' component={Manufacturers} />
            <Route exact path='/suppliers' component={Suppliers} />
            <Route exact path='/transactions' component={Transactions} />
            <Route component={FourOFour} />
          </Switch>
        </Fragment>
      </Provider>
    );
  }
}

function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Main;

ReactDOM.render(<Main />, document.getElementById('app'));
