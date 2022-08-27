import { CategoryItem } from '../../store/categories/cartegories.types';
import ProductCard from '../product_card/product-card.component';
import {
  CategoryPreviewContainer,
  Preview,
  CategoryTitle,
} from './category-preview.styles';

const CategoryPreview = ({
  title,
  products,
}: {
  title: string;
  products: Array<CategoryItem>;
}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
