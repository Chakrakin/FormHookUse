import {boolean, number, object} from 'yup';

const validationSchemaStep2 = object().shape({
  buy: boolean(),
  age: number().when('buy', {
    is: true,
    then: number().min(18).typeError('age must be a number'),
    otherwise: number().min(12).typeError('age must be a number')
  }),
  numbercheck: number().when('buy', {
    is: true,
    then: number().min(123, 'I expect a numbercheck with min 123'),
  })
});

export default validationSchemaStep2;
