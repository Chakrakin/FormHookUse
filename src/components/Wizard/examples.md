# Full source examples:

## Given
```
export const composeControlElement = component => rules => name =>
  () => <Controller as={component} name={name} rules={rules} defaultValue=""/>
  
export const ShortPhoneNumberTemplate = composeControlElement(<input type="tel"/>)(shortPhoneNumberRules)
```
## Manual output of errors
```
export const shortPhoneNumberRules = {
  required: true,
  minLength : 4,
  maxLength : 8
}

// compose it by hand
export const ShortPhoneNumber = composeControlElement(<input type="tel"/>)(shortPhoneNumberRules)("shortPhone")

<ShortPhoneNumber />
{errors.shortPhone && errors.shortPhone.type === 'required' && 'field is required'}
{errors.shortPhone && errors.shortPhone.type === 'minLength' && 'value is too short'}
{errors.shortPhone && errors.shortPhone.type === 'maxLength' && 'value is too long'}
{errors.shortPhone && errors.shortPhone.type === 'pattern' && 'number is not a number'}
```

## Use Built-in Object for errors

```
//note the messages in each rule
export const shortPhoneNumberRules = {
  required: 'form.error.mandatory',
  minLength : {
    value: 4,
    message: 'form.error.short'
  },
  maxLength : {
    value: 8,
    message: 'form.error.long'
  },
  pattern: /^\d+$/
}

const fieldName = "shortPhone"
export const ShortPhoneNumber = ShortPhoneNumberTemplate(fieldName)

<ShortPhoneNumber />
<ErrorMessage errors={errors} name={fieldName} />
```

## YUP - fluidValidation rules

```
// YUP needs to be installed

const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup
    .number()
    .required()
    .positive()
    .integer(),
});
```
https://react-hook-form.com/advanced-usage/#SchemaValidation

