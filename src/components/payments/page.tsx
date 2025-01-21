import { useEffect, useState } from "react";
import { DataTable } from "@/components/payments/data-table";
import { Payment, columns } from "@/components/payments/columns";
import {payments} from "@/components/payments/payments-data.ts";

async function getData(): Promise<Payment[]> {
  return payments;
}

export default function DataPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}