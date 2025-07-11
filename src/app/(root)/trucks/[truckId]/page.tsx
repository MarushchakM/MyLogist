import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { getTruck } from "@/features/trucks/queries/getTruck";
import { trucksPath } from "@/paths";
import styles from "./TruckPage.module.scss";
import { LucideTrash } from "lucide-react";
import { deleteTruck } from "@/features/trucks/actions/deleteTruck";
import { notFound } from "next/navigation";

const TruckPage = async ({
  params,
}: {
  params: Promise<{ truckId: string }>
  }) => {
  
  const { truckId } = await params;
  const truck = await getTruck(truckId);

  if (!truck) {
    notFound();
  }

  return (
    <>
      <Container title={`Тягач ${truck?.number}`}>
        <div className={styles.buttons}>
          <Button href={trucksPath()} variant="secondary">
            До списку авто
          </Button>
          {truck && (
            <form action={deleteTruck.bind(null, truck.id)}>
              <Button variant="danger" type="submit">
                <LucideTrash />
              </Button>
            </form>
          )}
        </div>
      </Container>
    </>
  );
};

export default TruckPage;
