import { DogRow } from './dog-row.tsx';
import { Dog } from '../data/fetch-query.ts';

interface DogMatchProps{
  dog:Dog
}
export const DogMatch = ({dog}:DogMatchProps)=> {


  return <div className="flex justify-center flex-column items-center pt6">
    <h1>Welcome your new member of the family!</h1>
    <DogRow dog={dog} imgDimensions={200} />;
  </div>
}
