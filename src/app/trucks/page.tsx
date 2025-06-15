import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { TruckTable } from "@/features/trucks/components/TruckTable";
import style from "./TrucksPage.module.scss";
import { Modal } from "@/components/Modal";
import { TruckHeading } from "@/features/trucks/components/TruckHeading";

const TrackPage = async () => {
  return (
    <>
      <Container>
        <TruckHeading />
        <TruckTable />
      </Container>
    </>
  );
};

export default TrackPage;
