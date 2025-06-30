import { Heading } from "@/components/Heading";
import { SignOutButton } from "@/components/sign-out";

const Home = async () => {
  
  return (
    <>
      <SignOutButton />
      <Heading title="Головна сторінка" description="Контент головної сторінки" />

    </>
    
  );
}

export default Home;