# TrackSphere

TrackSphere is an enterprise SaaS platform for transportation and logistics tracking. This repository is organised as a Clean Architecture monorepo.

## Milestone 1: backend authentication

The Java 21 / Spring Boot backend provides PostgreSQL migrations, registration, login, JWT access tokens, rotating refresh tokens, role-based security, OpenAPI documentation, STOMP WebSocket foundations, Docker, and Railway configuration.

### Run locally

```bash
docker compose up --build
```

The API runs at `http://localhost:8080`; interactive API documentation is at `http://localhost:8080/swagger-ui.html`.

For local development without Docker, start PostgreSQL using the credentials in `docker-compose.yml`, then run:

```bash
cd backend
mvn spring-boot:run
```

Set `APP_JWT_SECRET` to a unique 32-byte-or-longer secret outside local development.

### Auth endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Creates a `ROLE_USER` account and returns tokens |
| POST | `/api/v1/auth/login` | Authenticates an account |
| POST | `/api/v1/auth/refresh` | Rotates a refresh token |
| GET | `/api/v1/users/me` | Returns the authenticated user |

### Deployment

Deploy `backend/` to Railway as a Docker service and attach a PostgreSQL service. Set `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, and a strong `APP_JWT_SECRET`. Railway uses `/actuator/health` for readiness checks.
