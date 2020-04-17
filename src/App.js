import React from 'react';
import './App.css';
import RHFExample from './RHFExample';
import Wizard from './components/Wizard/Wizard';
import {WizardStateful} from './components/WizardStateful/WizardStateful';
import HookShelf from './components/HookShelf/HookShelf';

const App = () => {

  return (
    <div className="App">
      React Hooks Basic Example (Console)<br/>
      <RHFExample/>
      <hr />
      <label>Wizard Example</label>
      <Wizard/>
      <hr />
      <WizardStateful/>
      <hr />
      <HookShelf />
    </div>
  );
}

export default App;
