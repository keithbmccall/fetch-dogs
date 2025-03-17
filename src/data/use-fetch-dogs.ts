import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Dog, fetchDogs, fetchSearch } from './fetch-query.ts';

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
  const { mutate: fetchDogsMutation } = useMutation({
    mutationFn: fetchDogs,
    mutationKey: ['fetch-dogs-mutation'],
    onSuccess: data => {
      setDogData(dogs => (queryParamsOnPage ? [...dogs, ...data] : data));
    },
  });

  useEffect(() => {
    if (searchData?.resultIds) {
      setNextPage(searchData.next);
      fetchDogsMutation(searchData.resultIds);
    }
  }, [searchData, fetchDogsMutation]);
  useEffect(() => {
    if (searchPageData?.resultIds) {
      setNextPage(searchPageData.next);
      fetchDogsMutation(searchPageData.resultIds);
    }
  }, [searchPageData, fetchDogsMutation]);

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
        setQueryParamsOnPage(new URLSearchParams(nextPage.split('?')[1]));
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
