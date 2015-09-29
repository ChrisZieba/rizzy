var React = require('react');
var api = require('../api');
var ErrorMessage = require('./ErrorMessage');

module.exports = React.createClass({
  componentDidMount: function() {
    api.fetchResources(this.props.params.model, this.props.params.id).then(function(data, textStatus, jqXHR) {
      console.log(data);
      this.setState({
        resource: data
      });
    }.bind(this), function(jqXHR, textStatus, errorThrown) {
      this.setState({
        resource: null,
        error: textStatus
      });
    }.bind(this));
  },

  getInitialState: function() {
    return {
      resource: null,
      error: null
    };
  },

  render: function() {
    var output;

    if (this.state.error) {
      output = <ErrorMessage message={this.state.error} />
    } else {
      if (this.state.resource) {
        output = (
          <div>
            <h3>{this.state.resource.props.author}</h3>
            <p>{this.state.resource.props.body}</p>
          </div>
        );
      } else {
        output = 'loading';
      }
    }
    return (
      <div className="container">{output}</div>
    );
  }
});