# Anarchist Store

E-commerce frontend for the Anarchist brand — built with Next.js 15 and the App Router.

## Tech Stack

- **Framework:** Next.js 15.2 (App Router) + React 19
- **Styling:** Tailwind CSS 4.0
- **UI:** Radix UI primitives + custom Shadcn-style components
- **State:** Zustand with localStorage persistence
- **Animations:** Framer Motion
- **Images:** Cloudinary

## Features

- Home page with hero banners and featured products
- Category pages with size/color filters (mobile + desktop)
- Product detail pages with image gallery, variant selection, and related products
- Persistent shopping cart with add/remove and quantity management

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

This should point to your backend API URL.

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  (routes)/
    page.tsx              # Home page
    category/[categoryId] # Category listing with filters
    product/[productId]   # Product detail page
components/
  ui/                     # Reusable UI primitives
  NavbarClient.tsx        # Navigation with cart icon
  product-list.tsx        # Product grid
hooks/
  use-cart.ts             # Zustand cart store
lib/
  api.ts                  # API fetch helpers
```

## API Endpoints Used

| Resource   | Endpoint            |
|------------|---------------------|
| Products   | `GET /products`     |
| Product    | `GET /products/:id` |
| Categories | `GET /categories`   |
| Sizes      | `GET /sizes`        |
| Colors     | `GET /colors`       |
| Billboards | `GET /billboards/:id` |

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `pnpm dev`    | Start development server |
| `pnpm build`  | Build for production     |
| `pnpm start`  | Start production server  |
| `pnpm lint`   | Run ESLint               |
