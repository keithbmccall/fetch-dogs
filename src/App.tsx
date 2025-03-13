import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DogSearch } from './components/dog-search.tsx';
import { Login } from './components/login.tsx';

const queryClient = new QueryClient();

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    // print list of breeds. user will click to select a couple breeds
    // on click of search button,
    // we will then fetch 'dogs/search' with the selected breedids
    // this will return large list, with pagination
    // we will implement unlimited scroll for the pagination
    // each item will have a checkbox to select and we will add this to list
    // on click of match button, we will call match and display the single result prominently
    // if (loggedIn) {
    //   fetch(
    //     `${url}/dogs/search?breeds=Affenpinscher&breeds=Rottweiler&size=25&sort=breed:desc`,
    //     {
    //       method: 'GET',
    //       ...headers,
    //     },
    //   )
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log({
    //         data,
    //       });
    //       fetch(`${url}/dogs`, {
    //         method: 'POST',
    //         ...headers,
    //         body: JSON.stringify(data.resultIds),
    //       })
    //         .then(res => res.json())
    //         .then(dogsdata => {
    //           console.log({
    //             dogsdata,
    //           });
    //         });
    //     });
    // }
  }, [loggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <>{loggedIn ? <DogSearch /> : <Login setLoggedIn={setLoggedIn} />}</>
    </QueryClientProvider>
  );
}

export default App;
