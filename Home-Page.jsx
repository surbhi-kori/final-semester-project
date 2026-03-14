import editIcon from "../../assets/image-assets/penciledit.png";
import scrapIcon from "../../assets/image-assets/scrap_icon.png";
import Approvedstat from "../../assets/image-assets/stats-approval_img.png";
import StatusBadge from "./StatusBadge";
import { useState } from "react";
import EditScrapDialog from "./EditScrapModal";
import calendarIcon from "../../assets/image-assets/calendar-icon.png";
import AppButton from "../Components/UI/ButtonUI";
import historyIcon from "../../assets/image-assets/history_icon.png"
import HistoryDrawer from "../../Modules/AdminDashboard/AdminComponents/HistoryDrawer"
import ConfirmActionDialog from "../Components/UI/ConfirmActionDialog";

/* -------------------- TYPES -------------------- */

export type ScrapStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Overdue"
  | "Draft"
  | "Sent For Approval"
  | "Resubmitted"
  | "Pending by Finance Team"
  | "Challan Generated";

export type ScrapMode =
  | "inbound"
  | "outbound"
  | "adminInbound"
  | "adminOutbound";

export type ScrapItem = {
  id: number | string;
  type: string;
  weight: number | string;
  status: ScrapStatus;
  time?: string;
  date?: string;
  approval?: string;
  note?: string;
  icon?: string;
  scheduled?: boolean; // new parameter for defining which cards are scheduled and which are not in admin inbound
};

type ScrapCardProps = {
  item: ScrapItem;
  mode?: ScrapMode;
  onClick?: (item: ScrapItem) => void;
};

/* -------------------- COMPONENT -------------------- */

export default function ScrapCard({
  item,
  mode = "inbound",
  onClick,
}: ScrapCardProps) {
  // Better CSS class formatting
  const statusClass = item.status
    .toLowerCase()
    .replace(/\s+/g, "-");

  const [editOpen, setEditOpen] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSave = (updated: ScrapItem) => {
    console.log("Updated scrap:", updated);
    setEditOpen(false);
  };

  const handleCardClick = () => {
    if (
      (mode === "outbound" || mode === "adminOutbound") &&
      item.status === "Pending"
    ) {
      onClick?.(item);
    }
  };
// new stuff history drawer
  const [historyOpen, setHistoryOpen] = useState(false)
//Confirm Action Dialog
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [confirmAction, setConfirmAction] = useState<"Approve" | "Reject" | "Schedule" | null>(null)
    const openConfirm = (action: "Approve" | "Reject" | "Schedule") => {
    setConfirmAction(action)
    setConfirmOpen(true)
  }
  /* -------------------- UI -------------------- */

  return (
    <div
      className={`scrap-card ${mode}-card ${statusClass}`}
      onClick={handleCardClick}
    >
      {/* -------------------- TOP SECTION -------------------- */}
      <div className="scrap-top">
        <div className="scrap-left">
          <img
            src={item.icon || scrapIcon}
            className="scrap-img"
            alt="scrap"
          />

          <div>
            <div className="scrap-title">
              {item.type} - {item.weight}

              {/* EDIT ICON RULES */}

              {/* INBOUND */}
              { mode === "inbound" &&
                (item.status === "Pending" ||
                  item.status === "Overdue") && (
                  <img
                    src={editIcon}
                    className="edit-icon"
                    alt="Edit"
                    onClick={handleEditClick}
                  />
                )}

              {/* OUTBOUND + ADMIN OUTBOUND */}
              {(mode === "outbound" ||
                mode === "adminOutbound") &&
                item.status === "Draft"  && (
                  <img
                    src={editIcon}
                    className="edit-icon"
                    alt="Edit"
                    onClick={handleEditClick}
                  />
                )}
            </div>

            <div className="scrap-meta">
              {item.id} |{" "}
              {mode === "outbound" ||
              mode === "adminOutbound"
                ? item.date || item.time
                : item.time}

              {(mode === "outbound" ||
                mode === "adminOutbound") &&
                item.approval && (
                  <>
                    {" | "}
                    <span className="approved-dot">
                      <img
                        src={Approvedstat}
                        className="stat-dot"
                        alt="approval"
                      />
                      {item.approval}
                    </span>
                  </>
                )}
            </div>
          </div>
        </div>

        {/* <StatusBadge status={item.status} />  existing before history icon implemented */}

{/* this is to implement history icon in admin inbound....the history icon should show in the admin assembly as well, 
    but since te admin assembly is conditionally rendered using outbound scrap card, couldnt implement the history icon in admin assembly*/}

        <div className="scrap-status-group">

          {mode === "adminInbound" && (
            <img
              src={historyIcon}
              className="history-icon"
              onClick={(e)=>{
                e.stopPropagation()
                setHistoryOpen(true)
              }}
            />
          )}
          <StatusBadge status={item.status} />
        </div>

      </div>

      {/* -------------------- INBOUND + ADMIN INBOUND ACTIONS -------------------- */}

      { mode === "inbound" && (
        <div className="card-actions">
          {(item.status === "Pending" ||
            item.status === "Overdue") && (
            <>
              {/* <button className="btn btn-danger">
                Reject
              </button>
              <button className="btn btn-success">
                Approve
              </button> */}
              <button
                className="btn btn-danger"
                onClick={() => openConfirm("Reject")}
              >
                Reject
              </button>
              <button
                className="btn btn-success"
                onClick={() => openConfirm("Approve")}
              >
                Approve
              </button>

            </>
          )}

          {item.status === "Rejected" && (
            <button className="btn btn-dark">
              Reopen
            </button>
          )}
        </div>
      )}

      {mode === "adminInbound" && (
        <div className="card-actions">
          {item.scheduled ? (
            <div className="scheduled-text">
                Scheduled for Today
              <img
                src={calendarIcon}
                alt="calendar"
                className="scheduled-icon"
              />
            </div>
          ) : (
            <AppButton
              variant="filled"
              sx={{
                height: "30px",
                padding: "4px 10px",
                borderRadius: "2px",
              }}
              onClick={()=>openConfirm("Schedule")}
            >
              Schedule
            </AppButton>
          )}
        </div>
      )}

      {/* -------------------- OUTBOUND NOTE -------------------- */}

      {(mode === "outbound" ||
        mode === "adminOutbound") &&
        item.note && (
          <div className="scrap-note outbound-note">
            <p className="note-title">
              Additional Note
            </p>
            <p className="note-text">
              {item.note}
            </p>
          </div>
        )}

      {/* -------------------- ADMIN OUTBOUND EXTRA ACTIONS -------------------- */}

      {mode === "adminOutbound" && (
        <div className="admin-outbound-actions">
          {item.status === "Pending" && (
            <>
              <button className="btn btn-danger">
                Reject
              </button>
              <button className="btn btn-success">
                Approve
              </button>
            </>
          )}

          {item.status === "Approved" && (
            <button className="btn btn-primary">
              Send Approve Mail
            </button>
          )}

          {item.status ===
            "Pending by Finance Team" && (
            <button className="btn btn-warning">
              Waiting for Finance
            </button>
          )}
        </div>
      )}

      <EditScrapDialog
        open={editOpen}
        scrap={item}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />
      
      {/* History Drawer Icon and Data */}
    <HistoryDrawer
      open={historyOpen}
      onClose={()=>setHistoryOpen(false)}
      scrapTitle={`${item.type} - ${item.weight}`}
      history={[
        {title:"Pending by Finance Team"},
        {title:"Pending by Plant Head"},
        {title:"Pending by L3 Manager"},
        {title:"Pending by L2 Manager"},
        {title:"Approved by L1 Manager", user:"elliot.debrunner@volvo.com", time:"12-01-2026 16:40:29"},
        {title:"Sent for approval from outbound", user:"lukas.kiener@volvo.com", time:"12-01-2026 16:40:29", comment:"Significant discrepancy in scrap condition; approval cannot be granted at this stage."},
        {title:"Scheduled to outbound by admin", user:"sandro.freund@volvo.com", time:"12-01-2026 16:40:29"},
        {title:"Approved by sentry", user:"dennis.wechsler@volvo.com", time:"12-01-2026 16:40:29", comment:"Scrap contains different material looks acceptable."},
        {title:"Scrap from assembly",user:"sandro.freund@volvo.com", time:"12-01-2026 16:40:29"},
      ]}
    />

      <ConfirmActionDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          console.log(`${confirmAction} confirmed`)
          setConfirmOpen(false)
        }}
        message={`Do you want to ${confirmAction} Scrap ${item.id} : ${item.type} - ${item.weight}?`}
      />

    </div>
  );
}
