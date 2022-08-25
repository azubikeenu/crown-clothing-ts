import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsCartOpened,
  selectCartCount,
} from '../../store/cart/cart.selector';

import { setIsCartOpenedAction } from '../../store/cart/cart.actions';
import { CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);
  const isCartOpened = useSelector(selectIsCartOpened);
  const dispatch = useDispatch();
  const toggleIsCartOpened = () => dispatch(setIsCartOpenedAction(!isCartOpened));
  return (
    <CartIconContainer onClick={toggleIsCartOpened}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
