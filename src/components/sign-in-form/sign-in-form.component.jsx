import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './sign-in-form.styles.scss';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(emailSignIn(email, password));
      resetFormFields();
    } catch (error) {
      console.log('An error occured ' + error);
    }
  };

  // async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signInAuthUserWithEmailAndPassword(email, password);
  //   } catch (err) {
  //     if (
  //       err.code === 'auth/wrong-password' ||
  //       err.code === 'auth/user-not-found'
  //     ) {
  //       alert('Incorrect Email or Password');
  //     } else {
  //       console.err(`An Error Occured `, err.message);
  //     }
  //resetFormFields();
  //   }
  //;

  const sigInWithGoogle = () => dispatch(googleSignIn());

  //  const sigInWithGoogle = () => async () => {
  //     try {
  //       await signInWithGooglePopUp();
  //     } catch (err) {
  //       if (
  //         err.code === 'auth/cancelled-popup-request' ||
  //         err.code === 'auth/popup-closed-by-user'
  //       ) {
  //       } else {
  //         console.err(err.message);
  //       }
  //     }
  //   };

  const handleChange = (e) => {
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
          <Button type="submit">Sign In</Button>
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
