import { CartItem } from './carttypes';
import { AnyAction } from 'redux';
import { setCartItemsAction, setIsCartOpenedAction } from './cart.actions';

export type CartState = {
  readonly isCartOpened: boolean;
  readonly cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
  isCartOpened: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartItemsAction.match(action)) {
    return { ...state, cartItems: action.payload };
  }
  if (setIsCartOpenedAction.match(action)) {
    return { ...state, isCartOpened: action.payload };
  }
  return state;
};
