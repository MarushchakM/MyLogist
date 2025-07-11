"use client"

import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import { CreateUserSchema } from "@/schemas/CreateUserSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { apiUsersCreatePath, homePath, usersPath } from "@/paths";
import { Container } from "@/components/Container";
import { useSession } from "next-auth/react";

export type CreateUserInputs = {
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
  middleName: string;
  role: Role;
}

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<CreateUserInputs>({
    resolver: yupResolver(CreateUserSchema),
    mode: "onBlur",
  });

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  if (user?.role !== "ADMIN") {
    return router.push(homePath());
  }
  
  const onSubmit: SubmitHandler<CreateUserInputs> = async (data) => {
    setError("email", { message: undefined });
    try {
      const response = await fetch(apiUsersCreatePath(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(usersPath());
      } else {
        if (result.errors) {
          for (const fieldName in result.errors) { 
            console.log(fieldName);
            if (fieldName in data) {
              setError(fieldName as keyof CreateUserInputs, {
                type: "manual",
                message: result.errors[fieldName as keyof typeof result.errors],
              });
            }
          }
          
        }
      }
    } catch (error) {
      console.error('Network error or unexpected issue:', error);
      alert('Сталася мережева помилка або непередбачена проблема.');
    }
  };
  
  return (
    <Container title="Добавити працівника">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          error={errors.email}
        />
        <Input
          register={register}
          label="Телефон"
          name="phone"
          type="string"
          placeholder="Телефон"
          error={errors.phone}
        />
        <Input
          register={register}
          label="Фамілія"
          name="lastName"
          type="string"
          placeholder="Фамілія"
          error={errors.lastName}
        />
        <Input
          register={register}
          label="Імя"
          name="firstName"
          type="string"
          placeholder="Імя"
          error={errors.firstName}
        />
        <Input
          register={register}
          label="По батькові"
          name="middleName"
          type="string"
          placeholder="Імя"
          error={errors.middleName}
        />
        <select {...register("role")}>
          {Object.entries(Role).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <button type="submit">Створити</button>

      </Form>
    </Container>
  )
}

export default CreatePage;