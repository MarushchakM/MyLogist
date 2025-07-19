"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import style from "./SignInPage.module.scss";
import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "@/schemas/SignInSchema";
import { Input } from "@/components/Input";
import { useState } from "react";

type SignInInputs = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: yupResolver(SignInSchema),
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  const handleSuccessfulLogin = useCallback(
    (role: string) => {
      console.log("Авторизація успішна!");

      const callbackUrl = searchParams.get("callbackUrl");

      if (callbackUrl && callbackUrl.startsWith("/")) {
        router.push(callbackUrl);
        return;
      }

      switch (role) {
        case "ADMIN":
          router.push("/trucks");
          break;
        case "DISPATCHER":
          router.push("/trucks");
          break;
        case "DRIVER":
          router.push("/");
          break;
        default:
          router.push("/");
      }
    },
    [router, searchParams]
  );

  useEffect(() => {
    if (status === "authenticated" && session?.user && !hasRedirected) {
      setHasRedirected(true);
      handleSuccessfulLogin(session.user.role);
    }
  }, [status, session, hasRedirected, handleSuccessfulLogin]);

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    setError("email", { message: undefined });
    setError("password", { message: undefined });
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("callbackUrl") || undefined,
      });

      if (result?.error) {
        console.log("Raw error from result:", result.error);

        try {
          const parsedError = JSON.parse(result.error);
          if (parsedError.field) {
            setError(parsedError.field as "email" | "password", {
              type: "server",
              message: parsedError.message,
            });
          } else {
            setError("email", {
              type: "server",
              message: "Помилка авторизації. Перевірте ваші дані.",
            });
          }
        } catch (parseError) {
          console.error("Error parsing auth error:", parseError);
          setError("email", {
            type: "server",
            message: "Помилка авторизації. Спробуйте ще раз.",
          });
        }
      } else if (result?.ok) {
        console.log("Авторизація успішна! Очікуємо редірект...");
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      setError("email", {
        type: "server",
        message: "Сталася неочікувана помилка. Спробуйте ще раз.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.signIn}>
      <div className={style.titleBlock}>
        <img src="./logo.png" alt="logo" />
        <h1>Транспортна компанія, що виходить за межі логістики</h1>
      </div>

      {status === "loading" || hasRedirected ? (
        <div className={style.loadingBlock}>
          <p>Перенаправлення...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputBlock}>
            <Input
              register={register}
              label="Email"
              name="email"
              placeholder="Email"
              error={errors.email}
            />
            <Input
              register={register}
              label="Password"
              name="password"
              type="password"
              placeholder="Придумайте пароль"
              error={errors.password}
            />
          </div>

          <Button variant="secondary" type="submit" disabled={isLoading}>
            {isLoading ? "Вхід..." : "Увійти"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default SignInPage;
