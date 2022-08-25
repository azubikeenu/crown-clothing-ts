import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducers/reducer.utils';
import { CategoryItem } from '../categories/cartegories.types';
import { CartItem, CART_ACTIONS } from './carttypes';
import {
  addCartItem,
  decrementProductCount,
  removeItemFromCart,
} from './utils';

export type SetCartItemsAction = ActionWithPayload<
  CART_ACTIONS.SET_CART_ITEMS,
  CartItem[]
>;

export type SetIsCartOpenedAction = ActionWithPayload<
  CART_ACTIONS.SET_IS_CART_OPENED,
  boolean
>;

export const setCartItemsAction = withMatcher(
  (cartItems: CartItem[]): SetCartItemsAction => {
    return createAction(CART_ACTIONS.SET_CART_ITEMS, cartItems);
  }
);

export const setIsCartOpenedAction = withMatcher(
  (boolean: boolean): SetIsCartOpenedAction => {
    return createAction(CART_ACTIONS.SET_IS_CART_OPENED, boolean);
  }
);

export const addItemToCart = withMatcher(
  (itemToAdd: CategoryItem, cartItems: CartItem[]): SetCartItemsAction => {
    const newCartItems = cartItems && addCartItem(itemToAdd, cartItems);
    return setCartItemsAction(newCartItems);
  }
);

export const decrementCount = withMatcher(
  (product: CartItem, cartItems: CartItem[]): SetCartItemsAction => {
    const newCartItems = cartItems && decrementProductCount(product, cartItems);
    return setCartItemsAction(newCartItems);
  }
);

export const removeItem = withMatcher(
  (product: CartItem, cartItems: CartItem[]) => {
    const newCartItems = cartItems && removeItemFromCart(product, cartItems);
    return setCartItemsAction(newCartItems);
  }
);
