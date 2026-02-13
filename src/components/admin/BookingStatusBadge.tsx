import { cn } from "@/lib/utils";

export type BookingStatus = "new" | "confirmed" | "completed" | "cancelled";

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  new: {
    label: "New",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  },
  completed: {
    label: "Completed",
    className: "bg-muted text-muted-foreground border-border",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
