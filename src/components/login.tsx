import { useMutation } from '@tanstack/react-query';
import clsx from "clsx";
import { Dispatch, SetStateAction } from 'react';
import { fetchQuery } from '../data/fetch-query.ts';
import { TextInput } from './text-input.tsx';

type LoginBody = {
  name: string;
  email: string;
};
interface LoginProps {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const Login = ({ setLoggedIn }: LoginProps) => {
  const { mutate } = useMutation({
    mutationFn: fetchQuery<LoginBody, Response>({
      method: 'POST',
      endPoint: `/auth/login`,
    }),
    onSuccess: data => {
      if (data.ok) {
        setLoggedIn(true);
      }
    },
  });

  const onSubmit = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    await mutate({
      name,
      email,
    });
  };
  const sam: string = '44';

  return (
    <div className="flex justify-center flex-column">
      <div>IMAGE</div>
      <h3>Login Please</h3>
      <form onSubmit={onSubmit}>
        <TextInput name="name" placeholder="name" required type="text" />
        <TextInput name="email" placeholder="email" required type="text" />
        <button type="submit" className={clsx(sam)} />
      </form>
    </div>
  );
};
