var React = require('react');
var ResourceList = require('./ResourceList');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h2>Home</h2>
        <ResourceList model="recipe" />
      </div>
    );
  }
});