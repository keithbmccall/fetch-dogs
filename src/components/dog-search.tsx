import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { fetchMatch } from '../data/fetch-query.ts';
import { useFetchDogs } from '../data/use-fetch-dogs.ts';
import { BreedsPanel } from './breeds-panel.tsx';
import { Button } from './button.tsx';

export const DogSearch = () => {
  const { dogsData, searchDogsByBreeds } = useFetchDogs();
  const [selectedDogs, setSelectedDogs] = useState<Record<string, boolean>>({});
  const [matchedDog, setMatchedDog] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: fetchMatch,
    mutationKey: ['match-dogs-mutation'],
    onSuccess: data => {
      setMatchedDog(data.match);
    },
  });
  // print list of breeds. user will click to select a couple breeds
  // on click of search button,
  // we will then fetch 'dogs/search' with the selected breedids
  // this will return large list, with pagination
  // we will implement unlimited scroll for the pagination
  // each item will have a checkbox to select, and we will add this to list
  // on click of match button, we will call match and display the single result prominently
  const onClick = (dog: string) => {
    const isSelected = selectedDogs[dog];
    setSelectedDogs({
      ...selectedDogs,
      [dog]: !isSelected,
    });
  };
  const onMatch = () => {
    mutate(Object.keys(selectedDogs).filter(id => selectedDogs[id]));
  };
  return (
    <div className="flex justify-center flex-column items-center overflow-scroll dog-search">
      <div className="relative">
        <BreedsPanel onSearchDogs={searchDogsByBreeds} />
        <div>
          <div className="flex justify-center">
            <h3 className="tc mr3">Dogs</h3>
            <Button className="pa1" onClick={onMatch}>
              <>Match</>
            </Button>
          </div>

          {dogsData?.map(dog => {
            const showBorder = selectedDogs[dog.id];
            return (
              <Fragment key={dog.id}>
                <Button
                  className={clsx('flex items-center pa2 bb', {
                    ['b--black-90']: showBorder,
                    ['b--transparent']: !showBorder,
                  })}
                  onClick={() => onClick(dog.id)}
                  variant="secondary"
                >
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
                </Button>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
