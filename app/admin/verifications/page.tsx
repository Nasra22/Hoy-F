import { VerificationsView } from "@/components/admin/verifications-view"
import { PageHeader } from "@/components/page-header"

export default function VerificationsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader heading="Verifications" text="Review and approve pending verification requests" />
      <div className="flex-1 p-4 md:p-6">
        <VerificationsView />
      </div>
    </div>
  )
}
