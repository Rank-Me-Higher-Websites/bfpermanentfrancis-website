import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Phone, Mail, Calendar, Clock, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingStatusBadge, type BookingStatus } from "./BookingStatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Booking {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  notes: string;
  status: BookingStatus;
  created_at: string;
}

interface BookingTableProps {
  bookings: Booking[];
  onStatusChange: (id: string, status: BookingStatus) => void;
}

const TIME_LABELS: Record<string, string> = {
  morning: "Morning (9-12)",
  afternoon: "Afternoon (12-4)",
  evening: "Evening (4-7)",
};

export function BookingTable({ bookings, onStatusChange }: BookingTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <Calendar className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <p className="text-lg font-medium text-muted-foreground">No bookings found</p>
        <p className="text-sm text-muted-foreground/70">Bookings will appear here when clients submit requests.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => {
        const isExpanded = expandedId === booking.id;
        return (
          <div
            key={booking.id}
            className="rounded-xl border border-border bg-card overflow-hidden transition-all"
          >
            {/* Card Header - always visible */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : booking.id)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-heading font-semibold text-foreground truncate">
                    {booking.full_name}
                  </span>
                  <BookingStatusBadge status={booking.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground truncate">
                  {booking.service_type} · {booking.preferred_date ? format(parseISO(booking.preferred_date), "MMM d, yyyy") : "No date"} · {TIME_LABELS[booking.preferred_time] || booking.preferred_time}
                </p>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="border-t border-border px-4 pb-4 pt-3 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={`tel:${booking.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    {booking.phone}
                  </a>
                  <a href={`mailto:${booking.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    {booking.email}
                  </a>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    {booking.preferred_date ? format(parseISO(booking.preferred_date), "EEEE, MMMM d, yyyy") : "No date"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    {TIME_LABELS[booking.preferred_time] || booking.preferred_time}
                  </div>
                </div>

                {booking.notes && (
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <p>{booking.notes}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm font-medium text-foreground">Update status:</span>
                  <div className="flex flex-wrap gap-2">
                    {(["new", "confirmed", "completed", "cancelled"] as BookingStatus[]).map(
                      (s) => (
                        <Button
                          key={s}
                          size="sm"
                          variant={booking.status === s ? "default" : "outline"}
                          className="h-9 min-w-[90px] capitalize"
                          onClick={() => onStatusChange(booking.id, s)}
                        >
                          {s}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground/60">
                  Submitted {format(parseISO(booking.created_at), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
