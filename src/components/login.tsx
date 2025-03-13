import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import fetchDoggo from '../assets/fetch.svg';
import { fetchLogin } from '../data/fetch-query.ts';
import { Button } from './button.tsx';
import { TextInput } from './text-input.tsx';

interface LoginProps {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const Login = ({ setLoggedIn }: LoginProps) => {
  const { mutate } = useMutation({
    mutationFn: fetchLogin,
    mutationKey:["login-mutation"],
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

  return (
    <div className="flex justify-center flex-column items-center pt6">
      <img
        src={fetchDoggo as string}
        alt="fetch logo"
        width={100}
        height={100}
      />
      <h3>Sign in</h3>
      <form onSubmit={onSubmit} className="flex flex-column">
        <TextInput
          name="name"
          placeholder="name"
          required
          type="text"
          className="mv2"
        />
        <TextInput
          name="email"
          placeholder="email"
          required
          type="text"
          className="mv2"
        />
        <Button type="submit" label="Continue" />
      </form>
    </div>
  );
};
