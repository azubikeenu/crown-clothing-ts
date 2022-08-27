import { useDispatch, useSelector } from 'react-redux';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
  ProductCardContainer,
  Cost,
  Footer,
  Name,
} from './product-cart.styles';

const ProductCard = ({ product }) => {
  const dispatcher = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { price, name, imageUrl } = product;

  const addProductToCart = () => dispatcher(addItemToCart(product, cartItems));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Cost>{price}</Cost>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
