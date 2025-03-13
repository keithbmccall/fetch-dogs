const baseUrl = 'https://frontend-take-home-service.fetch.com';

type FetchQuery = ({
  body,
  endPoint,
  method,
  query,
}: {
  body?: RequestInit['body'];
  endPoint: string;
  method: RequestInit['method'];
  query?: URLSearchParams;
}) => Promise<Response>;

const fetchQuery: FetchQuery = async ({
  endPoint,
  method,
  body,
  query = '',
}) => {
  const queryParams = query ? `?${query.toString()}` : '';
  return fetch(`${baseUrl}${endPoint}${queryParams}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
    body,
  });
};

type LoginBody = {
  name: string;
  email: string;
};
export const fetchLogin = async (body: LoginBody): Promise<Response> => {
  const endPoint = `/auth/login`;
  return fetchQuery({ endPoint, method: 'POST', body: JSON.stringify(body) });
};

export const fetchBreeds = async (): Promise<string[]> => {
  const endPoint = '/dogs/breeds';
  return (await fetchQuery({ endPoint, method: 'GET' })).json();
};

type FetchSearchParams = {
  queryKey: [string, URLSearchParams];
};
type SearchResponse = {
  next: string;
  resultIds: string[];
  total: number;
};
export const fetchSearch = async ({
  queryKey,
}: FetchSearchParams): Promise<SearchResponse> => {
  const query = queryKey[1];
  const endPoint = '/dogs/search';
  return (await fetchQuery({ endPoint, method: 'GET', query })).json();
};

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}
export const fetchDogs = async (body: string[]): Promise<Dog[]> => {
  const endPoint = `/dogs`;
  return (await fetchQuery({ endPoint, method: 'POST', body: JSON.stringify(body) })).json();
};
