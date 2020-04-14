import {number, object} from 'yup';

const validationSchemaStep2 = object().shape({
  age: number().min(18).typeError('age must be a number')
});

export default validationSchemaStep2;
