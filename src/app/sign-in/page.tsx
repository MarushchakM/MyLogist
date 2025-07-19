'use client';

import { signIn } from "next-auth/react";
import style from "./SignInPage.module.scss"
import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "@/schemas/SignInSchema";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";
// import { useState } from "react";

type SignInInputs = {
  email: string;
  password: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SignInInputs>({
    resolver: yupResolver(SignInSchema),
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    setError('email', { message: undefined });
    setError('password', { message: undefined });
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (result?.error) {
      console.log("Raw error from result:", result.error);

      const parsedError = JSON.parse(result.error);
      if (parsedError.field) {
        setError(parsedError.field as 'email' | 'password', {
          type: 'server',
          message: parsedError.message,
        });
      } 
    } else {
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
        <div className={style.inputBlock}>
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
        </div>
        
        <Button variant="secondary" type="submit" disabled={isLoading}>
          Увійти
        </Button>
      </form>      
    </div>
    
  )
}

export default SignInPage;
