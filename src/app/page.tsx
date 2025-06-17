import { Heading } from "@/components/Heading";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();

  if (!session) redirect("/sign-in");
  
  return (
    <Heading title="Головна сторінка" description="Контент головної сторінки" />
  );
}

export default Home;