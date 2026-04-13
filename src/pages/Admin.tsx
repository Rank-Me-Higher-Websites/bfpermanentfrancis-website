import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Lock, RefreshCw, CalendarDays, List, User, Phone } from "lucide-react";
import { format, parseISO, isToday, isBefore, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Booking } from "@/components/admin/BookingTable";
import { BookingCalendar } from "@/components/admin/BookingCalendar";

const ADMIN_USERNAME = "Birute";
const ADMIN_PASSWORD = "Birute123@";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [view, setView] = useState<"calendar" | "upcoming">("calendar");
  const [loading, setLoading] = useState(false);

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

  const upcomingBookings = useMemo(() => {
    const today = startOfDay(new Date());
    return bookings.filter((b) => {
      if (!b.preferred_date) return false;
      const date = startOfDay(parseISO(b.preferred_date));
      return !isBefore(date, today);
    });
  }, [bookings]);

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
              className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-lg space-y-8"
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

              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="h-14 text-lg px-5"
                data-testid="input-username"
                autoFocus
              />

              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-14 text-lg px-5"
                data-testid="input-password"
              />

              {error && (
                <p className="text-base text-destructive text-center font-medium">{error}</p>
              )}

              <Button type="submit" variant="cta" className="w-full h-14 text-lg rounded-xl" data-testid="button-sign-in">
                Sign In
              </Button>
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
        <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-6xl mx-auto">
            <h1 className="text-xl sm:text-2xl" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>My Bookings</h1>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setView("calendar")}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                    view === "calendar" ? "gradient-bg text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                  data-testid="tab-calendar"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </button>
                <button
                  onClick={() => setView("upcoming")}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                    view === "upcoming" ? "gradient-bg text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                  data-testid="tab-upcoming"
                >
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">Upcoming</span>
                </button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={loadBookings}
                className="h-10 px-4 text-sm gap-2"
                data-testid="button-refresh"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="h-10 px-4 text-sm text-muted-foreground"
                data-testid="button-logout"
              >
                Log out
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-3">
                <RefreshCw className="h-8 w-8 text-primary mx-auto opacity-60" style={{ animation: "spin 1s linear infinite" }} />
                <p className="text-muted-foreground text-lg">Loading bookings from Teamup...</p>
              </div>
            </div>
          ) : view === "calendar" ? (
            <BookingCalendar bookings={bookings} />
          ) : (
            <UpcomingList bookings={upcomingBookings} />
          )}
        </main>
      </div>
    </>
  );
}

function UpcomingList({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">No upcoming appointments.</p>
      </div>
    );
  }

  let lastDate = "";

  return (
    <div className="space-y-3">
      {bookings.map((b) => {
        const dateStr = b.preferred_date || "";
        const showDateHeader = dateStr !== lastDate;
        lastDate = dateStr;

        let dateLabel = "";
        try {
          const parsed = parseISO(dateStr);
          dateLabel = isToday(parsed)
            ? "Today"
            : format(parsed, "EEEE, MMMM d, yyyy");
        } catch {
          dateLabel = dateStr;
        }

        return (
          <div key={b.id}>
            {showDateHeader && (
              <div className="pt-4 pb-2 first:pt-0">
                <h3 className="text-base sm:text-lg font-bold text-foreground" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                  {dateLabel}
                </h3>
              </div>
            )}
            <div
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 sm:p-5"
              data-testid={`booking-card-${b.id}`}
            >
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base sm:text-lg font-bold truncate" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                  {b.full_name}
                </p>
                <p className="text-sm font-semibold text-primary">{b.preferred_time}</p>
                <p className="text-sm text-muted-foreground truncate">{b.service_type}</p>
              </div>
              {b.phone && (
                <a
                  href={`tel:${b.phone}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 hover:bg-primary/20 transition-colors"
                  data-testid={`call-${b.id}`}
                >
                  <Phone className="h-4 w-4 text-primary" />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
