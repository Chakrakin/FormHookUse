import React from 'react';
import './App.css';
import RHFExample from './RHFExample';
import Wizard from './components/Wizard/Wizard';

const App = () => {

  return (
    <div className="App">
      React Hooks Basic Example (Console)<br/>
      <RHFExample/>
      <hr />
      Wizard Example
      <Wizard/>
      <hr />
    </div>
  );
}

export default App;
