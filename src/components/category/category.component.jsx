import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { useState, useEffect, Fragment } from 'react';

import ProductCard from '../product_card/product-card.component';
import Spinner from '../spinner/spinner.component';
import { CategoryContainer, CategoryContainerTitle } from './category.styles';
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/cartegories.selector';

const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryContainerTitle> {category.toUpperCase()}</CategoryContainerTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
