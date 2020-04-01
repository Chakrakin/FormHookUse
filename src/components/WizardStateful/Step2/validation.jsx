import {number, object} from 'yup';

const validationSchemaStep2 = object().shape({
  age: number().min(18)
});

export default validationSchemaStep2;
