# Quote Flow Platform – Frontend

A React single-page application for managing quotes. It communicates with the Quote microservice REST API.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Ant Design 5](https://ant.design/) | Component library |
| [Axios](https://axios-http.com/) | HTTP client |
| [React Router 6](https://reactrouter.com/en/main) | Client-side routing |
| [Vitest](https://vitest.dev/) | Unit test runner |
| [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) | React component testing |

---

## Project Structure

```
frontend/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite + Vitest configuration
├── package.json
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component (BrowserRouter)
    ├── api/
    │   └── quoteApi.js         # Axios API calls for all backend endpoints
    ├── router/
    │   └── AppRouter.jsx       # Route definitions
    ├── layouts/
    │   └── MainLayout.jsx      # App shell: header nav + content area
    ├── features/
    │   └── quotes/
    │       ├── pages/
    │       │   ├── QuoteListPage.jsx    # List + search + filter
    │       │   ├── QuoteCreatePage.jsx  # Create new quote
    │       │   ├── QuoteDetailPage.jsx  # View, send-to-approval, delete
    │       │   └── QuoteEditPage.jsx    # Edit existing quote
    │       ├── components/
    │       │   ├── QuoteTable.jsx       # Data table with actions
    │       │   ├── QuoteForm.jsx        # Reusable create/edit form
    │       │   └── QuoteStatusTag.jsx   # Colored status badge
    │       └── hooks/
    │           ├── useQuoteList.js      # Fetch all / fetch by ID
    │           └── useQuoteDetail.js    # Fetch one, send-to-approval, delete
    └── test/
        ├── setup.js                    # Vitest global setup (jest-dom + jsdom polyfills)
        ├── quoteApi.test.js            # API module exports
        ├── QuoteStatusTag.test.jsx     # Status badge component
        ├── QuoteForm.test.jsx          # Form component (create & edit)
        ├── QuoteTable.test.jsx         # Table component (filter, actions)
        ├── useQuoteList.test.js        # useQuoteList hook
        └── useQuoteDetail.test.js      # useQuoteDetail hook
```

---

## Architecture Overview

```
App
 └─ BrowserRouter
     └─ MainLayout  (header + responsive content area)
         └─ AppRouter
             ├─ /quotes            → QuoteListPage
             ├─ /quotes/create     → QuoteCreatePage
             ├─ /quotes/:id        → QuoteDetailPage
             └─ /quotes/:id/edit   → QuoteEditPage
```

**Data flow:**  
Pages call custom hooks → hooks call `quoteApi.js` → `quoteApi.js` sends HTTP requests to `http://localhost:8080/api`.

---

## Backend API Summary

All endpoints are under `http://localhost:8080/api/quotes`.

| Method | Path | Description |
|---|---|---|
| `POST` | `/quotes/create` | Create a new quote |
| `GET` | `/quotes` | List all quotes (supports pagination/filter) |
| `GET` | `/quotes/{id}` | Get a quote by ID |
| `PUT` | `/quotes/{id}` | Update an existing quote |
| `DELETE` | `/quotes/{id}` | Delete a quote |
| `POST` | `/quotes/send-to-approval?id={id}` | Submit a quote for approval |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- The backend Quote service running on `http://localhost:8080`

### Install dependencies

```bash
cd frontend
npm install
```

### Start development server

```bash
npm run dev
```

The app opens at **`http://localhost:5173`**.

### Build for production

```bash
npm run build
```

### Run unit tests

```bash
# Run once
npm test

# Watch mode
npm run test:watch
```

---

## Features

- **Quote list** – paginated table with search by ID and filter by status
- **Create quote** – form with validation
- **View quote** – detailed view with status badge
- **Edit quote** – pre-filled form (only for DRAFT / REJECTED quotes)
- **Delete quote** – confirmation popover
- **Send to approval** – one-click workflow action (for DRAFT / REJECTED quotes)
- **Mobile-friendly** – responsive layout, table horizontal scroll, flexible header
