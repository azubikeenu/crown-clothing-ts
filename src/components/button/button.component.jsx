import './button.styles.scss';
import { BASE_BUTTON, INVERTED_BUTTON, GOOGLE_BUTTON } from './button.styles';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BASE_BUTTON,
    [BUTTON_TYPE_CLASSES.google]: GOOGLE_BUTTON,
    [BUTTON_TYPE_CLASSES.inverted]: INVERTED_BUTTON,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
