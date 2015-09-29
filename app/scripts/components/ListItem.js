var React = require('react');
var Router = require('react-router');
var Backbone = require('backbone');

module.exports = React.createClass({
  mixins : [Router.Navigation],
  handleClick : function() {
    this.transitionTo('/resource/' + this.props.raw.model + '/' + this.props.raw.id);
  },

  render: function() {
    return (
      <div>
      	<h1 onClick={this.handleClick.bind(this)}>click</h1>
        <h3>{this.props.raw.props.author}</h3>
        <p>{this.props.raw.props.body}</p>
      </div>
    );
  }
});