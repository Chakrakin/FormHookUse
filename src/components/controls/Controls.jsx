import React from 'react';
import {Controller, ErrorMessage} from 'react-hook-form';
import {shortPhoneNumberRules} from '../../utilty/validation/ValidationRules';

/*
DIRECT ABSTRACTION
 */
export const InputDependentValidation =({register, dependentFieldValue, name}) => (
  <input
    name={name}
    ref={
      register({
        validate: value => value === dependentFieldValue || 'error message'
        /* other possibility with callbacks
        validate: {
          positive: value => parseInt(value, 10) > 0 || 'should be greater than 0',
          lessThanTen: value => parseInt(value, 10) < 10 || 'should be lower than 10'
        }
        */
        /* or asynchronous
        validate: async value => await fetch(url) || 'error message';
        */
    })
    }
  />)

/*
COMPOSITION
basic idea:
  export const composeController = component => rules => name => value =>
    () => <Controller as={component} name={name} rules={rules} defaultValue={value}/>
  export const ShortPhoneNumberTemplate = composeController(<input type="tel"/>)(shortPhoneNumberRules)
 */
const telComponent = <input type="tel"/>

export const generateWithFixedName = component => rules =>
  () => <Controller as={component} name="shortPhone3" rules={rules} defaultValue=""/>;

export const generateToFunction = component => rules => name =>
  () => <Controller as={component} name={name} rules={rules} defaultValue=""/>;

export const generateToComponent = component => rules => ({name, errors}) => {
  return (<div>
    <label>{name}</label>
    <Controller as={component} name={name} rules={rules} defaultValue=""/>
    <ErrorMessage errors={errors} name={name} />
  </div>)
}

export const ShortPhoneNumberWithNameStatic = generateWithFixedName(telComponent)(shortPhoneNumberRules);
export const ShortPhoneNumberWithName = generateToFunction(telComponent)(shortPhoneNumberRules)("shortPhone4");
export const ShortPhoneNumberWithoutName = generateToFunction(telComponent)(shortPhoneNumberRules);

// ShortPhoneNumberG - thats the interesting stuff
export const ShortPhoneNumberComponentNoName = generateToComponent(telComponent)(shortPhoneNumberRules);
export const ShortPhoneNumberComponentProvided = ShortPhoneNumberWithoutName('shortPhone5');


/*
// as an example - this doesnt work - reinitialization
export const PhoneItem = ({title, name, errors}) => {
  let Comp = generate3(<input type="tel"/>)(shortPhoneNumberRules)(name)
  return (<div>
    <label>{title}</label>
    <Comp />
    <ErrorMessage errors={errors} name="phony" />
  </div>)
}
*/

/*
// as an example - this doesnt work - nested hook access ...
export const PhoneItem = (title, name) => {
  let methods = useFormContext();
  let Comp = ShortPhoneNumber(name)
  return () => (<div>
    <label>{title}</label>
    <Comp />
    <ErrorMessage errors={methods.errors} name={name} />
  </div>)
}
*/


