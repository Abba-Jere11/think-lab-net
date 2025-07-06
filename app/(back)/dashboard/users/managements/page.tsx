import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";


import { getAllContacts } from "@/actions/admin";
import TableHeader from "@/components/dashboard/Tables/TableHeader";

export default async function page() {
  const managements = (await getAllContacts()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Head Of Departments"
        linkTitle="Add HOD"
        href="/dashboard/users/managements/new"
        data={managements}
        model="management"
      />
      <div className="py-8">
        <DataTable data={managements} columns={columns} />
      </div>
    </div>
  );
}
