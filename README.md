# Mini ERP & CRM System

A full-stack ERP (Enterprise Resource Planning) and CRM (Customer Relationship Management) web application developed using the MERN ecosystem with Prisma ORM and MySQL. The application helps businesses manage customers, products, inventory, and sales challans through a secure authentication system.

---

## Features

### Authentication
- JWT Authentication
- Secure Login
- Protected API Routes

### Dashboard
- Dashboard Statistics
- Customer Count
- Product Count
- Inventory Summary
- Sales Challan Summary

### Customer Management
- Add Customer
- View Customers
- Update Customer
- Delete Customer

### Product Management
- Add Product
- View Products
- Update Product
- Delete Product

### Inventory Management
- Stock IN
- Stock OUT
- Automatic Stock Update
- Inventory History

### Sales Challan
- Create Challan
- View Challans
- Confirm Challan
- Automatic Stock Deduction after Confirmation

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcrypt

### Database
- MySQL

---

## Project Structure

```
mini-erp-crm
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── prisma
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│
└── README.md
```

---

## Modules

### Authentication
- User Login
- JWT Token Generation
- Protected Routes

### Customers
- Create Customer
- Read Customers
- Update Customer
- Delete Customer

### Products
- Create Product
- Read Products
- Update Product
- Delete Product

### Inventory
- Stock IN
- Stock OUT
- Stock History

### Sales Challans
- Create Draft Challan
- View Challans
- Confirm Challan
- Automatic Inventory Update

---

## Business Workflow

```
User Login
      │
      ▼
Create Customer
      │
      ▼
Create Product
      │
      ▼
Stock IN
      │
      ▼
Customer Places Order
      │
      ▼
Create Draft Challan
      │
      ▼
Confirm Challan
      │
      ▼
Inventory Updated
      │
      ▼
Stock Movement Recorded
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
```

Configure your `.env` file:

```env
DATABASE_URL="mysql://username:password@localhost:3306/mini_erp_crm"
JWT_SECRET=your_secret_key
PORT=5000
```

Run Prisma:

```bash
npx prisma generate
npx prisma db push
```

Start Backend:

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Authentication

```
POST /api/auth/login
```

### Customers

```
GET    /api/customers
GET    /api/customers/:id
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
```

### Products

```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Inventory

```
POST /api/stock/in
POST /api/stock/out
GET  /api/stock/history
```

### Sales Challans

```
POST /api/challans
GET  /api/challans
GET  /api/challans/:id
PUT  /api/challans/:id/confirm
```

### Dashboard

```
GET /api/dashboard
```

---

## Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Endpoints
- Input Validation
- Prisma ORM for Secure Database Operations

---

## Future Enhancements

- Invoice Generation
- PDF Export
- Search & Filters
- Role-Based Access Control
- Purchase Orders
- Reports & Analytics
- Email Notifications
- Barcode Scanner
- Responsive UI
- Multi-Warehouse Support

---

## Author

**Nikhil Goud**

Mini ERP & CRM System

Developed as a Full Stack Placement Project using React, Node.js, Express, Prisma ORM, and MySQL.