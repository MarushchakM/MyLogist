import * as yup from "yup";

export const SignInSchema = yup.object({
  email: yup
      .string()
      .email("Введіть коректний емейл")
      .required("Емейл не може бути порожнім"),
  password: yup
    .string()
    .required('Пароль обов’язковий')
});