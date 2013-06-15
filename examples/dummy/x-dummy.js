/** @jsx React.DOM */

var Dummy = React.createClass({
  render: function() {
    return (
      <fieldset>
        <legend>React Component: {this.props.name}</legend>
        {this.props.children}
      </fieldset>
    );
  }
});

xreact.register('x-dummy', Dummy);
