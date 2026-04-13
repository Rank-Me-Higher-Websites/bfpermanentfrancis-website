import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Lock, RefreshCw, Search, Users, Clock, CheckCircle2, XCircle, CalendarDays, List, LayoutGrid } from "lucide-react";
import { isToday, isFuture, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingTable, type Booking } from "@/components/admin/BookingTable";
import { type BookingStatus } from "@/components/admin/BookingStatusBadge";
import { BookingCalendar } from "@/components/admin/BookingCalendar";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

type FilterStatus = "all" | BookingStatus;

const FILTER_CONFIG: { value: FilterStatus; label: string; icon: React.ReactNode; color: string }[] = [
  { value: "all", label: "All", icon: <Users className="h-5 w-5" />, color: "text-foreground" },
  { value: "new", label: "New", icon: <Clock className="h-5 w-5" />, color: "text-primary" },
  { value: "confirmed", label: "Confirmed", icon: <CheckCircle2 className="h-5 w-5" />, color: "text-emerald-600" },
  { value: "completed", label: "Done", icon: <CalendarDays className="h-5 w-5" />, color: "text-muted-foreground" },
  { value: "cancelled", label: "Cancelled", icon: <XCircle className="h-5 w-5" />, color: "text-destructive" },
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "calendar">("list");

  useEffect(() => {
    if (isAuthenticated) loadBookings();
  }, [isAuthenticated]);

  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      const teamupBookings = (data.bookings || []) as Booking[];

      const localBookings = JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[];
      const teamupIds = new Set(teamupBookings.map((b) => b.id));
      const uniqueLocal = localBookings.filter((b) => !teamupIds.has(b.id) && !b.teamup_event_id);

      const merged = [...teamupBookings, ...uniqueLocal];
      merged.sort((a, b) => new Date(b.preferred_date || b.created_at).getTime() - new Date(a.preferred_date || a.created_at).getTime());
      setBookings(merged);
    } catch {
      const data = JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[];
      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
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

  const handleStatusChange = (id: string, status: BookingStatus) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const filteredBookings = useMemo(() => {
    let result = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.full_name.toLowerCase().includes(q) ||
          b.phone.includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.service_type.toLowerCase().includes(q)
      );
    }
    return result;
  }, [bookings, filter, searchQuery]);

  const stats = useMemo(() => {
    const newCount = bookings.filter((b) => b.status === "new").length;
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const completed = bookings.filter((b) => b.status === "completed").length;
    const cancelled = bookings.filter((b) => b.status === "cancelled").length;
    return { total: bookings.length, newCount, confirmed, completed, cancelled };
  }, [bookings]);

  const getCount = (status: FilterStatus) => {
    if (status === "all") return stats.total;
    if (status === "new") return stats.newCount;
    if (status === "confirmed") return stats.confirmed;
    if (status === "completed") return stats.completed;
    if (status === "cancelled") return stats.cancelled;
    return 0;
  };

  // Login screen — big, simple, friendly
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-14 text-lg px-5"
                data-testid="input-password"
              />

              {error && (
                <p className="text-base text-destructive text-center font-medium">{error}</p>
              )}

              <Button type="submit" variant="cta" className="w-full h-14 text-lg rounded-xl">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // Dashboard — clean, large text, obvious actions
  return (
    <>
      <Helmet>
        <title>My Bookings | BF Permanent Francis</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-muted">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-6xl mx-auto">
            <h1 className="text-xl sm:text-2xl" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>My Bookings</h1>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* View Toggle */}
              <div className="flex rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                    view === "list" ? "gradient-bg text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setView("calendar")}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                    view === "calendar" ? "gradient-bg text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={loadBookings}
                className="h-10 px-4 text-sm gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="h-10 px-4 text-sm text-muted-foreground"
              >
                Log out
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
          {/* Quick Stats — large and color-coded */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <QuickStat label="Total" value={stats.total} className="bg-card" />
            <QuickStat label="New" value={stats.newCount} className="bg-primary/10 border-primary/20" highlight />
            <QuickStat label="Confirmed" value={stats.confirmed} className="bg-emerald-50 border-emerald-200" />
            <QuickStat label="Completed" value={stats.completed} className="bg-card" />
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, or email..."
              className="h-12 sm:h-14 pl-12 text-base sm:text-lg bg-card"
            />
          </div>

          {/* Filter Tabs — large tap targets */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
            {FILTER_CONFIG.map((f) => {
              const count = getCount(f.value);
              const isActive = filter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`
                    flex items-center gap-2 rounded-xl px-4 sm:px-5 py-3 text-sm sm:text-base font-medium whitespace-nowrap
                    transition-all border-2
                    ${isActive
                      ? "gradient-bg text-primary-foreground border-transparent shadow-md"
                      : "bg-card text-foreground border-border hover:border-primary/30"
                    }
                  `}
                >
                  {f.label}
                  {count > 0 && (
                    <span className={`
                      flex h-6 min-w-[24px] items-center justify-center rounded-full px-1.5 text-xs font-bold
                      ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}
                    `}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Content */}
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
            <BookingTable
              bookings={filteredBookings}
              onStatusChange={handleStatusChange}
            />
          )}
        </main>
      </div>
    </>
  );
}

/* Simple stat card with large number */
function QuickStat({
  label,
  value,
  className = "",
  highlight = false,
}: {
  label: string;
  value: number;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${className}`}>
      <p className="text-sm sm:text-base font-medium text-muted-foreground mb-1">{label}</p>
      <p className={`text-3xl sm:text-4xl font-bold ${highlight ? "text-primary" : "text-foreground"}`} style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
        {value}
      </p>
    </div>
  );
}
