import * as yup from "yup";

export const CreateTruckSchema = yup.object({
  truckNumber: yup
    .string()
    .required("Номер автомобіля не може бути порожнім.")
    .matches(/^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/, "Формат повинен бути: AA1111AA (використовуйте тільки латинські літери).")
});