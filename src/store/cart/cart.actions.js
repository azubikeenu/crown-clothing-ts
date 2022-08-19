import { createAction } from '../../utils/reducers/reducer.utils';
import { CART_ACTIONS } from './cart.action.types';
import {
  addCartItem,
  decrementProductCount,
  removeItemFromCart,
} from './utils';

export const setCartItems = (payload) =>
  createAction(CART_ACTIONS.SET_CART_ITEMS, payload);

export const setIsCartOpened = (boolean) => {
  return createAction(CART_ACTIONS.SET_IS_CART_OPENED, boolean);
};

export const addItemToCart = (itemToAdd, cartItems) => {
  const newCartItems = addCartItem(itemToAdd, cartItems);
  return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems);
};

export const decrementCount = (product, cartItems) => {
  const newCartItems = decrementProductCount(product, cartItems);
  return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems);
};

export const removeItem = (product, cartItems) => {
  const newCartItems = removeItemFromCart(product, cartItems);
  return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems);
};
