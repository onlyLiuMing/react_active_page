import React,{ComponentClass} from 'react';
import * as ReactDom from 'react-dom';

class App extends React.Component<{},{loaded:boolean}>{
  constructor(props){
    super(props);
    this.state = {
      loaded: true,
    }
  }

  getInitialState() {
    return {loaded: false};
  }

  render() {
    if (this.state.loaded) {
      return (
        <div> dasdf </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
};

ReactDom.render(<App />, document.getElementById('app'));

