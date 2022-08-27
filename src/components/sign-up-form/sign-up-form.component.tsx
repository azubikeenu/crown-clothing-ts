import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignUpFormContainer } from './sign-up-form.styles';
import { signupStart } from '../../store/user/user.actions';

const SignUpForm = () => {
  const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords dont match');
    }
    try {
      dispatch(signupStart(email, password, displayName));
      resetFormFields();
    } catch (err) {
      if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        return alert('Cannot Register user , Email already in use');
      } else {
        console.log('An Error occured during signup', err);
      }
    }
  };

  const resetFormFields = () => setFormFields(defaultFields);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <SignUpFormContainer>
      <h2>Dont have an account ?</h2>
      <p>Sign up with your email and password</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
          Sign Up
        </Button>
      </form>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
