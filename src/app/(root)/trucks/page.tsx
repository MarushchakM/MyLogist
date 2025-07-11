import { Container } from "@/components/Container";
// import { TruckTable } from "@/features/trucks/components/TruckTable";
import { TruckHeading } from "@/features/trucks/components/TruckHeading";

const TrackPage = async () => {
  return (
    <>
      <Container title="Тягачі">
        <TruckHeading />
        {/* <TruckTable /> */}
      </Container>
    </>
  );
};

export default TrackPage;
