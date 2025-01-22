# NestJS API with Docker

This is a NestJS-based RESTful API with user registration, login, and deposit functionality. The application is containerized using Docker for easy setup and deployment.

---

## Features
- **User Registration**: Create a new user with a username, password, and name.
- **User Login**: Authenticate users and return a JWT token.
- **Deposit**: Securely deposit money with idempotency to prevent duplicates.
- **MongoDB**: Persistent data storage using MongoDB.
- **Dockerized**: Easy setup with Docker and Docker Compose.

---

## Prerequisites
- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-app-name>
```


### 2. Clone the Repository
```bash
docker-compose up --build
```

This will:

- Build the Docker image for the NestJS application.

- Start a MongoDB container.

- Run the application on http://localhost:3000.


### API Endpoints
## User Registration
- ## POST /users/register

- - Request Body:

```json
{
  "username": "testuser",
  "password": "testpassword",
  "name": "Test User"
}
```