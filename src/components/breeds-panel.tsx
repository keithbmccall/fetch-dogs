import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { fetchBreeds } from '../data/fetch-query.ts';
import { Button } from './button.tsx';

interface BreedsPanelProps {
  onSearchDogs: (breedsToSearch: string[]) => void;
}
export const BreedsPanel = ({ onSearchDogs }: BreedsPanelProps) => {
  const [selectedBreeds, setSelectedBreeds] = useState<Record<string, boolean>>(
    {},
  );

  const { data } = useQuery({
    queryFn: fetchBreeds,
    queryKey: ['breeds-query'],
  });

  const onSearch = () => {
    onSearchDogs(
      Object.keys(selectedBreeds).filter(breed => selectedBreeds[breed]),
    );
  };
  const onClick = (breed: string) => {
    const isSelected = selectedBreeds[breed];
    setSelectedBreeds({
      ...selectedBreeds,
      [breed]: !isSelected,
    });
  };
  return (
    <div className="fixed left-0 b--black h-100 br overflow-scroll breeds-panel">
      <div className="flex justify-center">
        <h3 className="tc mr3">Breeds list</h3>
        <Button className="pa1" onClick={onSearch}>
          Search
        </Button>
      </div>

      <div className="pl3">
        {data && (
          <ul className="list">
            {data.map(breed => {
              const showUnderline = selectedBreeds[breed];
              return (
                <li key={breed}>
                  <Button
                    variant="secondary"
                    className={clsx({
                      ['underline']: showUnderline,
                    })}
                    type="button"
                    onClick={() => onClick(breed)}
                  >
                    {breed}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
