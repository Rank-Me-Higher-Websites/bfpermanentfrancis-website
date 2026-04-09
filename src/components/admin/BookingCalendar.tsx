import { useState, useMemo } from "react";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday, addMonths, subMonths, isSameMonth } from "date-fns";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { type Booking } from "./BookingTable";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface BookingCalendarProps {
  bookings: Booking[];
}

export function BookingCalendar({ bookings }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Leading empty cells for alignment
  const startDayOfWeek = getDay(startOfMonth(currentMonth));

  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    bookings.forEach((b) => {
      if (b.preferred_date) {
        const key = b.preferred_date; // YYYY-MM-DD
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(b);
      }
    });
    return map;
  }, [bookings]);

  const selectedBookings = useMemo(() => {
    if (!selectedDate) return [];
    const key = format(selectedDate, "yyyy-MM-dd");
    return bookingsByDate.get(key) || [];
  }, [selectedDate, bookingsByDate]);

  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-4">
      {/* Calendar Grid */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {/* Month Navigation */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-border hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <h2 className="text-lg sm:text-xl">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-border hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Day Cells */}
        <div className="grid grid-cols-7">
          {/* Empty cells before first day */}
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r border-border bg-muted/30 min-h-[60px] sm:min-h-[80px]" />
          ))}

          {days.map((day) => {
            const key = format(day, "yyyy-MM-dd");
            const dayBookings = bookingsByDate.get(key) || [];
            const hasBookings = dayBookings.length > 0;
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const today = isToday(day);

            return (
              <button
                key={key}
                onClick={() => setSelectedDate(isSelected ? null : day)}
                className={`
                  relative border-b border-r border-border min-h-[60px] sm:min-h-[80px] p-1 sm:p-2
                  text-left transition-colors flex flex-col
                  ${isSelected ? "bg-primary/10 ring-2 ring-primary ring-inset" : "hover:bg-muted/50"}
                  ${today ? "bg-accent/30" : ""}
                `}
              >
                {/* Day Number */}
                <span className={`
                  text-xs sm:text-sm font-medium
                  ${today ? "flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary text-primary-foreground" : ""}
                  ${!today && hasBookings ? "font-bold text-foreground" : "text-muted-foreground"}
                `}>
                  {format(day, "d")}
                </span>

                {/* Booking Dots / Count */}
                {hasBookings && (
                  <div className="mt-auto">
                    {/* Mobile: just show count */}
                    <span className="sm:hidden flex items-center justify-center text-xs font-bold text-primary bg-primary/15 rounded-full h-5 w-5 mx-auto">
                      {dayBookings.length}
                    </span>
                    {/* Desktop: show up to 2 names */}
                    <div className="hidden sm:flex flex-col gap-0.5">
                      {dayBookings.slice(0, 2).map((b) => (
                        <span
                          key={b.id}
                          className={`
                            text-[10px] leading-tight font-medium truncate rounded px-1 py-0.5
                            ${b.status === "new" ? "bg-primary/15 text-primary" :
                              b.status === "confirmed" ? "bg-emerald-500/15 text-emerald-700" :
                              b.status === "cancelled" ? "bg-destructive/15 text-destructive" :
                              "bg-muted text-muted-foreground"}
                          `}
                        >
                          {b.full_name.split(" ")[0]}
                        </span>
                      ))}
                      {dayBookings.length > 2 && (
                        <span className="text-[10px] text-muted-foreground font-medium">
                          +{dayBookings.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Detail */}
      {selectedDate && (
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-3">
          <h3 className="text-lg sm:text-xl">
            📅 {format(selectedDate, "EEEE, MMMM d")}
          </h3>
          {selectedBookings.length === 0 ? (
            <p className="text-base text-muted-foreground">No bookings on this day.</p>
          ) : (
            <div className="space-y-3">
              {selectedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:p-4"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading text-base sm:text-lg font-bold truncate">
                        {booking.full_name}
                      </span>
                      <BookingStatusBadge status={booking.status} />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{booking.service_type}</p>
                    <div className="flex gap-3 mt-1">
                      <a href={`tel:${booking.phone}`} className="text-sm text-primary font-medium hover:underline">
                        📞 Call
                      </a>
                      <a href={`mailto:${booking.email}`} className="text-sm text-primary font-medium hover:underline">
                        ✉️ Email
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
