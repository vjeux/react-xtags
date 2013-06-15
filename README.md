react-xtags
===========

Using [x-tags](http://www.x-tags.org/) from Mozilla, we can write custom tags within the DOM and have them being rendered in React.


Example
-------

We're first going to write a regular React component.

```javascript
var Hello = React.createClass({
  render: function() { return <div>{'Hello ' + this.props.name}</div>; }
});
```

Then, we use `react.register` to bind a React component to a custom tag name.

```javascript
xreact.register('x-hello', Hello);
```

At this point, any `<x-hello>` DOM element will be rendered using React.

```html
<x-hello name="World"></x-hello>
```

The rendered DOM tree lives in the shadow DOM. This lets us manipulate both the `<x-hello>` component as well as the rendered `<div>` using Web Inspector.

![image](https://f.cloud.github.com/assets/197597/658657/b58f239c-d5ff-11e2-887e-88f845938805.png)

Anytime you modify the `<x>` component, whether it is in the inspector or in Javascript with the regular DOM API, React is going to be invoked to update the rendered version.


Behind the scenes
-----------------

When you call `xreact.register`, we call `xtag.register` saying that whenever an `<x-hello>` DOM element is created, we render a special component called `XReact` in the shadow root of `<x-hello>`.

```javascript
xtag.register('x-hello', {
  lifecycle: {
    created: function() {
      React.renderComponent(
        <XReact element={this} />,
        this.createShadowRoot()
      );
    }
  }
});  
```

`XReact` is a really simple component that takes a DOM node, in this case `<x-hello name="World" />` and converts it to the React equivalent: `Hello({name: 'World'})`.

```javascript
var XReact = React.createClass({
  render: function() {
    return convertDOMToReact(this.props.element);
  }
```

`MutationObserver` gives us a callback whenever the `<x-hello>` DOM element is changed. We just have to call `this.forceUpdate()` to make sure the React rendered version stays in sync.

```javascript
  componentDidMount: function() {
    new MutationObserver(this.forceUpdate.bind(this)).observe(
      this.props.element, {/* all the possible mutations */}
    );
  }
);
```

That's it :)
