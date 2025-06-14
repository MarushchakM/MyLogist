import { Table } from "@/app/components/Table";
import { getTrucks } from "../queries/getTrucks";
import { Suspense } from "react";
import { Spinner } from "@/app/components/Spinner";
import { trucksPath } from "@/paths";

export const TruckTable = async () => {
  const statusMap: Record<string, string> = {
    FREE: 'Вільне',
    ON_ROAD: 'В рейсі',
    IN_WORKSHOP: 'У сервісі',
  };
  
  const trucks = await getTrucks();
  const sortedTruck = trucks.map(item => ({
    number: item.number,
    status: statusMap[item.status],
    id: item.id,
  }));
  
  const tableHeaders = ['Номер', 'Статус'];
  return (
    <Suspense fallback={<Spinner />}>
      <Table
        titles={tableHeaders}
        rows={sortedTruck}
        path={trucksPath()}
      />
    </Suspense>
  );
};