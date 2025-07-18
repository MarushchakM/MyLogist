'use client';

import { signIn } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";
import style from "./SignInPage.module.scss"
import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "@/schemas/SignInSchema";
import { Input } from "@/components/Input";

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

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await executeAction({
      actionFn: async () => {
        await signIn("credentials", formData);
      },
    });
  }

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
          type='email'
          placeholder='Email'
          error={errors.email}
        />
        <Input
          register={register}
          label="Пароль"
          name="password"
          type='password'
          placeholder='Придумайте пароль'
          error={errors.password}
        />
        <Button variant="secondary" type="submit">Увійти</Button>
      </form>
    </div>
    
  )
}

export default SignInPage;