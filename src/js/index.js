import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const customHistory = createBrowserHistory();
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer } from './App/pages/Index/reducers/index';
import Main from './App/pages/Main';
import Index from './App/pages/Index';
import List from './App/pages/List';
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route
        render={({ location }) => (
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <Switch key={location.pathname}>
              <Route exact path="/" component={Index} />
              <Route exact path="/list" component={List} />
              <Route render={() => (<div>404</div>)}/>
            </Switch>
          </ReactCSSTransitionGroup>
        )}
      />
    </Router>
  </Provider>,
  document.getElementById('root')
);
