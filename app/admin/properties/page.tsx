import { PropertiesGrid } from "@/components/admin/properties-grid"
import { PageHeader } from "@/components/page-header"

export default function PropertiesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader heading="Approved Properties" text="View and manage all approved property listings" />
      <div className="flex-1 p-4 md:p-6">
        <PropertiesGrid />
      </div>
    </div>
  )
}
