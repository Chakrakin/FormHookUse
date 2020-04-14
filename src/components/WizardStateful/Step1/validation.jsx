import {object, string} from 'yup';

const validationSchemaStep1 = object().shape({
  firstName: string().min(3),
  lastName: string().required()
});

export default validationSchemaStep1;
