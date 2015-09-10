var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute
var Home = require('./scripts/components/Home');
var Resource = require('./scripts/components/Resource');
var App = require('./scripts/components/App');

// Declare our routes and their hierarchy
var routes = (
  <Route handler={App}>
  	<DefaultRoute handler={Home}/>
    <Route path="resource/:model/:id" handler={Resource}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});