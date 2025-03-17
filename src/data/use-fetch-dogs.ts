import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchDogs, fetchSearch } from './fetch-query.ts';
import { Dog } from './types.ts';

export const useFetchDogs = () => {
  const [queryParams, setQueryParams] = useState<URLSearchParams>(
    new URLSearchParams(),
  );
  const [queryParamsOnPage, setQueryParamsOnPage] =
    useState<URLSearchParams | null>(null);
  const [nextPage, setNextPage] = useState('');
  const [dogsData, setDogData] = useState<Dog[]>([]);

  const { data: searchData, isLoading: isSearchLoading } = useQuery({
    queryFn: fetchSearch,
    queryKey: ['search-query', queryParams.toString()],
    enabled: !!queryParams && !queryParamsOnPage,
  });
  const { data: searchPageData, isLoading: isSearchPageLoading } = useQuery({
    queryFn: fetchSearch,
    queryKey: ['search-page-query', queryParamsOnPage?.toString()],
    enabled: !!queryParamsOnPage,
  });
  const { mutate } = useMutation({
    mutationFn: fetchDogs,
    mutationKey: ['fetch-dogs-mutation'],
    onSuccess: data => {
      setDogData(dogs => (queryParamsOnPage ? [...dogs, ...data] : data));
    },
  });

  useEffect(() => {
    if (searchData?.resultIds) {
      setNextPage(searchData.next);
      mutate(searchData.resultIds);
    }
  }, [searchData, mutate]);
  useEffect(() => {
    if (searchPageData?.resultIds) {
      setNextPage(searchPageData.next);
      mutate(searchPageData.resultIds);
    }
  }, [searchPageData, mutate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryParams]);

  const searchDogsByBreeds = (breedsToSearch: string[]) => {
    const queryParams = new URLSearchParams();
    breedsToSearch.forEach(breed => {
      queryParams.append('breeds', breed);
    });
    // map over selected breeds object as a list appending breeds
    //size=25&sort=breed:desc
    queryParams.append('size', '100');
    queryParams.append('sort', 'breed:asc');
    setQueryParams(queryParams);
    setQueryParamsOnPage(null);
  };

  const isLoading = isSearchLoading || isSearchPageLoading;
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !isLoading &&
        nextPage
      ) {
        const queryParams = new URLSearchParams(nextPage.split('?')[1]);
        setQueryParamsOnPage(queryParams);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearchLoading, nextPage]);

  return {
    dogsData,
    searchDogsByBreeds,
  };
};
