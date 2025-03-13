import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchDogs, fetchSearch } from './fetch-query.ts';

export const useFetchDogs = () => {
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState<URLSearchParams>(null);
  const { data } = useQuery({
    queryFn: fetchSearch,
    queryKey: ['search-query', queryParams],
    enabled: Boolean(queryParams),
  });
  const { mutate, data: dogsData } = useMutation({
    mutationFn: fetchDogs,
    mutationKey: ['fetch-dogs-mutation'],
  });
  useEffect(() => {
    if (data) {
      console.log(data);
      mutate(data.resultIds);
    }
  }, [data, mutate]);



  const searchDogsByBreeds = (breedsToSearch: string[]) => {
    const queryParams = new URLSearchParams();
    breedsToSearch.forEach(breed => {
      queryParams.append('breeds', breed);
    });
    // map over selected breeds object as a list appending breeds
    //size=25&sort=breed:desc
    queryParams.append('size', '50');
    queryParams.append('sort', 'breed:desc');
    console.log(queryParams.toString());
    setQueryParams(queryParams);
  };

  return {
    dogsData,
    searchDogsByBreeds,
  };
};
