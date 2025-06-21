'use client';

import { CreateTruckInputs } from "@/features/trucks/components/CreateForm";
import { FieldError, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<CreateTruckInputs>;
  label?: string;
  type?: string;
  name: keyof CreateTruckInputs;
  placeholder?: string;
  error?: FieldError | undefined;
}

export const Input: React.FC<Props> = ({register, label, type="text", name, placeholder, error}) => {
  return (
    <div>
      {label && (<label htmlFor={name}>{label}</label>)}
      <input id={name} type={type} placeholder={placeholder} {...register("truckNumber")} />
      <p>{error && error.message}</p>
    </div>
  );
};