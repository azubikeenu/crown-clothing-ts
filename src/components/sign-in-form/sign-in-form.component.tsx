import { useState, FormEvent, ChangeEvent } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInFormContainer, ButtonsContainer } from './sign-in-form.styles';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { googleSignIn, emailSignIn } from '../../store/user/user.actions';

const SignInForm = () => {
  const dispatch = useDispatch();
  const defaultFields = {
    email: '',
    password: '',
  };
  const [formFields, setFormFields] = useState(defaultFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFields);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(emailSignIn(email, password));
      resetFormFields();
    } catch (error) {
      console.log('An error occured ' + error);
    }
  };
  const sigInWithGoogle = () => dispatch(googleSignIn());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <SignInFormContainer>
      <h2>Already have an account ?</h2>
      <p>Sign in with your email and password</p>
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
            Sign In
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={sigInWithGoogle}
          >
            With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInFormContainer>
  );
};

export default SignInForm;
