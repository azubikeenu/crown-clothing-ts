import {
  DirectoryItemContainer,
  DirectoryItemBody,
  BackgroundImage,
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <DirectoryItemBody>
        <h2>{title.toUpperCase()}</h2>
        <p>SHOP NOW</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
