import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Phone, Mail, Calendar, Clock, MessageSquare, ChevronDown, User } from "lucide-react";
import { BookingStatusBadge, type BookingStatus } from "./BookingStatusBadge";

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
  morning: "Morning (9–12)",
  afternoon: "Afternoon (12–4)",
  evening: "Evening (4–7)",
};

const STATUS_ACTIONS: { status: BookingStatus; label: string; emoji: string; activeClass: string; inactiveClass: string }[] = [
  {
    status: "new",
    label: "New",
    emoji: "🆕",
    activeClass: "bg-primary text-primary-foreground border-primary",
    inactiveClass: "bg-card text-foreground border-border hover:border-primary/40",
  },
  {
    status: "confirmed",
    label: "Confirmed",
    emoji: "✅",
    activeClass: "bg-emerald-600 text-white border-emerald-600",
    inactiveClass: "bg-card text-foreground border-border hover:border-emerald-400",
  },
  {
    status: "completed",
    label: "Done",
    emoji: "✔️",
    activeClass: "bg-muted-foreground text-background border-muted-foreground",
    inactiveClass: "bg-card text-foreground border-border hover:border-muted-foreground/40",
  },
  {
    status: "cancelled",
    label: "Cancelled",
    emoji: "❌",
    activeClass: "bg-destructive text-destructive-foreground border-destructive",
    inactiveClass: "bg-card text-foreground border-border hover:border-destructive/40",
  },
];

export function BookingTable({ bookings, onStatusChange }: BookingTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-16 text-center">
        <Calendar className="mb-4 h-16 w-16 text-muted-foreground/30" />
        <p className="text-xl text-muted-foreground" style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 900 }}>No bookings yet</p>
        <p className="text-base text-muted-foreground/70 mt-2">
          When clients book an appointment, they will show up here.
        </p>
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
            className="rounded-2xl border border-border bg-card overflow-hidden transition-all shadow-sm"
          >
            {/* Card Header */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : booking.id)}
              className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                {/* Avatar circle */}
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <User className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-bold text-foreground truncate" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                      {booking.full_name}
                    </span>
                    <BookingStatusBadge status={booking.status} />
                  </div>
                  <p className="mt-0.5 text-sm sm:text-base text-muted-foreground truncate">
                    {booking.service_type}
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    {booking.preferred_date
                      ? format(parseISO(booking.preferred_date), "EEE, MMM d")
                      : "No date"}{" "}
                    · {TIME_LABELS[booking.preferred_time] || booking.preferred_time}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-6 w-6 text-muted-foreground transition-transform flex-shrink-0 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="border-t border-border px-4 sm:px-5 pb-5 pt-4 space-y-5">
                {/* Contact Info — large tap targets */}
                <div className="space-y-3">
                  <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
                    Contact Details
                  </h3>
                  <a
                    href={`tel:${booking.phone}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:p-4 text-base font-medium text-foreground hover:bg-primary/5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tap to call</p>
                      <p className="text-base sm:text-lg font-medium">{booking.phone}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${booking.email}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:p-4 text-base font-medium text-foreground hover:bg-primary/5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tap to email</p>
                      <p className="text-base sm:text-lg font-medium break-all">{booking.email}</p>
                    </div>
                  </a>
                </div>

                {/* Appointment Info */}
                <div className="space-y-3">
                  <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
                    Appointment
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:p-4">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="text-base font-medium">
                          {booking.preferred_date
                            ? format(parseISO(booking.preferred_date), "EEEE, MMMM d, yyyy")
                            : "No date set"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:p-4">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="text-base font-medium">
                          {TIME_LABELS[booking.preferred_time] || booking.preferred_time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {booking.notes && (
                  <div className="space-y-2">
                    <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
                      Client's Note
                    </h3>
                    <div className="flex gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:p-4">
                      <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-base text-foreground">{booking.notes}</p>
                    </div>
                  </div>
                )}

                {/* Status Buttons — BIG and obvious */}
                <div className="space-y-3">
                  <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
                    Change Status
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                    {STATUS_ACTIONS.map((action) => {
                      const isActive = booking.status === action.status;
                      return (
                        <button
                          key={action.status}
                          onClick={() => onStatusChange(booking.id, action.status)}
                          className={`
                            flex items-center justify-center gap-2 rounded-xl border-2 py-3 sm:py-4 px-3
                            text-sm sm:text-base font-semibold transition-all
                            ${isActive ? action.activeClass : action.inactiveClass}
                          `}
                        >
                          <span className="text-lg">{action.emoji}</span>
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submitted timestamp */}
                <p className="text-xs sm:text-sm text-muted-foreground/60 pt-2 border-t border-border">
                  Booked on {format(parseISO(booking.created_at), "MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
