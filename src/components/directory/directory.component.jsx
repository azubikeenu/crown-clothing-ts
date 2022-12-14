import DirectoryItem from '../category-item/directory-item.component';
import { DirectoryContainer } from './directory.styles';

const Directory = ({ categories }) => {
  return (
    categories && (
      <DirectoryContainer>
        {categories.map(({ id, ...category }) => (
          <DirectoryItem key={id} category={category} />
        ))}
      </DirectoryContainer>
    )
  );
};

export default Directory;
