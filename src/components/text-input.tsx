import clsx from "clsx";


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
      className={clsx('f4', className)}
      name={name}
      placeholder={placeholder}
      required={required}
      type={type}
    />
  );
};
