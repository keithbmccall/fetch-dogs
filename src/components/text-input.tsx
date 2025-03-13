import clsx from 'clsx';

type TextInputProps = Partial<HTMLInputElement>;

export const TextInput = ({
  className,
  name,
  required = true,
  placeholder,
  type = 'text',
}: TextInputProps) => {
  return (
    <input
      className={clsx('bg-white pa2 br3 black', className)}
      name={name}
      placeholder={placeholder}
      required={required}
      type={type}
    />
  );
};
