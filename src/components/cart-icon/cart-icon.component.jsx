import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsCartOpened,
  selectCartCount,
} from '../../store/cart/cart.selector';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { setIsCartOpened } from '../../store/cart/cart.actions';
import { CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  // const { setIsCartOpened, isCartOpened, cartCount } = useContext(CartContext);
  const cartCount = useSelector(selectCartCount);
  const isCartOpened = useSelector(selectIsCartOpened);
  const dispatch = useDispatch();
  const toggleIsCartOpened = () => dispatch(setIsCartOpened(!isCartOpened));
  return (
    <CartIconContainer onClick={toggleIsCartOpened}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
