# Backend

This is the backend for the movie application. It is a Node.js application written in TypeScript that connects to a PostgreSQL database.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the database:**
    From the root of the project, run:
    ```bash
    docker-compose up -d
    ```
    This will start a PostgreSQL database in a Docker container.

## Running the application

-   **Development mode:**
    ```bash
    npm run dev
    ```
    This will start the server with `nodemon`, which will automatically restart the server when you make changes to the code.

-   **Production mode:**
    ```bash
    npm start
    ```
    This will start the server with `ts-node`.

## Database

The database is a PostgreSQL database running in a Docker container. The connection details are defined in the `docker-compose.yml` file and are used in the backend via a `.env` file.

-   **Host:** localhost
-   **Port:** 5432
-   **Username:** user
-   **Password:** password
-   **Database:** movieapp

The application will automatically create the necessary tables (`users` and `roles`) when it starts.
