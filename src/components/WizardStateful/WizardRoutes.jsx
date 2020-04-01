import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {WizardStatefulStep1} from './WizardStatefulStep1';
import {WizardStatefulStep2} from './WizardStatefulStep2';
import {WizardStatefulSummary} from './WizardStatefulSummary';
import WizardStatefulRouteAwareStatusBar from './WizardStatefulRouteAwareStatusBar';

const wizardSteps = [
  {title: "Start", forRoute: "/step1"},
  {title: "Details", forRoute: "/step2"},
  {title: "Summary", forRoute: "/result"}
];

export const WizardRoutes = () =>
  (<BrowserRouter>
    <WizardStatefulRouteAwareStatusBar elements={wizardSteps} />
    <Route path="/step1" component={WizardStatefulStep1} />
    <Route path="/step2" component={WizardStatefulStep2} />
    <Route path="/result" component={WizardStatefulSummary} />
  </BrowserRouter>)
