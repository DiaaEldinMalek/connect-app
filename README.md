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
git clone https://github.com/DiaaEldinMalek/connect-app.git
cd connect-app
```


### 2. Build and Run with Docker Compose

```bash
docker-compose up --build
```

This will:

- Build the Docker image for the NestJS application.

- Start a MongoDB container.

- Run the application on http://localhost:3000.


## API Endpoints
### User Registration
- #### POST /users/register

- - Request Body:

```json
{
  "username": "testuser",
  "password": "testpassword",
  "name": "Test User"
}
```

- - Response:
```json
{
    "id": "6791029655e7397961193358"
}
```

### User Login
- #### POST /auth/login

- - Request Body:

```json

{
  "username": "testuser",
  "password": "testpassword"
}
```
- - Response:

```json
{
  "access_token": "<JWT_TOKEN>"
}
```

### Deposit Money
- #### POST /deposit

- - Headers:

Authorization: Bearer <JWT_TOKEN>

Idempotency-Key: <UNIQUE_KEY>

- - Request Body:

```json

{
  "amount": 100
}
```

## Usage
The easiest way to test the application is through postman. Install postman and click **Import** to load the collection titled **postmanAPIs.json** into Postman.


## Limitations
- Sensitive data is provided in the *docker-compose.yaml*  file, such as the database user/password and the JWT secret. This issue can be solved by using docker secrets or .env files, but due to lack of time and the fact that this is a mock database, I left it there.