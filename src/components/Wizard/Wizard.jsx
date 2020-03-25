import React from 'react';
import {useState} from 'react';
import {FormContext, useForm} from 'react-hook-form';
import WizardStatusBar from './WizardStatusBar';
import UserForm from './UserForm';
import CartForm from './CartForm';

export default (props) => {
  const maxSteps = 2
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm();

  const _next = () => {
    setCurrentStep(currentStep >= 2 ? maxSteps : currentStep + 1)
  }

  const _prev = () => {
    setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1)
  }

  const onSubmit = data => {
    alert('FormData: ' + JSON.stringify(data));
  };

  return (
    <div className="wizardForm">
      <WizardStatusBar elements={[{title: 'UserForm'}, {title: 'CartForm'}]} status={currentStep}/>
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <UserForm visible={currentStep === 1} nextPage={_next}/>
          <CartForm visible={currentStep === 2} previousPage={_prev}/>
        </form>
      </FormContext>
    </div>
  );
}

/*

{React.Children.toArray(props.children).map((Child, idx) =>
            <Child visible={currentStep === idx + 1} nextPage={_next} previousPage={_prev}/>
          )}
          <hr />

 */

/* ANOTHER APPROACH:: IF BOOKMARK-ABLE STEPS REQUIRED: with react router location

// Use Link from react-router-dom:
// import {Link, BrowserRouter as Router} from 'react-router-dom';

<Router>
  <div>
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange}>
        <Tab label="User" component={Link} to={tabs[0]} />
        <Tab label="Cart" component={Link} to={tabs[1]} />
        <Tab label="Verify" component={Link} to={tabs[2]} />
      </Tabs>
    </AppBar>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TabPanel value={value} index={0}>
        <UserForm register={register}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CartForm register={register}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VerifyForm register={register}/>
      </TabPanel>
      <input type="submit" />
    </form>
  </div>
</Router>

*/
