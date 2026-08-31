// Scratch preview for the engagement timeline figure. Not linked from anywhere
// and not in prospect-pages.ts, so it is not a proposal and cannot be sent.
// Delete once the figure is agreed.
import "../for/_components/shell.css";
import EngagementTimeline from "../for/_components/library/EngagementTimeline";

export default function PreviewTimeline() {
  return (
    <div className="pps-root" style={{ padding: "70px 90px", maxWidth: 980 }}>
      <EngagementTimeline />
    </div>
  );
}
