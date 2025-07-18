'use client';

import { signIn } from "next-auth/react";
import { executeAction } from "@/lib/executeAction";
import style from "./SignInPage.module.scss"
import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "@/schemas/SignInSchema";
import { Input } from "@/components/Input";
import { useState } from "react";

type SignInInputs = {
  email: string;
  password: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInInputs>({
    resolver: yupResolver(SignInSchema),
    mode: "onBlur",
  });

  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    const result = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  });
    
  if (result?.error) {
    setAuthError(result.error);
    console.error("Авторизація неуспішна:", result.error);
    } else {
      setAuthError(null);
      console.log("Авторизація успішна!");
    }
  };

  return (
    <div className={style.signIn}>
      <div className={style.titleBlock}>
        <img src="./logo.png" alt="logo" />
        <h1>Транспортна компанія, що виходить за межі логістики</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          label="Email"
          name="email"
          placeholder='Email'
          error={errors.email}
        />
        <Input
          register={register}
          label="Password"
          name="password"
          type='password'
          placeholder='Придумайте пароль'
          error={errors.password}
        />
        <Button variant="secondary" type="submit">Увійти</Button>
      </form>

      {authError && <p className={style.errorText}>{authError}</p>}
      
    </div>
    
  )
}

export default SignInPage;
