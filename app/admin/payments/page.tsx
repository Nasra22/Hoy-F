import { PaymentsView } from "@/components/admin/payments-view"
import { PageHeader } from "@/components/page-header"

export default function PaymentsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader heading="Payments" text="Track and manage all payment transactions" />
      <div className="flex-1 p-4 md:p-6">
        <PaymentsView />
      </div>
    </div>
  )
}
