import { useState } from "react"
import AppLayout from "../../../layouts/AppLayout"
import ScrapCard, { ScrapItem } from "../../../Common/DashboardComponents/ScrapCard"
import FilterBar from "../../../Common/DashboardComponents/Filterbar"
import AssemblyNavigationTabs from "../../../Common/Components/UI/AssemblyNavigationTabs"
import "../../../styles/style.css"
import AdminInbound from "./AdminInbound"
import AdminOutbound from "./AdminOutbound";
import StatsRow from "../../../Common/DashboardComponents/StatsRow"
import SyncButton from "../../../Common/Components/UI/SyncButton"


const tabs = ["Assembly", "Inbound", "Outbound"]

const mockData1: ScrapItem[] = Array.from({ length: 18 }, (_, i) => ({
  id: 155 + i*2,
  type: "Aluminium",
  weight: `${80 + i*3}kg`,
  status: "Pending",
  time: "12-01-2026 16:40:29",
}))

const mockData2: ScrapItem[] = Array.from({ length: 18 }, (_, i) => ({
  id: 155 + i*2,
  type: "Aluminium",
  weight: `${80 + i*3}kg`,
  status: "Approved",
  time: "12-01-2026 16:40:29",
  scheduled: i%2===0,
}))
const mockData3: ScrapItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: 155 + i*2,
  type: "Aluminium",
  weight: `${80 + i*3}kg`,
  status: "Challan Generated",
  time: "12-01-2026 16:40:29",
}))
const mockData4: ScrapItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: 155 + i*2,
  type: "Plastic",
  weight: `${80 + i*3}kg`,
  status: "Pending by Finance Team",
  time: "12-01-2026 16:40:29",
}))

export default function AdminAssembly() {

  const [activeTab, setActiveTab] = useState("Assembly")

const getFilterMode = () => {
  switch (activeTab) {
    case "Assembly":
      return "inbound"
    case "Inbound":
      return "adminInbound"
    case "Outbound":
      return "adminOutbound"
    default:
      return "inbound"
  }
}

const header = (
  <>
    <div className="flex-between">
      <AssemblyNavigationTabs
        value={activeTab as "Assembly" | "Inbound" | "Outbound"}
        onChange={setActiveTab}
      />
    <SyncButton/>
    </div>
    {activeTab === "Inbound" && (
      <StatsRow variant="adminInbound" />
    )}
    {activeTab === "Outbound" && (
      <StatsRow variant="adminOutbound" />
    )}
    <FilterBar mode={getFilterMode()} /> 
  </>
)

  return (
    <AppLayout header={header} showSettings={true} onSettingsClick={()=> console.log("Settings clicked")}>
      <div className="admin-content">
            {activeTab === "Assembly" && (
                <div className="scrap-grid">
                {mockData1.map(item => (
                <ScrapCard
                    key={item.id}
                    item={item}
                    mode="outbound"
                />
                ))}
                </div>
            )}
            
            {activeTab === "Inbound" && (
                <AdminInbound data={mockData2} />
                )}
                {activeTab === "Outbound" && (
                 <AdminOutbound data={[...mockData1, ...mockData2,...mockData3,...mockData4]} />
                )}

            
      </div>
    </AppLayout>
  )
}
