import { AdminMessagesView } from "@/components/admin/messages-view"
import { PageHeader } from "@/components/page-header"

export default function MessagesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader heading="Messages" text="View and respond to messages from landlords and agents" />
      <div className="flex-1 h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] overflow-hidden">
        <AdminMessagesView />
      </div>
    </div>
  )
}
