import { useFetchDogs } from '../data/use-fetch-dogs.ts';
import { BreedsPanel } from './breeds-panel.tsx';

export const DogSearch = () => {
  const { dogsData, searchDogsByBreeds } = useFetchDogs();

  // print list of breeds. user will click to select a couple breeds
  // on click of search button,
  // we will then fetch 'dogs/search' with the selected breedids
  // this will return large list, with pagination
  // we will implement unlimited scroll for the pagination
  // each item will have a checkbox to select, and we will add this to list
  // on click of match button, we will call match and display the single result prominently

  interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }
  return (
    <div className="flex justify-center flex-column items-center overflow-scroll dog-search">
      <div className="relative">
        <BreedsPanel onSearchDogs={searchDogsByBreeds} />
        <div>
          <h3 className="tc">Dogs</h3>
          {dogsData?.map(dog => {
            return (
              <div key={dog.id} className="flex items-center pa2 bb b--white">
                <img
                  src={dog.img}
                  alt={dog.name}
                  width={50}
                  height={50}
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
          })}
        </div>
      </div>
    </div>
  );
};
