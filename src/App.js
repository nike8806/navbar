import React, { Component } from 'react';
import './App.scss';
import Header from './shared-components/header/Header';

class App extends Component {
  state = {
    title: 'Hi!, this is the Jaime´s tests'
  };

  render() {
    const { title } = this.state;
    return (
      <div className="App">
        <Header />
        {title}
      </div>
    );
  }
}

export default App;
