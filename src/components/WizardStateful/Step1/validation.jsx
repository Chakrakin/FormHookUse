import {object, string} from 'yup';

const validationSchemaStep1 = object().shape({
  firstName: string().required(),
  lastName: string().required()
});

export default validationSchemaStep1;
