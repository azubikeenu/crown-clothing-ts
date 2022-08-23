import { CategoryItem } from '../categories/cartegories.types';

export enum CART_ACTIONS {
  SET_IS_CART_OPENED = 'cart/SET_IS_CART_OPENED',
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
}
export type CartItem = CategoryItem & {
  quantity: number;
};
