import { UsersTable } from "@/components/admin/users-table"
import { PageHeader } from "@/components/page-header"

export default function UsersPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader heading="Users" text="Manage all registered users" />
      <div className="flex-1 p-4 md:p-6">
        <UsersTable />
      </div>
    </div>
  )
}
