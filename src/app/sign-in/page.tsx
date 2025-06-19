import { signIn } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";

const SignInPage = () => {
  return (
    <form action={
      async (formData: FormData) => {
        "use server";
        await executeAction({
          actionFn: async () => {
            await signIn('credentials', formData);
          },
        });
      }
    }>
      <input type="email" name="email"/>
      <input type="password" name="password" />
      <button type="submit">Sig In</button>
    </form>
  )
}

export default SignInPage;