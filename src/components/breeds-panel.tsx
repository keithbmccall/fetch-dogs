import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { MouseEvent, useState } from 'react';
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
    onSearchDogs(Object.keys(selectedBreeds).filter(
      breed => selectedBreeds[breed],
    ));
  };
  const onClick = (e: MouseEvent<HTMLButtonElement>, breed: string) => {
    const isSelected = selectedBreeds[breed];
    setSelectedBreeds({
      ...selectedBreeds,
      [breed]: !isSelected,
    });
  };
  return (
    <div className="fixed left-0 w-30 b--black h-100 br overflow-scroll">
      <div className="flex justify-center">
        <h3 className="tc mr3">Breeds list</h3>
        <Button className="pa1" label="Search" onClick={onSearch} />
      </div>

      <div className="pl3">
        {data && (
          <ul className="list">
            {data.map(breed => {
              const showUnderline = selectedBreeds[breed];
              return (
                <li key={breed}>
                  <Button
                    label={breed}
                    variant="secondary"
                    className={clsx({
                      ['underline']: showUnderline,
                    })}
                    type="button"
                    onClick={e => onClick(e, breed)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
