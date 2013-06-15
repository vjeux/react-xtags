react-xtags
===========

React components 

```html
<!-- Import React, x-tags and x-react -->
<script src="http://fb.me/react-0.3.2.min.js"></script>
<script src="http://fb.me/JSXTransformer-0.3.2.js"></script>
<script type="text/javascript" src="x-tag-components.js"></script>    
<script type="text/javascript" src="x-react.js"></script> 

<!-- Create a React component and register it with x-react -->
<script type="text/jsx">
/** @jsx React.DOM */
var Hello = React.createClass({
  render: function() {
    return <div>{'Hello ' + this.props.name}</div>;
  }
});

xreact.register('x-hello', Hello);
</script>

<!-- Any instance of that component in the DOM will be working -->
<x-hello name="World"></x-hello>
```
