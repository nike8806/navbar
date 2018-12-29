import React, { PureComponent } from 'react';
import './App.css';

class App extends PureComponent {
  state = {
    anyState: 'Hi'
  };

  render() {
    const { anyState } = this.state;
    return (
      <div className="App">
        { anyState }
      </div>
    );
  }
}

export default App;
