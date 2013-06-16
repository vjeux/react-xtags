react-xtags
===========

Using [x-tags](http://www.x-tags.org/) from Mozilla, we can write custom tags within the DOM and have them being rendered in React.


```html
<script src="http://fb.me/react-0.3.2.min.js"></script>
<script src="http://fb.me/JSXTransformer-0.3.2.js"></script>
<script src="https://rawgithub.com/vjeux/react-xtags/master/x-tag-components.js"></script>

<!-- x-react is the bridge between x-tags and React -->
<script src="https://rawgithub.com/vjeux/react-xtags/master/x-react.js"></script>


<script type="text/jsx">
/** @jsx React.DOM */
var Hello = React.createClass({
  render: function() {
    return <div>{'Hello ' + this.props.name}</div>;
  }
});

xreact.register('x-hello', Hello);
</script>

<x-hello name="World"></x-hello>
```

The rendered DOM tree lives in the shadow DOM. This lets us manipulate both the `<x-hello>` component as well as the rendered `<div>` using Web Inspector.

![image](https://f.cloud.github.com/assets/197597/658657/b58f239c-d5ff-11e2-887e-88f845938805.png)

Anytime you modify the `<x>` component, whether it is in the inspector or in Javascript with the regular DOM API, React is going to be invoked to update the rendered version.
