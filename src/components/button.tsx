import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = Partial<HTMLButtonElement> & {
  children?: ReactNode | string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  variant?: 'primary' | 'secondary';
};

export const Button = ({
  className,
  children,
  onClick,
  type = 'button',
  variant = 'primary',
}: ButtonProps) => {
  const click: MouseEventHandler<HTMLButtonElement> | undefined = event => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };
  return (
    <button
      type={type}
      className={clsx(
        'mv2 br3',
        {
          ['bg-black-90']: variant === 'primary',
          ['bg-transparent black-90 pa0 tl']: variant === 'secondary',
        },
        className,
      )}
      onClick={click}
    >
      {children}
    </button>
  );
};
