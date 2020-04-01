import React from 'react';
import './App.css';
import RHFExample from './RHFExample';
import Wizard from './components/Wizard/Wizard';
import {WizardStateful} from './components/WizardStateful/WizardStateful';

const App = () => {

  return (
    <div className="App">
      React Hooks Basic Example (Console)<br/>
      <RHFExample/>
      <hr />
      Wizard Example
      <Wizard/>
      <hr />
      <WizardStateful/>
    </div>
  );
}

export default App;
