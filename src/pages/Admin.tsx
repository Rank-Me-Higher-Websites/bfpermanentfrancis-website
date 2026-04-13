import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Lock, RefreshCw, User, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO, isToday, isBefore, startOfDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Booking } from "@/components/admin/BookingTable";

const ADMIN_USERNAME = "Birute";
const ADMIN_PASSWORD = "Birute123@";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isAuthenticated) loadBookings();
  }, [isAuthenticated]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      const teamupBookings = (data.bookings || []) as Booking[];
      const localBookings = JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[];
      const teamupIds = new Set(teamupBookings.map((b) => b.id));
      const uniqueLocal = localBookings.filter((b) => !teamupIds.has(b.id) && !(b as any).teamup_event_id);
      const merged = [...teamupBookings, ...uniqueLocal];
      merged.sort((a, b) => new Date(a.preferred_date || a.created_at).getTime() - new Date(b.preferred_date || b.created_at).getTime());
      setBookings(merged);
    } catch {
      const data = JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[];
      data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      setBookings(data);
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    bookings.forEach((b) => {
      if (b.preferred_date) {
        const key = b.preferred_date;
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(b);
      }
    });
    return map;
  }, [bookings]);

  const upcomingBookings = useMemo(() => {
    const today = startOfDay(new Date());
    return bookings.filter((b) => {
      if (!b.preferred_date) return false;
      const date = startOfDay(parseISO(b.preferred_date));
      return !isBefore(date, today);
    });
  }, [bookings]);

  const rightPanelBookings = useMemo(() => {
    if (selectedDate) {
      const key = format(selectedDate, "yyyy-MM-dd");
      const dayBookings = bookingsByDate.get(key) || [];
      return [...dayBookings].sort((a, b) => (a.preferred_time || "").localeCompare(b.preferred_time || ""));
    }
    return upcomingBookings;
  }, [selectedDate, bookingsByDate, upcomingBookings]);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const startDayOfWeek = getDay(startOfMonth(currentMonth));
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login | BF Permanent Francis</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex min-h-screen items-center justify-center bg-muted p-6">
          <div className="w-full max-w-md">
            <form
              onSubmit={handleLogin}
              className="rounded-2xl border-2 border-gray-300 bg-card p-8 sm:p-10 shadow-lg space-y-8"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-2xl sm:text-3xl text-center" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                  Admin Login
                </h1>
                <p className="text-base text-muted-foreground text-center">
                  Enter your credentials to see your bookings
                </p>
              </div>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="h-14 text-lg px-5" data-testid="input-username" autoFocus />
              <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="h-14 text-lg px-5" data-testid="input-password" />
              {error && <p className="text-base text-destructive text-center font-medium">{error}</p>}
              <Button type="submit" variant="cta" className="w-full h-14 text-lg rounded-xl" data-testid="button-sign-in">Sign In</Button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Bookings | BF Permanent Francis</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-muted">
        <header className="border-b-2 border-gray-300 bg-card">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-[1400px] mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>My Bookings</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={loadBookings} className="h-10 px-4 text-sm gap-2 border-2 border-gray-300" data-testid="button-refresh">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsAuthenticated(false)} className="h-10 px-4 text-sm text-muted-foreground" data-testid="button-logout">
                Log out
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-3">
                <RefreshCw className="h-8 w-8 text-primary mx-auto opacity-60" style={{ animation: "spin 1s linear infinite" }} />
                <p className="text-muted-foreground text-lg">Loading bookings...</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="lg:w-[55%] flex-shrink-0">
                <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-5 py-4">
                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                      {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 px-3 pb-2">
                    {WEEKDAYS.map((day) => (
                      <div key={day} className="py-1 text-center text-xs font-semibold text-gray-400">
                        {day.slice(0, 2)}
                      </div>
                    ))}
                  </div>

                  <div className="px-3 pb-4">
                    {(() => {
                      const allCells: (Date | null)[] = [];
                      for (let i = 0; i < startDayOfWeek; i++) allCells.push(null);
                      days.forEach((d) => allCells.push(d));
                      while (allCells.length % 7 !== 0) allCells.push(null);
                      const weeks: (Date | null)[][] = [];
                      for (let i = 0; i < allCells.length; i += 7) weeks.push(allCells.slice(i, i + 7));

                      return weeks.map((week, wi) => (
                        <div key={wi} className="grid grid-cols-7 gap-1.5 mb-1.5">
                          {week.map((day, di) => {
                            if (!day) {
                              return <div key={`empty-${wi}-${di}`} className="h-[72px]" />;
                            }
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
                                  h-[72px] rounded-lg p-1.5 text-left flex flex-col transition-colors
                                  ${isSelected
                                    ? "bg-primary/15 ring-2 ring-primary"
                                    : hasBookings
                                      ? "bg-purple-50 border border-purple-200 hover:bg-purple-100"
                                      : "border border-gray-200 hover:bg-gray-50"
                                  }
                                  ${today && !isSelected ? "ring-2 ring-primary" : ""}
                                `}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className={`
                                    text-sm font-semibold
                                    ${today ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs" : ""}
                                    ${!today ? "text-gray-700" : ""}
                                  `}>
                                    {format(day, "d")}
                                  </span>
                                  {hasBookings && (
                                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold px-1">
                                      {dayBookings.length}
                                    </span>
                                  )}
                                </div>
                                {hasBookings && (
                                  <div className="mt-auto">
                                    <span className="text-[10px] leading-tight font-medium text-primary/80 truncate block">
                                      {dayBookings[0].full_name.split(" ")[0]}
                                    </span>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>

              <div className="lg:w-[45%] flex-shrink-0">
                <div className="rounded-2xl border-2 border-gray-300 bg-card overflow-hidden">
                  <div className="px-5 py-3 border-b-2 border-gray-300 bg-gray-50">
                    <h2 className="text-lg font-bold" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                      {selectedDate ? format(selectedDate, "EEEE, MMMM d") : "Upcoming Appointments"}
                    </h2>
                    {selectedDate && (
                      <button
                        onClick={() => setSelectedDate(null)}
                        className="text-sm text-primary font-medium hover:underline mt-0.5"
                      >
                        Show all upcoming
                      </button>
                    )}
                  </div>

                  <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
                    {rightPanelBookings.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-gray-400 text-base">
                          {selectedDate ? "No appointments on this day." : "No upcoming appointments."}
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {rightPanelBookings.map((b, i) => {
                          const showDateHeader = !selectedDate && (i === 0 || b.preferred_date !== rightPanelBookings[i - 1].preferred_date);
                          let dateLabel = "";
                          if (showDateHeader) {
                            try {
                              const parsed = parseISO(b.preferred_date);
                              dateLabel = isToday(parsed) ? "Today" : format(parsed, "EEE, MMM d");
                            } catch { dateLabel = b.preferred_date; }
                          }

                          return (
                            <div key={b.id}>
                              {showDateHeader && (
                                <div className="px-5 py-2 bg-gray-50 border-b border-gray-200">
                                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{dateLabel}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                                  <User className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-foreground truncate">{b.full_name}</p>
                                  <p className="text-xs font-semibold text-primary">{b.preferred_time}</p>
                                  <p className="text-xs text-gray-500 truncate">{b.service_type}</p>
                                </div>
                                {b.phone && (
                                  <a href={`tel:${b.phone}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 hover:bg-primary/20 transition-colors">
                                    <Phone className="h-4 w-4 text-primary" />
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
