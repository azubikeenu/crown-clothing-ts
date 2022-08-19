import { CART_ACTIONS } from './cart.action.types';

const INITIAL_STATE = {
  isCartOpened: false,
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTIONS.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case CART_ACTIONS.SET_IS_CART_OPENED:
      return { ...state, isCartOpened: payload };
    default:
      return state;
  }
};
