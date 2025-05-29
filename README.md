# Project Overview

This is a simple News Aggregator REST API built using Node.js, Express.js, Sequelize ORM, and PostgreSQL. It supports basic user authentication and CRUD operations for managing news articles.

# Features

- User registration and login with JWT
- Create, read, update, delete (CRUD) for news articles
- Sequelize ORM for PostgreSQL integration
- Secure route access with middleware
- Error handling and validation

# Installation

- Node.js version 18 or above is required
- Clone the repository
  git clone url
- Navigate into the project directory
  cd project
- Install dependencies
  npm install
- Create a .env file based on the provided .env.example
- Run the application
  npm run dev
- Server will start on http://localhost:3000

# API Endpoints

## Auth

POST /api/v1/user/register  
- Register a new user  
- Request body:  
  {  
    "name": "John",  
    "email": "john@example.com",  
    "password": "123456"  
  }

POST /api/v1/user/login  
- Login with credentials  
- Request body:  
  {  
    "email": "john@example.com",  
    "password": "123456"  
  }

## News

All news routes require Authorization: Bearer <token>

POST /api/v1/news  
- Create a news article  
- Request body:  
  {  
    "title": "News title",  
    "content": "Full content",  
    "source": "News Source"  
  }

GET /api/v1/news  
- Get all news articles

# Environment Variables

- Create a .env file using .env.example
- Set values for:
  - PORT
  - DB_HOST
  - DB_PORT
  - DB_USER
  - DB_PASSWORD
  - DB_NAME
  - JWT_SECRET

# Running Tests

- Not available yet (optional for future)

# License

MIT
