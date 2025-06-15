import { Button } from "@/components/Button";
import { useForm, SubmitHandler } from "react-hook-form"
import { createTruck } from "../../actions/createTruck";

type Inputs = {
  number: string
}

export const CreateForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => createTruck(data.number);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Введіть номенр авто</label>
        <input type="text" placeholder="BC0000IX" {...register("number")}/>
      </div>
      <Button type="submit">Добавити авто</Button>
    </form>
  )
}
