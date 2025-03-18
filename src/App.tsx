import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DogAdoptionPage } from './components/dog-adoption-page.tsx';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <DogAdoptionPage />
    </QueryClientProvider>
  );
}

export default App;
