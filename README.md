# NestJS Application for User and Document Management

This project is a NestJS-based API that handles **user authentication**, **user role management**, **document management**, and **ingestion processes**. It uses **TypeORM** for database operations, **JWT** for authentication, and **NestJS services** to encapsulate business logic for each module.

---

## Table of Contents

- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Modules and Features](#modules-and-features)
  - [Auth Module](#auth-module)
  - [User Module](#user-module)
  - [Document Module](#document-module)
  - [Ingestion Module](#ingestion-module)
- [Database Configuration](#database-configuration)

---

## Installation

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/nestjs-user-document-management.git
   cd nestjs-user-document-management
# Project Setup and Configuration

## Environment Setup

### Environment Variables

Set up the necessary environment variables by creating a `.env` file at the root of the project. Below are the recommended environment variables:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database
JWT_SECRET=your-jwt-secret
```


## Modules and Features

### Auth Module

The Auth module handles user authentication, including login, logout, and JWT-based access control. It supports user authentication via email and password and generates JWT tokens for access.

#### Endpoints:

- `POST /auth/login`: Logs in a user and generates a JWT token.
- `POST /auth/register`: Registers a new user.
- `POST /auth/logout`: Logs out a user (optional, for token invalidation).

#### Auth Service Functions:

- `hashPassword()`: Hashes user passwords using bcrypt.
- `validatePassword()`: Validates password during login.
- `login()`: Authenticates the user and generates JWT tokens.

### User Module

The User module manages user roles and permissions within the system. Only admin users can update user roles.

#### Endpoints:

- `GET /users`: Returns all users.
- `GET /users/:id`: Retrieves a user by ID.
- `PUT /users/:id/role`: Updates the role of a user.

#### User Service Functions:

- `updateUserRole()`: Updates the role of an existing user.

### Document Module

The Document module handles CRUD operations for managing documents, including uploading and retrieving documents.

#### Endpoints:

- `POST /documents`: Creates a new document.
- `GET /documents`: Retrieves all documents.
- `GET /documents/:id`: Retrieves a specific document by ID.
- `PUT /documents/:id`: Updates a document.
- `DELETE /documents/:id`: Deletes a document.

#### Document Service Functions:

- `createDocument()`: Creates a new document.
- `getAllDocuments()`: Retrieves all documents.
- `getDocumentById()`: Retrieves a document by ID.
- `updateDocument()`: Updates a document by ID.
- `deleteDocument()`: Deletes a document.

### Ingestion Module

The Ingestion module allows triggering and managing the ingestion process.

#### Endpoints:

- `POST /ingestions`: Triggers the ingestion process.
- `GET /ingestions`: Retrieves all ingestion records.
- `GET /ingestions/:id`: Retrieves a specific ingestion by ID.
- `PUT /ingestions/:id/status`: Updates the status of an ingestion.

#### Ingestion Service Functions:

- `triggerIngestion()`: Triggers the ingestion process.
- `getAllIngestions()`: Retrieves all ingestion records.
- `getIngestionById()`: Retrieves a specific ingestion by ID.
- `updateIngestionStatus()`: Updates the status of an ingestion.

## Database Configuration

The database is configured using TypeORM. Here's the basic configuration in the `.env` file:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database

