

# Booking System with Admin Portal

## Overview
A complete booking system where clients can request appointments directly from the website, and you (the admin) can manage all bookings from a password-protected admin page. Clients will receive email confirmations when they book.

## What Clients Will See

**Booking form prominently placed in two locations:**
1. A "Book Now" banner at the top of the homepage (below the hero)
2. A dedicated booking section on the Contact page

**Booking form fields:**
- Full Name
- Phone Number
- Email Address
- Service Type (dropdown: Permanent Lips, Eyebrow Micropigmentation, Eyeliner Enhancement, BrowXenna)
- Preferred Date (date picker)
- Preferred Time (morning, afternoon, evening)
- Additional Notes / Special Requests

After submitting, the client sees a success message and receives a confirmation email.

## What You (Admin) Will See

**A password-protected page at `/admin`** with:
- Dashboard showing today's bookings and upcoming bookings count
- Full list of all bookings with status filters (New, Confirmed, Completed, Cancelled)
- Ability to update booking status
- Client contact details visible for each booking
- Mobile-optimized layout so you can manage bookings from your phone

## How It Works

```text
Client fills form --> Data saved to database --> Confirmation email sent to client
                                             --> Booking appears in Admin portal
```

## Technical Details

### Backend (Lovable Cloud / Supabase)

**Database table: `bookings`**
- id, created_at
- full_name, phone, email
- service_type, preferred_date, preferred_time
- notes
- status (new / confirmed / completed / cancelled)

**Edge Function: `send-booking-email`**
- Triggered after a booking is saved
- Sends a confirmation email to the client using Resend (email service)
- Requires a Resend API key (free tier: 100 emails/day)

### Frontend (New Files)

1. **`src/components/sections/BookingSection.tsx`** - The booking form component (reused on homepage and contact page)
2. **`src/pages/Admin.tsx`** - Password-protected admin portal with booking management
3. **`src/components/admin/BookingTable.tsx`** - Table/card view of all bookings
4. **`src/components/admin/BookingStatusBadge.tsx`** - Visual status indicators

### Modified Files
- **`src/pages/Index.tsx`** - Add BookingSection after HeroSection
- **`src/pages/Contact.tsx`** - Replace the existing contact form with the BookingSection
- **`src/App.tsx`** - Add `/admin` route
- **`src/components/layout/Header.tsx`** - No changes (admin page stays hidden from navigation)

### Admin Access
- Hidden `/admin` route (not linked in navigation)
- Simple password gate -- you set the password and enter it to access
- Password stored as a Supabase secret (not hardcoded)

### Mobile Optimization
- Booking form uses single-column layout on mobile
- Admin portal uses card-based layout instead of tables on small screens
- Large touch targets for status update buttons
- Sticky action buttons in admin view

## Implementation Steps

1. Enable Lovable Cloud (Supabase) for database and edge functions
2. Create the `bookings` database table
3. Build the BookingSection component with form validation
4. Integrate the booking form into the homepage and contact page
5. Set up the Resend API key as a secret
6. Create the email confirmation edge function
7. Build the admin portal page with password protection
8. Build the booking management UI (list, filter, status updates)
9. Test the full flow end-to-end

