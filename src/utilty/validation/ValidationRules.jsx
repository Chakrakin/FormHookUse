import {numberValidator} from './ValidationHandlers';

const overwriteRule = (rule, options) => {
  Object.assign({}, JSON.parse(JSON.stringify(rule)), options) // JSON parse + stringify for deep clone
}

/*
  allowed fields are validation rules from react-hook-form
  https://react-hook-form.com/get-started#Applyvalidation
  required
  min
  max
  minLength
  maxLength
  pattern
  validate
 */
export const name = {
  required: true,
  minLength : {
    value: 2,
    message: 'too.short'
  },
  maxLength : {
    value: 100,
    message: 'error message'
  }
}

export const legalAge = {
  required: true,
  min: 18
}

export const shortPhoneNumberRules = {
  required: 'this is required',
  minLength : {
    value: 4,
    message: 'too.short'
  },
  maxLength : {
    value: 8,
    message: 'too.long'
  },
  pattern: /^\d+$/
}

export const randomNaturalNumber = {
  validate: numberValidator
}
