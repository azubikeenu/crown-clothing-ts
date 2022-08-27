import { BASE_BUTTON, INVERTED_BUTTON, GOOGLE_BUTTON } from './button.styles';
import { ButtonHTMLAttributes } from 'react';

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted',
}

// this maps the corresponding style using the class nane
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BASE_BUTTON =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BASE_BUTTON,
    [BUTTON_TYPE_CLASSES.google]: GOOGLE_BUTTON,
    [BUTTON_TYPE_CLASSES.inverted]: INVERTED_BUTTON,
  }[buttonType]);

export type ButtonProps = {
  children: React.ReactNode;
  buttonType: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  buttonType,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
