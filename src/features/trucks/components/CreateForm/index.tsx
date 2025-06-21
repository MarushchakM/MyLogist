import { Button } from "@/components/Button";
import { useForm, SubmitHandler } from "react-hook-form"
import { createTruck } from "../../actions/createTruck";
import { Input } from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateTruckSchema } from "@/schemas/CreateTruckSchema";
import { getTrucks } from "../../queries/getTrucks";
import { getTruckByNumber } from "../../queries/getTruck";

export type CreateTruckInputs = {
  truckNumber: string;
}

type Props = {
  onSended: () => void;
}

export const CreateForm: React.FC<Props> = ({onSended}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<CreateTruckInputs>({
    resolver: yupResolver(CreateTruckSchema),
    mode: "onBlur",
  });
  
  
  const onSubmit: SubmitHandler<CreateTruckInputs> = async (data) => {
    setError("truckNumber", { message: undefined });

    try {
      const result = await createTruck(data.truckNumber);

      if (!result.success) {
        setError("truckNumber", {
          type: "manual",
          message: result.error,
        });
      } else {
        onSended();
      }
    } catch (error) {

      console.error("Помилка при додаванні авто:", error);
      setError("truckNumber", {
        type: "manual",
        message: "Сталася невідома помилка. Спробуйте ще раз.",
      });
    }
      // createTruck(data.truckNumber);
      // setTimeout(() => {
      //   onSended();
      // }, 2000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        name="truckNumber"
        label="Введіть номенр авто"
        placeholder="AA1234AA"
        error={errors.truckNumber}
      />
      <Button type="submit">{isSubmitting ? "Додавання..." : "Добавити авто"}</Button>
    </form>
  )
}
