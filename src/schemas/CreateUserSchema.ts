import { Role } from "@prisma/client";
import * as yup from "yup";

export const CreateUserSchema = yup.object({
  email: yup
    .string()
    .email("Введіть коректний емейл")
    .required("Емейл не може бути порожнім"),

  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Введіть номер у форматі +380XXXXXXXXX")
    .required("Телефон не може бути порожнім"),

  lastName: yup
    .string()
    .min(2, "Прізвище має містити щонайменше 2 символи")
    .required("Прізвище не може бути порожнім"),

  firstName: yup
    .string()
    .min(2, "Ім’я має містити щонайменше 2 символи")
    .required("Ім’я не може бути порожнім"),

  middleName: yup
    .string()
    .min(2, "По батькові має містити щонайменше 2 символи")
    .required("По батькові не може бути порожнім"),
  role: yup
    .mixed<Role>()
    .oneOf(Object.values(Role), "Виберіть допустиму роль")
    .required("Роль не може бути порожньою"),
});
