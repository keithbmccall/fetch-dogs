const baseUrl = 'https://frontend-take-home-service.fetch.com';

type FetchQuery = <TBody = unknown, TResponse = unknown>(
  options: RequestInit & { endPoint: string },
) => (body: TBody) => Promise<TResponse>;

export const fetchQuery: FetchQuery =
  ({ method = 'GET', endPoint = '' }: RequestInit & { endPoint: string }) =>
  async (body = undefined) => {
    console.log({ body });
    return fetch(`${baseUrl}${endPoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'include',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
  };
