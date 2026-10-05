## Scope

Evolve the existing homepage (`src/routes/index.tsx`) and add new routes/components. Keep the current Apple-inspired white/editorial system, hero, and typography. Focus this pass on the homepage + navigation + card density + AI section + trust/business/testimonials — the highest-leverage items. Property/destination/SEO landing templates land in a follow-up pass.

## Changes this pass

### 1. Navigation (`src/routes/index.tsx` header)
- Replace nav with: Discover · Stays · Dining · Experiences · Safari · Wine · Wellness · More▼ · Discover Reserve · Become a Host · Sign In
- `More▼` dropdown: Car Hire, Shopping, Nightlife, Adventure, Family, Events, Airport Transfers
- Keep hairline border, minimal styling.

### 2. Hero — trending chips
- Keep hero + search bar untouched
- Add a horizontal chip row directly below search: Kruger · Cape Town · Drakensberg · Garden Route · Durban · Stellenbosch · Mpumalanga · Weekend Escapes · Luxury Collection
- Glass pill styling to sit on hero photography

### 3. Search autocomplete
- Add a lightweight suggestion panel when the "where" input is focused: Popular Destinations (Cape Town, Kruger, Hazyview, Mbombela, Sabie, Stellenbosch), Collections (Luxury Collection, Weekend Escapes, Near Me), Recent Searches (empty state)
- Client-only, no backend

### 4. Denser property cards
- Reduce image aspect from 4:5 → 4:3, tighter padding
- Grid: 2 cols mobile → 3 → 4 on xl
- Add: image dot indicators (static, 3-of-N), Verified badge, amenity chips (Pool/Wifi/Breakfast/View), compact price+Book row

### 5. Destination cards → travel-hub cards
- Show: stays count, restaurants count, experiences count, Explore CTA

### 6. Categories — Apple-style icon rail
- Replace large cards with 12 minimal circular icon tiles: Hotels, Guesthouses, Restaurants, Coffee, Safari, Wine, Spa, Shopping, Car Hire, Adventure, Nightlife, Family
- Horizontal scroll with hairline dividers

### 7. Section order
Hero → Trending Destinations → Categories → Featured Stays → Popular Restaurants → Experiences → Discover by Mood (existing Lifestyle grid) → AI Concierge → Trust Stats → Why Discover → For Business → Discover Reserve → Field Notes (Testimonials carousel) → Footer

### 8. Restaurant cards
- Add chips: Price level (R/RR/RRR), Open Now, Chef's Choice, Wine List, Reserve button

### 9. AI Concierge section (new, on homepage)
- Full section: headline "Plan your perfect trip with AI.", 8 prompt chips, opens existing `ConciergeFab` panel on click via shared state (dispatch a custom event or lift open-state)

### 10. Trust stats
- 4-column row: 15,000+ Verified Businesses · 120,000+ Monthly Visitors · 4.9★ Rating · 9 Provinces Covered
- Simple count-up animation on scroll

### 11. Business acquisition section
- Rebuild "For Business" as a two-column: benefits list + "List Your Business" large CTA
- Supported categories row (Hotels, Restaurants, etc.)

### 12. Testimonials carousel
- 3-slide horizontal snap carousel with: avatar, verified badge, location, property visited, short review

## Files
- Edit: `src/routes/index.tsx` (major restructure of sections, cards, nav)
- Edit: `src/components/ConciergeFab.tsx` (export a small open-controller: listen for `window` custom event `discover:open-concierge`)
- Edit: `src/styles.css` (add `.chip-glass`, `.icon-tile` utilities if needed)

## Explicit non-goals this pass
- No new routes for destinations/property/restaurant/SEO landings (huge, deserves own turn)
- No "Around Me" map (needs Google Maps connector — will propose separately)
- No mobile bottom-nav rework (will come with property page pass)

## Verification
- Typecheck via harness
- Visual spot-check preview at 1280 and 950 widths

Approve and I'll ship this pass, then propose the property/destination/around-me/SEO-landing pass next.
