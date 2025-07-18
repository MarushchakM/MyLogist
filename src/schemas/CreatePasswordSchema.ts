import * as yup from "yup";

export const CreatePasswordSchema = yup.object({
  password: yup
    .string()
    .required('Пароль обов’язковий')
    .min(6, 'Пароль має містити щонайменше 6 символів'),
  
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Паролі не співпадають')
    .required('Підтвердження пароля обов’язкове'),
});