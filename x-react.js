/** @jsx React.DOM */

(function(global) {

var XReact = React.createClass({
  componentDidMount: function() {
    // When anything change in the DOM subtree, we want to update the React
    // version of the element
    new MutationObserver(this.forceUpdate.bind(this)).observe(
      this.props.element, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
      }
    );
  },

  render: function() {
    return convertDOMToReact(this.props.element);
  }
});

global.xreact = {
  tags: {},
  register: function(name, component){
    // We register the react component internally
    xreact.tags[name.toLowerCase()] = component;

    xtag.register(name, {
      lifecycle: {
        created: function() {
          // We render the special XReact component inside of the shadow
          // root of the DOM node that was passed it.
          React.renderComponent(
            XReact({element: this}),
            this.webkitCreateShadowRoot()
          );
        }
      }
    });  
  }
};

function convertDOMToReact(dom) {
  // If it's a text node, we just return it as string
  if (dom.nodeType === 3) {
    return dom.textContent;
  }

  // Otherwise we find the React component associated to the DOM node. It can
  // either be in React.DOM for standard HTML components or in xreact.tags for
  // React elements we created
  var tag = dom.tagName.toLowerCase();
  return (React.DOM[tag] || xreact.tags[tag])(
    convertAttributes(dom),
    getChildren(dom).map(convertDOMToReact)
  );
}

// Helper to get an array of all the children (including text) of a dom node
function getChildren(dom) {
  var children = [];
  var child = dom.firstChild;
  while (child) {
    children.push(child);
    child = child.nextSibling;
  }
  return children;
}

// Helper to convert dom.attributes to an object React can read
function convertAttributes(dom) {
  var result = {};
  for (var i = 0; i < dom.attributes.length; ++i) {
    var attribute = dom.attributes[i];
    result[attribute.name] = attribute.value;
  }

  if (result.style) {
    // Convert "font-size: 10px" to {'font-size': '10px'}
    var style = {};
    result.style.split(';').forEach(function(rule) {
      var split = rule.split(':');
      style[split[0]] = split[1];
    });
    result.style = style;
  }

  return result;
}

})(this);
