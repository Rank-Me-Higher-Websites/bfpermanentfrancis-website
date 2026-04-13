import { useState, useEffect, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import {
  Lock, RefreshCw, User, Phone, Mail, ChevronLeft, ChevronRight,
  Calendar, Clock, LayoutDashboard, List, Ban, Trash2, Edit3, Save,
  X, MessageSquare, CheckCircle, XCircle, RotateCcw, Plus, ArrowRight
} from "lucide-react";
import {
  format, parseISO, isToday, isBefore, startOfDay, startOfMonth, endOfMonth,
  eachDayOfInterval, getDay, isSameDay, addMonths, subMonths
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_USERNAME = "Birute";
const ADMIN_PASSWORD = "Birute123@";

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface Booking {
  id: string;
  teamup_event_id?: string | null;
  full_name: string;
  phone: string;
  email: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  notes: string;
  admin_notes?: string;
  status: BookingStatus;
  created_at: string;
  deleted_at?: string | null;
}

interface BlockedTime {
  id: number;
  block_date: string;
  start_time: string;
  end_time: string;
  reason: string;
}

interface Stats {
  today: number;
  pending: number;
  total: number;
}

type TabKey = "dashboard" | "calendar" | "blocked" | "deleted";

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-300",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
  completed: "bg-gray-100 text-gray-600 border-gray-300",
};

const TABS: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "calendar", label: "Calendar", icon: Calendar },
  { key: "blocked", label: "Blocked", icon: Ban },
  { key: "deleted", label: "Deleted", icon: Trash2 },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [deletedBookings, setDeletedBookings] = useState<Booking[]>([]);
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [stats, setStats] = useState<Stats>({ today: 0, pending: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ preferred_date: "", preferred_time: "", service_type: "", admin_notes: "" });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [newBlock, setNewBlock] = useState({ block_date: "", start_time: "", end_time: "", reason: "" });
  const [showBlockForm, setShowBlockForm] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [bRes, sRes, blRes, dRes] = await Promise.all([
        fetch("/api/bookings"), fetch("/api/bookings/stats"),
        fetch("/api/blocked-times"), fetch("/api/bookings/deleted"),
      ]);
      const bData = await bRes.json();
      const sData = await sRes.json();
      const blData = await blRes.json();
      const dData = await dRes.json();
      setBookings(bData.bookings || []);
      setStats(sData);
      setBlockedTimes(blData.blocks || []);
      setDeletedBookings(dData.bookings || []);
    } catch { /* fallback */ }
    setLoading(false);
  }, []);

  useEffect(() => { if (isAuthenticated) loadAll(); }, [isAuthenticated, loadAll]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true); setError("");
    } else { setError("Invalid credentials."); }
  };

  const syncTeamup = async () => {
    setSyncing(true);
    try {
      await fetch("/api/sync-teamup", { method: "POST" });
      await loadAll();
    } catch { /* ignore */ }
    setSyncing(false);
  };

  const updateStatus = async (id: string, status: BookingStatus) => {
    await fetch(`/api/bookings/${id}/status`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await loadAll();
  };

  const startEdit = (b: Booking) => {
    setEditingId(b.id);
    setEditForm({
      preferred_date: b.preferred_date, preferred_time: b.preferred_time,
      service_type: b.service_type, admin_notes: b.admin_notes || "",
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const res = await fetch(`/api/bookings/${editingId}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (res.ok) { setEditingId(null); await loadAll(); }
    else { const d = await res.json(); alert(d.error || "Failed to save"); }
  };

  const softDelete = async (id: string) => {
    if (!confirm("Move this booking to deleted?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    await loadAll();
  };

  const restoreBooking = async (id: string) => {
    await fetch(`/api/bookings/${id}/restore`, { method: "POST" });
    await loadAll();
  };

  const addBlockedTime = async () => {
    if (!newBlock.block_date || !newBlock.start_time || !newBlock.end_time) return;
    await fetch("/api/blocked-times", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlock),
    });
    setNewBlock({ block_date: "", start_time: "", end_time: "", reason: "" });
    setShowBlockForm(false);
    await loadAll();
  };

  const removeBlock = async (id: number) => {
    await fetch(`/api/blocked-times/${id}`, { method: "DELETE" });
    await loadAll();
  };

  const filteredBookings = useMemo(() => {
    if (statusFilter === "all") return bookings;
    return bookings.filter((b) => b.status === statusFilter);
  }, [bookings, statusFilter]);

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

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);
  const startDayOfWeek = getDay(startOfMonth(currentMonth));

  const calendarDayBookings = useMemo(() => {
    if (!selectedDate) return [];
    const key = format(selectedDate, "yyyy-MM-dd");
    return (bookingsByDate.get(key) || []).sort((a, b) => (a.preferred_time || "").localeCompare(b.preferred_time || ""));
  }, [selectedDate, bookingsByDate]);

  const blockedByDate = useMemo(() => {
    const map = new Map<string, BlockedTime[]>();
    blockedTimes.forEach((bl) => {
      if (!map.has(bl.block_date)) map.set(bl.block_date, []);
      map.get(bl.block_date)!.push(bl);
    });
    return map;
  }, [blockedTimes]);

  if (!isAuthenticated) {
    return (
      <>
        <Helmet><title>Admin Login | BF Permanent Francis</title><meta name="robots" content="noindex, nofollow" /></Helmet>
        <div className="flex min-h-screen items-center justify-center bg-muted p-6">
          <div className="w-full max-w-md">
            <form onSubmit={handleLogin} className="rounded-2xl border-2 border-gray-300 bg-card p-8 sm:p-10 shadow-lg space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-2xl sm:text-3xl text-center" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Admin Login</h1>
                <p className="text-base text-muted-foreground text-center">Enter your credentials to see your bookings</p>
              </div>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="h-14 text-lg px-5 border-2 border-gray-300 focus:border-primary" data-testid="input-username" autoFocus />
              <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="h-14 text-lg px-5 border-2 border-gray-300 focus:border-primary" data-testid="input-password" />
              {error && <p className="text-base text-destructive text-center font-medium">{error}</p>}
              <Button type="submit" variant="cta" className="w-full h-14 text-lg rounded-xl" data-testid="button-sign-in">Sign In</Button>
            </form>
          </div>
        </div>
      </>
    );
  }

  const renderStatusBadge = (status: BookingStatus) => (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  const renderBookingCard = (b: Booking, opts: { showActions?: boolean; showRestore?: boolean } = {}) => {
    const isEditing = editingId === b.id;
    const isExpanded = expandedId === b.id;
    return (
      <div key={b.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden" data-testid={`card-booking-${b.id}`}>
        <button
          onClick={() => setExpandedId(isExpanded ? null : b.id)}
          className="flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
          data-testid={`button-expand-${b.id}`}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-foreground truncate">{b.full_name}</span>
                {renderStatusBadge(b.status)}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{b.service_type} · {b.preferred_date} · {b.preferred_time}</p>
            </div>
          </div>
          <ChevronRight className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
        </button>

        {isExpanded && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><a href={`tel:${b.phone}`} className="text-primary font-medium hover:underline">{b.phone || "—"}</a></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span className="text-gray-700 truncate">{b.email || "—"}</span></div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /><span className="text-gray-700">{b.preferred_date}</span></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /><span className="text-gray-700">{b.preferred_time}</span></div>
            </div>

            {b.notes && (
              <div className="flex items-start gap-2 text-sm bg-gray-50 rounded-lg p-3">
                <MessageSquare className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div><p className="text-xs text-gray-500 font-medium">Client Notes</p><p className="text-gray-700">{b.notes}</p></div>
              </div>
            )}
            {b.admin_notes && (
              <div className="flex items-start gap-2 text-sm bg-purple-50 rounded-lg p-3">
                <Edit3 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div><p className="text-xs text-primary font-medium">Admin Notes</p><p className="text-gray-700">{b.admin_notes}</p></div>
              </div>
            )}

            {isEditing ? (
              <div className="space-y-3 bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-bold text-gray-500 uppercase">Edit Booking</p>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" value={editForm.preferred_date} onChange={(e) => setEditForm({ ...editForm, preferred_date: e.target.value })} className="text-sm h-9" />
                  <Input type="text" value={editForm.preferred_time} onChange={(e) => setEditForm({ ...editForm, preferred_time: e.target.value })} placeholder="e.g. 10:00 AM" className="text-sm h-9" />
                </div>
                <select value={editForm.service_type} onChange={(e) => setEditForm({ ...editForm, service_type: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                  <option>SPMU Brows</option><option>SPMU Eyeliner</option><option>SPMU Lips</option><option>BrowXenna Powder</option>
                </select>
                <textarea value={editForm.admin_notes} onChange={(e) => setEditForm({ ...editForm, admin_notes: e.target.value })} placeholder="Admin notes..." className="w-full border rounded-lg px-3 py-2 text-sm resize-none h-16 bg-white" />
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveEdit} className="gap-1 text-xs h-8"><Save className="h-3 w-3" />Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="gap-1 text-xs h-8"><X className="h-3 w-3" />Cancel</Button>
                </div>
              </div>
            ) : null}

            {opts.showActions && !isEditing && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                {b.status === "pending" && (
                  <Button size="sm" onClick={() => updateStatus(b.id, "confirmed")} className="gap-1 text-xs h-8 bg-emerald-600 hover:bg-emerald-700" data-testid={`button-confirm-${b.id}`}>
                    <CheckCircle className="h-3 w-3" />Confirm
                  </Button>
                )}
                {(b.status === "pending" || b.status === "confirmed") && (
                  <Button size="sm" onClick={() => updateStatus(b.id, "completed")} className="gap-1 text-xs h-8 bg-gray-600 hover:bg-gray-700" data-testid={`button-complete-${b.id}`}>
                    <CheckCircle className="h-3 w-3" />Complete
                  </Button>
                )}
                {b.status !== "cancelled" && (
                  <Button size="sm" variant="destructive" onClick={() => updateStatus(b.id, "cancelled")} className="gap-1 text-xs h-8" data-testid={`button-cancel-${b.id}`}>
                    <XCircle className="h-3 w-3" />Cancel
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => startEdit(b)} className="gap-1 text-xs h-8" data-testid={`button-edit-${b.id}`}>
                  <Edit3 className="h-3 w-3" />Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => softDelete(b.id)} className="gap-1 text-xs h-8 text-red-600 border-red-200 hover:bg-red-50" data-testid={`button-delete-${b.id}`}>
                  <Trash2 className="h-3 w-3" />Delete
                </Button>
              </div>
            )}

            {opts.showRestore && (
              <div className="pt-2 border-t border-gray-100">
                <Button size="sm" onClick={() => restoreBooking(b.id)} className="gap-1 text-xs h-8" data-testid={`button-restore-${b.id}`}>
                  <RotateCcw className="h-3 w-3" />Restore
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet><title>Admin Panel | BF Permanent Francis</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="min-h-screen bg-muted">
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 max-w-[1400px] mx-auto">
            <h1 className="text-lg sm:text-xl font-bold" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Admin Panel</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={syncTeamup} disabled={syncing} className="h-9 px-3 text-xs gap-1.5 border-gray-300" data-testid="button-sync">
                <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />Sync Teamup
              </Button>
              <Button variant="outline" size="sm" onClick={loadAll} className="h-9 px-3 text-xs gap-1.5 border-gray-300" data-testid="button-refresh">
                <RefreshCw className="h-3.5 w-3.5" />Refresh
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsAuthenticated(false)} className="h-9 px-3 text-xs text-gray-500" data-testid="button-logout">Log out</Button>
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <nav className="flex gap-1 py-3 overflow-x-auto border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.key ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
                data-testid={`tab-${tab.key}`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground text-lg">Loading...</p>
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                      <p className="text-sm text-gray-500 font-medium">Today's Bookings</p>
                      <p className="text-3xl font-bold text-foreground mt-1" data-testid="text-today-count">{stats.today}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                      <p className="text-sm text-gray-500 font-medium">Pending</p>
                      <p className="text-3xl font-bold text-amber-600 mt-1" data-testid="text-pending-count">{stats.pending}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                      <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
                      <p className="text-3xl font-bold text-primary mt-1" data-testid="text-total-count">{stats.total}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${statusFilter === s ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}
                        data-testid={`filter-${s}`}
                      >
                        {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                        {s !== "all" && ` (${bookings.filter((b) => b.status === s).length})`}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {filteredBookings.length === 0 ? (
                      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                        <p className="text-gray-400">No bookings found.</p>
                      </div>
                    ) : (
                      filteredBookings.map((b) => renderBookingCard(b, { showActions: true }))
                    )}
                  </div>
                </div>
              )}

              {activeTab === "calendar" && (
                <div className="flex gap-6 flex-col lg:flex-row">
                  <div className="lg:w-[55%] flex-shrink-0">
                    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                      <div className="flex items-center justify-between px-5 py-4">
                        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                          {format(currentMonth, "MMMM yyyy")}
                        </h2>
                        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 px-3 pb-2">
                        {WEEKDAYS.map((day) => (
                          <div key={day} className="py-1 text-center text-xs font-semibold text-gray-400">{day.slice(0, 2)}</div>
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
                                if (!day) return <div key={`empty-${wi}-${di}`} className="h-[72px]" />;
                                const key = format(day, "yyyy-MM-dd");
                                const dayBookings = bookingsByDate.get(key) || [];
                                const hasBookings = dayBookings.length > 0;
                                const isSelected = selectedDate && isSameDay(day, selectedDate);
                                return (
                                  <button
                                    key={key}
                                    onClick={() => setSelectedDate(isSelected ? null : day)}
                                    className={`h-[72px] rounded-lg p-1.5 text-left flex flex-col transition-colors border
                                      ${isSelected ? "bg-primary/10 border-primary" : hasBookings ? "bg-white border-primary/50 hover:bg-purple-50" : "bg-white border-gray-300 hover:bg-gray-50"}`}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-sm font-semibold text-gray-700">{format(day, "d")}</span>
                                      {hasBookings && (
                                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold px-1">{dayBookings.length}</span>
                                      )}
                                    </div>
                                    {hasBookings && (
                                      <div className="mt-auto">
                                        <span className="text-[10px] leading-tight font-medium text-primary/80 truncate block">{dayBookings[0].full_name.split(" ")[0]}</span>
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
                    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                      <div className="px-5 py-3 border-b border-gray-200">
                        <h2 className="text-base font-bold" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                          {selectedDate ? format(selectedDate, "EEEE, MMMM d") : "Select a day"}
                        </h2>
                        {selectedDate && (
                          <button onClick={() => setSelectedDate(null)} className="text-xs text-primary font-medium hover:underline mt-0.5">Clear selection</button>
                        )}
                      </div>
                      <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                        {!selectedDate ? (
                          <div className="p-8 text-center"><p className="text-gray-400">Click a day to see its bookings.</p></div>
                        ) : calendarDayBookings.length === 0 ? (
                          <div className="p-8 text-center"><p className="text-gray-400">No appointments on this day.</p></div>
                        ) : (
                          <div className="p-3 space-y-2">
                            {calendarDayBookings.map((b) => renderBookingCard(b, { showActions: true }))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "blocked" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Blocked Time Slots</h2>
                    <Button size="sm" onClick={() => setShowBlockForm(!showBlockForm)} className="gap-1 text-xs h-8" data-testid="button-add-block">
                      <Plus className="h-3 w-3" />{showBlockForm ? "Cancel" : "Add Block"}
                    </Button>
                  </div>

                  {showBlockForm && (
                    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
                      <p className="text-xs font-bold text-gray-500 uppercase">New Blocked Time</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Input type="date" value={newBlock.block_date} onChange={(e) => setNewBlock({ ...newBlock, block_date: e.target.value })} className="text-sm h-9" data-testid="input-block-date" />
                        <Input type="time" value={newBlock.start_time} onChange={(e) => setNewBlock({ ...newBlock, start_time: e.target.value })} className="text-sm h-9" data-testid="input-block-start" />
                        <Input type="time" value={newBlock.end_time} onChange={(e) => setNewBlock({ ...newBlock, end_time: e.target.value })} className="text-sm h-9" data-testid="input-block-end" />
                        <Input type="text" value={newBlock.reason} onChange={(e) => setNewBlock({ ...newBlock, reason: e.target.value })} placeholder="Reason" className="text-sm h-9" data-testid="input-block-reason" />
                      </div>
                      <Button size="sm" onClick={addBlockedTime} className="text-xs h-8" data-testid="button-save-block">Save Block</Button>
                    </div>
                  )}

                  {blockedTimes.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                      <Ban className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400">No blocked time slots.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Array.from(blockedByDate.entries()).map(([date, blocks]) => (
                        <div key={date} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                            <span className="text-xs font-bold text-gray-500 uppercase">{date}</span>
                          </div>
                          <div className="divide-y divide-gray-100">
                            {blocks.map((bl) => (
                              <div key={bl.id} className="flex items-center justify-between px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <Ban className="h-4 w-4 text-red-400" />
                                  <div>
                                    <p className="text-sm font-medium">{bl.start_time} — {bl.end_time}</p>
                                    {bl.reason && <p className="text-xs text-gray-500">{bl.reason}</p>}
                                  </div>
                                </div>
                                <Button size="sm" variant="ghost" onClick={() => removeBlock(bl.id)} className="text-red-500 hover:text-red-700 h-7 w-7 p-0" data-testid={`button-remove-block-${bl.id}`}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "deleted" && (
                <div className="space-y-3">
                  <h2 className="text-base font-bold" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Deleted Bookings</h2>
                  {deletedBookings.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                      <Trash2 className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400">No deleted bookings.</p>
                    </div>
                  ) : (
                    deletedBookings.map((b) => renderBookingCard(b, { showRestore: true }))
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
