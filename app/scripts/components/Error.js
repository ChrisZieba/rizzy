var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="error">
        <h2>{this.props.message}</h2>
      </div>
    );
  }
});