import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Lock, CalendarDays, Clock, CheckCircle2, XCircle, BarChart3, RefreshCw } from "lucide-react";
import { format, isToday, isFuture, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingTable, type Booking } from "@/components/admin/BookingTable";
import { type BookingStatus } from "@/components/admin/BookingStatusBadge";

const ADMIN_PASSWORD = "admin123"; // Replace with env var on Replit

type FilterStatus = "all" | BookingStatus;

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");

  useEffect(() => {
    if (isAuthenticated) loadBookings();
  }, [isAuthenticated]);

  const loadBookings = () => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[];
    // Sort newest first
    data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setBookings(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleStatusChange = (id: string, status: BookingStatus) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const filteredBookings = useMemo(
    () => filter === "all" ? bookings : bookings.filter((b) => b.status === filter),
    [bookings, filter]
  );

  const stats = useMemo(() => {
    const today = bookings.filter(
      (b) => b.preferred_date && isToday(parseISO(b.preferred_date))
    ).length;
    const upcoming = bookings.filter(
      (b) => b.status === "confirmed" && b.preferred_date && isFuture(parseISO(b.preferred_date))
    ).length;
    const newCount = bookings.filter((b) => b.status === "new").length;
    return { today, upcoming, newCount, total: bookings.length };
  }, [bookings]);

  // Login screen
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login | BF Permanent Francis</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex min-h-screen items-center justify-center bg-muted p-4">
          <div className="w-full max-w-sm">
            <form
              onSubmit={handleLogin}
              className="rounded-2xl border border-border bg-card p-8 shadow-lg space-y-6"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-7 w-7 text-primary" />
                </div>
                <h1 className="font-heading text-xl font-semibold">Admin Portal</h1>
                <p className="text-sm text-muted-foreground text-center">
                  Enter your password to manage bookings
                </p>
              </div>

              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-12"
                autoFocus
              />

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button type="submit" variant="cta" className="w-full h-12 glow-button">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // Dashboard
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | BF Permanent Francis</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-muted">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3 max-w-5xl mx-auto">
            <h1 className="font-heading text-lg font-semibold">Bookings</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={loadBookings}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
              >
                Log out
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon={<BarChart3 className="h-5 w-5" />}
              label="Total"
              value={stats.total}
              accent="primary"
            />
            <StatCard
              icon={<Clock className="h-5 w-5" />}
              label="New"
              value={stats.newCount}
              accent="primary"
            />
            <StatCard
              icon={<CalendarDays className="h-5 w-5" />}
              label="Today"
              value={stats.today}
              accent="primary"
            />
            <StatCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Upcoming"
              value={stats.upcoming}
              accent="primary"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {(["all", "new", "confirmed", "completed", "cancelled"] as FilterStatus[]).map(
              (s) => (
                <Button
                  key={s}
                  variant={filter === s ? "default" : "outline"}
                  size="sm"
                  className="h-9 capitalize whitespace-nowrap"
                  onClick={() => setFilter(s)}
                >
                  {s === "all" ? "All Bookings" : s}
                  {s === "new" && stats.newCount > 0 && (
                    <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground/20 text-[10px] font-bold">
                      {stats.newCount}
                    </span>
                  )}
                </Button>
              )
            )}
          </div>

          {/* Bookings List */}
          <BookingTable
            bookings={filteredBookings}
            onStatusChange={handleStatusChange}
          />
        </main>
      </div>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
    </div>
  );
}
