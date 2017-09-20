var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var RouteHandler = ReactRouter.RouteHandler;

var Template = require('./components/MainTemplateComponent.jsx');
var App = require('./components/MainAppComponent.jsx');
var Redir = require('./components/Redir.jsx');
import Do from './components/Do.jsx';

//var injectTapEventPlugin = require("react-tap-event-plugin");

//injectTapEventPlugin();

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Template}>
      <IndexRoute component={Redir}/>
      <Route path="/home" component={App}>
        <Route path="/do" component={Do}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
