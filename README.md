# **Shopping Cart Application**

### **ABCDE Ventures – Full Stack Assignment**

---

## **Project Overview**

This project is a **full-stack shopping cart application** that demonstrates the complete lifecycle of an e-commerce transaction:

**User Creation → Authentication → Cart Management → Order Placement**

A key requirement of this assignment is **single-device session management**, which is implemented using JWT and database-stored tokens.

---

## **Tech Stack**

### **Backend**

* Node.js

* Express.js

* MongoDB

* Mongoose

* JSON Web Token (JWT)

* bcrypt

* CORS

### **Frontend**

* React (Vite)

* JavaScript

* Axios

* CSS

---

## **Authentication & Session Management**

* Users authenticate using **JWT**

* Only **one active session per user** is allowed

* The JWT token is stored in the **users collection**

* If a user tries to log in while already logged in elsewhere:

  * Login is blocked with **403 Forbidden**

* On logout, the token is cleared from the database

This enforces **single-device login**, as required by the assignment.

---

## **Features**

* User registration & login

* Single-device session enforcement

* View available items

* Add items to cart

* View cart

* Checkout and place orders

* View order history

* Secure logout

* Clean and user-friendly UI

---

## **Project Structure**

`shopping-cart-app/`  
`├── backend/`  
`│   ├── models/`  
`│   ├── routes/`  
`│   ├── middleware/`  
`│   ├── server.js`  
`│   ├── package.json`  
`│   └── .env.example`  
`│`  
`├── frontend/`  
`│   ├── src/`  
`│   │   ├── components/`  
`│   │   ├── App.jsx`  
`│   │   └── main.jsx`  
`│   ├── package.json`  
`│   └── vite.config.js`  
`│`  
`├── .gitignore`  
`└── README.md`

---

## **⚙️ Backend Setup**

### **Navigate to backend folder**

`cd backend`

### **Install dependencies**

`npm install`

### **Environment Variables**

Create a `.env` file using `.env.example`:

`PORT=5000`  
`MONGO_URI=mongodb://127.0.0.1:27017/shoppingcart`  
`JWT_SECRET=your_secret_key`

### **Start backend server**

`npm run dev`

Backend runs on:

`http://localhost:5000`

---

## **Frontend Setup**

### **Navigate to frontend folder**

`cd frontend`

### **Install dependencies**

`npm install`

### **Start frontend server**

`npm run dev`

Frontend runs on:

`http://localhost:5173`

---

## **🔗 API Endpoints**

### **User APIs**

* `POST /users` – Register user

* `POST /users/login` – Login user

* `POST /users/logout` – Logout user

### **Item APIs**

* `POST /items` – Add item

* `GET /items` – Get all items

### **Cart APIs (Protected)**

* `POST /carts` – Add item to cart

* `GET /carts` – View cart

### **Order APIs (Protected)**

* `POST /orders` – Checkout & create order

* `GET /orders` – View order history

---

## **Application Flow**

1. User logs in

2. Items are displayed

3. User clicks an item to add it to cart

4. Cart can be viewed

5. Checkout converts cart into an order

6. Order history can be viewed

7. User logs out

---

## **Error Handling**

* Invalid login → alert message

* Login from another device → blocked

* Invalid or expired session → protected routes blocked

* Proper logout clears session correctly

---

## **Deployment**

**Deployment is not required** for this assignment.

The application is intended to be run locally.  
 All setup instructions are provided above.

---

## **Author**

**Bonaboina Gowtham**

