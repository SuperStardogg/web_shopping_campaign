# 🛍️ Discount Campaign Monorepo

This monorepo project demonstrates a discount calculation system built with:

* **Frontend:** Vue 3 + Vite + TailwindCSS + shadcn-vue + Axios
* **Backend:** NestJS (RESTful API) with custom business logic and campaign validation
* **Monorepo Management:** NPM Workspaces with shared dependencies and concurrent development setup

---

## 📁 Project Structure

```
my-monorepo/
├── apps/
│   ├── client/         # Frontend (Vue 3 + Vite)
│   │   ├── src/
│   │   ├── public/
│   │   └── index.html
│   └── server/         # Backend (NestJS)
│       ├── src/
│       ├── test/
│       └── main.ts
├── node_modules/
├── package.json        # Root with scripts and workspaces config
├── README.md
└── tailwind.config.js  # Optional shared Tailwind config
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SuperStardogg/web_shopping_campaign.git
cd web_shopping_campaign
```

### 2. Install Dependencies

We recommend using [pnpm](https://pnpm.io/) for better performance and monorepo support:

```bash
npm install -g pnpm   # if not already installed
pnpm install
```

Alternatively, if you're using npm:

```bash
npm install
```

### 3. Start Both Frontend and Backend

```bash
pnpm dev
```

> This runs both Vue (Vite) and NestJS concurrently:
>
> * Frontend: [http://localhost:5173](http://localhost:5173)
> * Backend API: [http://localhost:3001](http://localhost:3001)

---

## 🧠 Features

### ✅ Frontend (Vue + Vite)

* Vue 3 Composition API
* TailwindCSS with shadcn-vue UI library
* Axios HTTP client with global interceptors
* Form for inputting shopping cart and campaign data
* Handles validation and shows calculated discounts

### ✅ Backend (NestJS)

* REST API under `/calculation/discount`
* DTOs and validation using `class-validator`
* Business rules:

  * Apply only one campaign per category (e.g., only fixed or percentage coupon)
  * Campaign types: fixed, percentage, category\_percentage, point, seasonal
  * Points capped at 20% of cart total
  * Seasonal: every X THB gets Y THB off
* Validated response with full discount breakdown

---

## 📦 Scripts

### Root-level (Monorepo)

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `pnpm install` | Installs all workspace dependencies |
| `pnpm dev`     | Runs both FE & BE concurrently      |

### `apps/client/` (Frontend)

| Command      | Description            |
| ------------ | ---------------------- |
| `pnpm dev`   | Starts Vite dev server |
| `pnpm build` | Builds production app  |

### `apps/server/` (Backend)

| Command          | Description                 |
| ---------------- | --------------------------- |
| `pnpm start:dev` | Starts NestJS in watch mode |
| `pnpm build`     | Compiles NestJS app         |

---

## 🧪 Sample API Usage

### Endpoint

```
GET /api/v1/products
```

### Response

```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "T-Shirt",
            "category": "Clothing",
            "price": 350,
            "quantity": 1
        },
        {
            "id": 2,
            "name": "Hat",
            "category": "Accessories",
            "price": 250,
            "quantity": 1
        },
        ...
    ],
    "message": "Success",
    "error": null
}
```



```
GET /api/v1/campaign
```

### Response

```json
{
  "success": true,
  "data": [
    {
        "id": 1,
        "name": "Fixed Amount Coupon",
        "type": "fixed",
        "subType": "coupon",
        "amount": 50,
        "priority": 1,
    },
    ...
  ]
}
```

```
POST /api/v1/campaign/discount
```

### Request Body

```json
{
  "cartItems": [
    {
      "id": 1,
      "name": "T-Shirt",
      "category": "Clothing",
      "price": 350,
      "quantity": 1,
    },
  ],
  "campaigns": [
     {
      "id": 2,
      "name": "Percentage Discount Coupon",
      "type": "percentage",
      "subType": "coupon",
      "percentage": 10,
      "priority": 2,
      "description": "10% off entire cart",
      "active": true,
    },
  ]
}
```

### Response

```json
{
  "success": true,
  "data": {
    "finalPrice": 2511,
    "categoryPrice": {
        "Clothing": 1050,
        "Accessories": 890,
        "Electronics": 850
    }
  }
}
```

---

## 🧰 Technologies Used

* Vue 3 + Vite
* Tailwind CSS
* shadcn-vue
* Axios
* NestJS
* class-validator
* concurrently (for monorepo script running)

---

## 📌 Business Logic Rules

1. Only one campaign per discount category is allowed:

   * Coupon: fixed OR percentage
   * On Top: category\_percentage OR point
   * Seasonal: one only

2. Discount apply order:

   * Coupon → On Top → Seasonal

3. Point-based discounts are capped at **20%** of cart total.

4. Category-based discounts apply only to specified category items.

5. Seasonal discounts apply every X THB → subtract Y THB.

---

## 🧑‍💻 Contributors

* [Natcha Suttiwattana✨](https://github.com/SuperStardogg) — Developer

---

## 🙌 Acknowledgements

* [NestJS](https://nestjs.com/)
* [Vue 3](https://vuejs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui (Vue)](https://github.com/shadcn-ui/shadcn-vue)
* [class-validator](https://github.com/typestack/class-validator)
* [concurrently](https://github.com/open-cli-tools/concurrently)

---

## 🖥 Result

1. Show list of products in shopping cart

* Mobile
* ![shopping cart mobile](./img/Screen%20Shot%202568-07-02%20at%2003.42.11.png)

2. Show list of products in shopping cart
* Mobile
* ![campaign mobile](./img/Screen%20Shot%202568-07-02%20at%2003.43.26.png)

* Desktop
* ![campaign desktop](./img/Screen%20Shot%202568-07-02%20at%2003.59.32.png)
