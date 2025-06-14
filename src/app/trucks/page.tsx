import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { TruckTable } from "@/features/trucks/components/TruckTable";

const TrackPage = async () => {
  return (
    <Container>
      <Heading title="Тягачі" description="Список тягачів" />
      <TruckTable />
    </Container>
  );
};

export default TrackPage;
