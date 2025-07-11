'use client';

import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import style from './Input.module.scss'
import clsx from "clsx";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  label?: string;
  type?: string;
  name: Path<T>;
  placeholder?: string;
  error?: FieldError | undefined;
}

export const Input = <T extends FieldValues>(
  {
    register,
    label,
    type = "text",
    name,
    placeholder,
    error
  }: Props<T>
) => {
  return (
    <div className={style.inputBlock}>
      {label && (
        <label htmlFor={name} className={style.label}>
          {label}
        </label>
      )}
      <input
        className={clsx(style.input, { [style.inputError]: error })}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      <p className={style.error}>
        {error && error.message}
      </p>
    </div>
  );
};
