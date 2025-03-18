import { Dog } from '../data/fetch-query.ts';

interface DogRow {
  dog: Dog;
  imgDimensions?: number;
}
export const DogRow = ({ dog, imgDimensions }: DogRow) => {
  const height = imgDimensions ?? 50;
  const width = imgDimensions ?? 50;
  return (
    <div className="flex items-center">
      <img
        src={dog.img}
        alt={dog.name}
        width={width}
        height={height}
        className="dog-img"
      />
      <div className="name-item flex items-center ml3">
        <span className="b">{dog.name}</span>
      </div>
      <div className="age-item flex items-center">
        <span className="f6 mr1">Age:</span>
        <span className="b">{dog.age}</span>
      </div>
      <div className="breed-item flex items-center">
        <span className="f6 mr1">Breed:</span>
        <span className="b">{dog.breed}</span>
      </div>
      <div className="zip-item flex items-center">
        <span className="f6 mr1">Zip code:</span>
        <span className="b">{dog.zip_code}</span>
      </div>
    </div>
  );
};
