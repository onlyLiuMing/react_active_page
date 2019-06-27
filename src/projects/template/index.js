import React from 'react';

var Hello = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  render: function() {
    if (this.state.loaded) {
      return (
        <div>
          {this.state.resp.data.map((post) => {
            return (
              <div key={post.slug}>{post.title}</div>
            )
          })}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
});

export default Hello;
