import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DogSearch } from './components/dog-search.tsx';
import { Login } from './components/login.tsx';

const queryClient = new QueryClient();

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);


  return (
    <QueryClientProvider client={queryClient}>
      <>{loggedIn ? <DogSearch /> : <Login setLoggedIn={setLoggedIn} />}</>
    </QueryClientProvider>
  );
}

export default App;
