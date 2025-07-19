import Link from 'next/link';
import styles from './Button.module.scss';
import clsx from 'clsx';
import { Spinner } from '../Spinner';

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "icon" | "danger";
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean; 
  
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  href,
  type = "button",
  onClick,
  className,
  disabled
}) => {
  const combinedClass = clsx(styles[variant], styles.btn, className);

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClass}
      disabled={disabled}
    >
      {disabled ? <Spinner size={18} /> : children }
    </button>
  );
}