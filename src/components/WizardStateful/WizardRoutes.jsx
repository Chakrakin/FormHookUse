import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {WizardStatefulStep1} from './Step1/WizardStatefulStep1';
import {WizardStatefulStep2} from './Step2/WizardStatefulStep2';
import {WizardStatefulSummary} from './Summary/WizardStatefulSummary';
import WizardStatefulRouteAwareStatusBar from './WizardStatefulRouteAwareStatusBar';
import {createBrowserHistory} from 'history';

const wizardSteps = [
  {title: "Start", forRoute: "/step1"},
  {title: "Details", forRoute: "/step2"},
  {title: "Summary", forRoute: "/summary"}
];

export const WizardRoutes = ({history}) =>
  (<Router history={history || createBrowserHistory({})}>
    <WizardStatefulRouteAwareStatusBar elements={wizardSteps} />
    <Switch>
      <Route path="/step1" component={WizardStatefulStep1} />
      <Route path="/step2" component={WizardStatefulStep2} />
      <Route path="/summary" component={WizardStatefulSummary} />
    </Switch>
  </Router>)
