import clsx from 'clsx';
import { Fragment, useMemo, useState } from 'react';
import { Dog } from '../data/fetch-query.ts';
import { useFetchDogs } from '../data/use-fetch-dogs.ts';
import { BreedsPanel } from './breeds-panel.tsx';
import { Button } from './button.tsx';
import { DogRow } from './dog-row.tsx';

export enum SortBreeds {
  ASC = 'asc',
  DESC = 'desc',
}

interface DogSearchProps {
  matchDog: (dogIds: Dog['id'][]) => void;
}

const alphabeticalSort = (before: string, after: string) => {
  if (before < after) {
    return -1;
  }
  if (before > after) {
    return 1;
  }
  return 0;
};
export const DogSearch = ({ matchDog }: DogSearchProps) => {
  const { dogsData, searchDogsByBreeds } = useFetchDogs();
  const [selectedDogs, setSelectedDogs] = useState<Record<string, boolean>>({});
  const [sortBreeds, setSortBreeds] = useState<SortBreeds>(SortBreeds.ASC);

  const onClick = (dog: string) => {
    const isSelected = selectedDogs[dog];
    setSelectedDogs({
      ...selectedDogs,
      [dog]: !isSelected,
    });
  };
  const onToggleSort = () => {
    setSortBreeds(currentSortBreeds =>
      currentSortBreeds === SortBreeds.ASC ? SortBreeds.DESC : SortBreeds.ASC,
    );
  };
  const onMatch = () => {
    matchDog(Object.keys(selectedDogs).filter(id => selectedDogs[id]));
  };

  const isSortBreedsAsc = sortBreeds === SortBreeds.ASC;

  const displayedDogs = useMemo(() => {
    return isSortBreedsAsc
      ? dogsData.sort((a, b) => alphabeticalSort(a.breed, b.breed))
      : dogsData.sort((a, b) => alphabeticalSort(b.breed, a.breed));
  }, [dogsData, isSortBreedsAsc]);

  return (
    <div className="flex justify-center flex-column items-center overflow-scroll">
      <div className="relative w-100">
        <BreedsPanel onSearchDogs={searchDogsByBreeds} />
        <div className="dog-search pl4 pr4 flex flex-column">
          <div className="flex justify-center">
            <h3 className="tc mr3">Dogs</h3>
            <Button className="pa1 mr3" onClick={onMatch}>
              Match
            </Button>
            <Button className="pa3" onClick={onToggleSort}>
              Sort {sortBreeds.toUpperCase()}
            </Button>
          </div>

          {displayedDogs?.map(dog => {
            const showBorder = selectedDogs[dog.id];
            return (
              <Fragment key={dog.id}>
                <Button
                  className={clsx('pa2 bb mv0', {
                    ['b--black-90']: showBorder,
                    ['b--transparent']: !showBorder,
                  })}
                  onClick={() => onClick(dog.id)}
                  variant="secondary"
                >
                  <DogRow dog={dog}/>
                </Button>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
