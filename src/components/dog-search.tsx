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

  return (
    <div className="flex justify-center flex-column items-center overflow-scroll">
      <div className="relative">
        <BreedsPanel onSearchDogs={searchDogsByBreeds} />
        <div className="pl6">
          {dogsData?.map(dog => {
            return <div key={dog.id}>{dog.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};
