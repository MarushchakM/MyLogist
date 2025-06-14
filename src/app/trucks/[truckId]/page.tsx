import { Button } from "@/app/components/Button";
import { Container } from "@/app/components/Container";
import { Heading } from "@/app/components/Heading";
import { getTruck } from "@/app/features/trucks/queries/getTruck";
import { trucksPath } from "@/paths";
import styles from './TruckPage.module.scss';
import { LucideTrash } from "lucide-react";
import { deleteTruck } from "../../features/trucks/actions/deleteTruck";
import { notFound } from "next/navigation";

type TicketPageProps = {
  params: {
    truckId: string;
  }
}

const TruckPage = async ({params}: TicketPageProps) => {
  const truck = await getTruck(params.truckId);
  
  if (!truck) {
    notFound();
  }
  
  return (
    <>
      <Container>
        <Heading title={`Тягач ${truck?.number}`} description="Детальна інформація" />
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
}

export default TruckPage;