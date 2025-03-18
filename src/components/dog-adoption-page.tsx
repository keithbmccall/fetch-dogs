import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchDogs, fetchMatch } from '../data/fetch-query.ts';
import { DogMatch } from './dog-match.tsx';
import { DogSearch } from './dog-search.tsx';
import { Login } from './login.tsx';

export const DogAdoptionPage = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const { mutate: fetchMatchDogsMutation, data: matchedDog } = useMutation({
    mutationFn: fetchDogs,
    mutationKey: ['fetch-match-dogs-mutation'],
  });
  const { mutate: fetchMatchMutation } = useMutation({
    mutationFn: fetchMatch,
    mutationKey: ['match-dogs-mutation'],
    onSuccess: data => {
      fetchMatchDogsMutation([data.match]);
    },
  });

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }
  if (matchedDog) {
    return <DogMatch dog={matchedDog[0]} />;
  }
  return <DogSearch matchDog={fetchMatchMutation} />;
};
