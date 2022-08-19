// import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './product-card.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
// import { CartContext } from '../../contexts/cart.context';
import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
  // const { addItemToCart } = useContext(CartContext);
  const dispatcher = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { price, name, imageUrl } = product;

  const addProductToCart = () => dispatcher(addItemToCart(product, cartItems));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="cost">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
