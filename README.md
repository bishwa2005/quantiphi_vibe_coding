# Stockroom — Product Multi-Filter Sidebar

A full-stack e-commerce product browsing application built with **React, Vite, and Express**.

Stockroom provides an interactive product catalog where users can filter products by **category, price range, and minimum rating**, and instantly sort the filtered results. The filtering and sorting logic is handled by the Express backend, while the React frontend manages the UI and user interactions.

---

## 📸 Screenshots

### Product Catalog

<img width="1317" height="587" alt="{05336F6A-A330-4160-8FFC-F74D28CC5814}" src="https://github.com/user-attachments/assets/85309a01-836c-4cad-82d1-e353ab8e3e18" />


The main catalog displays products with their category, name, price, and rating. The sidebar provides interactive filtering controls.

### Filtered Products

<img width="1287" height="583" alt="{CB7874E5-8FFE-4C4D-A88D-3253F7C90E05}" src="https://github.com/user-attachments/assets/73fd6ac7-fff4-448f-83e7-b5d3b0ac9cb6" />


Multiple filters can be applied simultaneously. The backend returns only products satisfying **all active criteria**.

### No Matching Products

<img width="1294" height="590" alt="{E41FD016-033E-4E6A-87C4-80CAB43A4DD4}" src="https://github.com/user-attachments/assets/db92377f-0201-4cd0-b64a-397a72ab5b40" />


When no products satisfy the selected filters, the application displays a dedicated empty state with an option to reset the filters.



---

## 🏗️ Project Structure

```text
stockroom-app/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── utils/
│   │       └── filterSort.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
│
└── screenshots/
    ├── catalog.png
    ├── filtered-products.png
    └── no-results.png
```

### Architecture

```text
┌─────────────────────┐
│    React Frontend   │
│      Port 5173      │
└──────────┬──────────┘
           │
           │ HTTP Requests
           ▼
┌─────────────────────┐
│    Express API      │
│      Port 4000      │
├─────────────────────┤
│ Filter Products     │
│ Sort Products       │
└──────────┬──────────┘
           │
           ▼
      Product Data
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd stockroom-app
```

---

## 2. Run the Backend

Open a terminal:

```bash
cd backend
npm install
npm run dev
```

`npm run dev` uses **nodemon** to automatically restart the server when files are changed.

Alternatively:

```bash
npm start
```

The API starts on:

```text
http://localhost:4000
```

---

## 3. Backend API

### Get Product Metadata

```http
GET /api/products/meta
```

Returns information required to build the filter sidebar, including:

* Available categories
* Product count for each category
* Minimum product price
* Maximum product price

The frontend calls this endpoint when the application loads.

---

### Get Products

```http
GET /api/products
```

All filtering and sorting parameters are optional.

Example:

```http
GET /api/products?categories=Apparel,Footwear&minPrice=20&maxPrice=200&minRating=4&sort=price-asc
```

Supported query parameters:

| Parameter    | Description                | Example            |
| ------------ | -------------------------- | ------------------ |
| `categories` | Comma-separated categories | `Apparel,Footwear` |
| `minPrice`   | Minimum price              | `20`               |
| `maxPrice`   | Maximum price              | `200`              |
| `minRating`  | Minimum star rating        | `4`                |
| `sort`       | Sorting method             | `price-asc`        |

If a filter is not provided or is empty, it is **bypassed rather than treated as a restriction**.

---

# 💻 Run the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The React application runs on:

```text
http://localhost:5173
```

By default, the frontend expects the backend API at:

```text
http://localhost:4000/api/products
```

If the backend is running at another URL, create a `.env` file from the provided example:

```bash
cp .env.example .env
```

Then configure:

```env
VITE_API_URL=http://localhost:4000/api/products
```

---

# 🔎 How Filtering Works

The core filtering logic is implemented in:

```text
backend/src/utils/filterSort.js
```

The application follows the pipeline:

```text
Master Product Array
        ↓
   Apply Filters
        ↓
Filtered Products
        ↓
    Apply Sort
        ↓
Sorted Products
        ↓
    API Response
        ↓
   React UI
```

## 1. Category Filtering

Users can select one or multiple categories.

For example:

```text
Apparel
Footwear
```

A product passes the category filter if it belongs to **any selected category**.

If no categories are selected, the category restriction is bypassed.

---

## 2. Price Filtering

Products must fall within the selected price boundaries:

```text
price >= minPrice
AND
price <= maxPrice
```

For example:

```text
Minimum Price: $20
Maximum Price: $200
```

Only products between those values are returned.

---

## 3. Rating Filtering

The rating filter represents a **minimum rating**.

For example:

```text
Minimum Rating: 4 ⭐
```

means:

```text
rating >= 4
```

Therefore, products rated 4 or 5 stars are returned.

---

## 4. Combinatorial Filtering

The three filters work together as an intersection.

A product must satisfy:

```text
Category
    AND
Price Range
    AND
Minimum Rating
```

Conceptually:

```javascript
const passesCategory =
    categories.size === 0 ||
    categories.has(product.category);

const passesPrice =
    product.price >= minPrice &&
    product.price <= maxPrice;

const passesRating =
    product.rating >= minRating;

return passesCategory &&
       passesPrice &&
       passesRating;
```

This ensures that applying multiple filters progressively narrows the catalog.

---

# ↕️ Sorting

Sorting is performed **after filtering**.

The available sorting options include:

```text
Featured
Price: Low to High
Price: High to Low
Top Rated First
```

The processing order is intentionally:

```text
FILTER
  ↓
SORT
  ↓
DISPLAY
```

For example:

```javascript
const filtered = filterProducts(products, criteria);

const sorted = sortProducts(filtered, sortKey);
```

The sorting function operates on a shallow copy of the filtered array so that the original product dataset is never modified.

---

# ⚡ Instant UI Updates

The React frontend reflects every filter change immediately.

The interaction flow is:

```text
User changes filter
        ↓
React state updates
        ↓
Query parameters are updated
        ↓
API request is sent
        ↓
Backend filters & sorts
        ↓
Products returned
        ↓
Product grid re-renders
```

The price slider requests are debounced by approximately **120ms**. This prevents an API request from being triggered for every individual pixel movement while keeping the interface responsive.

---

# 📭 Empty State

If the selected criteria produce no matching products, the product grid is replaced with:

```text
No items match your criteria.

Try widening the price range,
clearing a category, or lowering
the star cutoff.

[ Reset Filters ]
```

The reset button clears the active filters and restores the complete product catalog.

---

# 🔄 Reset Filters

The reset functionality clears:

* Selected categories
* Minimum rating
* Minimum price
* Maximum price
* Active filters

The catalog then returns to its original state.

---

# 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express
* REST API

### Development

* npm
* Nodemon

---

# 🎯 Key Implementation Highlights

* Multi-category filtering
* Dual-ended price range filtering
* Minimum star-rating filtering
* Combined/intersection filtering
* Backend-driven filtering and sorting
* Price and rating sorting
* Instant UI updates
* Debounced price-slider requests
* Graceful empty-state handling
* One-click filter reset
* Original product dataset remains immutable during sorting

---

# 📌 Core Requirement

The most important processing rule in the application is:

```text
FILTER FIRST → SORT SECOND → DISPLAY LAST
```

This guarantees that sorting only changes the presentation order of the products that already satisfy the selected filtering criteria.

---

## 👨‍💻 Author

Bishwa Ranjan Routray


