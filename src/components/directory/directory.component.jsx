import DirectoryItem from '../category-item/directory-item.component';
import './directory.styles.scss';

const Directory = ({ categories }) => {
  return (
    categories && (
      <div className="directory-container">
        {categories.map(({ id, ...category }) => (
          <DirectoryItem key={id} category={category} />
        ))}
      </div>
    )
  );
};

export default Directory;
