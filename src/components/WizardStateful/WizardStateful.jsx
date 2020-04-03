import React from 'react';
import {WizardRoutes} from './WizardRoutes';
import {createStore, DevTool, StateMachineProvider} from 'little-state-machine';

createStore({
  data: {}
});

export const WizardStateful = () => (
    <div data-testid="wizardFormStateful">
      <StateMachineProvider>
        {process.env.NODE_ENV !== 'production' && <DevTool />}
        <WizardRoutes/>
      </StateMachineProvider>
    </div>
  )
