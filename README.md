---


---
# Wezire Wallet Frontend

## Overview

The **Wezire Wallet Frontend** provides a sleek and responsive interface for the Wezire Wallet application. It is built with **React**, **TypeScript**, and **Vite**, enabling seamless user interactions for wallet management, transactions, and account-related features.

## Features

* **User Interface**:
  * Clean and responsive design.
  * Role-based views for different user actions.
* **Wallet Management**:
  * Add money to the wallet.
  * View wallet balance.
* **Money Transactions**:
  * Send money to other users.
  * Request money from other users.
  * View and manage transaction history.
* **Authentication**:
  * Secure login and registration with JWT token management.
  * Email verification during registration.
* **Error Handling**:
  * Friendly error messages for invalid actions.

## Tech Stack

* **React.js**: Library for building the user interface.
* **TypeScript**: Provides type safety and maintainable code.
* **Vite**: Fast development server and build tool.
* **React Router**: Handles navigation between pages.
* **Axios**: For API requests to the backend.
* **Tailwind CSS**: For styling the application.

## Installation

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (or MongoDB Atlas for a cloud-based solution)

### Steps to Install

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add the following:

   ```bash
   VITE_API_URL = <backend_api_url>
   ```
4. **Run the server:**

   ```bash
   npm run dev
   ```
5. **Build for production:**

   ```bash
   npm run build
   ```

## File Hierarchy

Below is the structure of the project directory, including the key files and their purposes:

```bash

├── src
│   ├── components
│   │   ├── AddMoney.tsx
│   │   ├── Home.tsx
│   │   ├── input.tsx
│   │   ├── Menu.tsx
│   │   ├── Navbar.tsx
│   │   ├── PasswordStrengthMeter.tsx
│   │   ├── ProtectedRoute.tsx             
│   │   ├── RequestMoney.tsx         
│   │   ├── SendMoney.tsx            
│   │   ├── SendRequestMoney.tsx   
│   │   └── ShowTransactions.tsx        
│   ├── store
│   │   └── store.tsx                         
│   ├── pages
│   │   ├── Login.tsx            
│   │   ├── Register.tsx                
│   ├── App.tsx                      
│   ├── main.tsx
│   └── index.css                     
├── public                          
│   └── logo.svg
├── .gitignore                       
├── package-lock.json                 
├── package.json                    
├── README.md                        
├── tsconfig.json                    
└── vite.config.ts                   

```

### Other Important Files

* **`.env`**: Contains environment-specific variables like the backend API URL.
* **`package.json`**: Contains project metadata, dependencies, and scripts.
* **`tsconfig.json`**: Configuration file for TypeScript to define compiler options.
* **`vite.config.ts`**: Configuration file for Vite to optimize the build process.
* **`README.md`**: This file contains project documentation.
