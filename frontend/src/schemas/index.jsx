import * as Yup from 'yup';

const signUpSchema = Yup.object({
  first_name: Yup.string()
    .min(2, 'First name must be atleat two characters')
    .max(25)
    .required('Please enter your first name'),
  last_name: Yup.string()
    .min(2, 'Last name must be atleat two characters')
    .typeError('first name must be atleast two characters')
    .max(25)
    .required('Please enter your last name'),
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(6).required('Please enter your password'),
  confirm_password: Yup.string()
    .required('Confirm Password is Required')
    .oneOf([Yup.ref('password'), null], 'Password must match'),
});

const loginSchema = Yup.object({
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(6).required('Please enter your password'),
});

const cprofileSchema = Yup.object({
  username: Yup.string().min(2, 'User must be atleat two characters').max(15),
  first_name: Yup.string()
    .min(2, 'First name must be atleat two characters')
    .max(25),
  last_name: Yup.string()
    .min(1, 'Last name must be atleat two characters')
    .typeError('first name must be atleast two characters')
    .max(25),
  email: Yup.string().email(),
  password: Yup.string().min(6),
  social_media: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!',
  ),
  title: Yup.string().min(5).max(20),
  bio: Yup.string().min(15).max(60),
  new_password: Yup.string().min(6),
  confirm_new_password: Yup.string().oneOf(
    [Yup.ref('new_password'), null],
    'Password must match',
  ),
});
export { loginSchema, signUpSchema, cprofileSchema };
