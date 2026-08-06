# TrackSphere

TrackSphere is a full-stack logistics and workforce-tracking platform. It combines secure role-based operations, live GPS updates, attendance reporting, and safety tooling in a React and Spring Boot monorepo.

## Highlights

- JWT access tokens with rotating refresh tokens and `ROLE_USER` / `ROLE_ADMIN` authorization
- Live vehicle location feed over STOMP WebSocket, with a Google Maps-ready dashboard
- Employee and administrator dashboards, responsive Material UI navigation, and protected routes
- Attendance clock-in/clock-out, search, route history, and Excel/PDF report exports
- Geofences, SOS alerts, user notifications, and auditable safety events
- PostgreSQL migrations via Flyway, OpenAPI docs, Docker Compose, Railway, Vercel, and GitHub Actions CI

## Architecture

```
tracksphere/
├── backend/       Spring Boot 3.5 API (Java 21, Maven, JPA, Flyway)
├── frontend/      React 19 + Vite client (Material UI, React Router)
├── docs/          Architecture notes
├── docker-compose.yml
└── .github/       Continuous-integration workflow
```

The backend follows Clean Architecture boundaries: domain entities/repositories, application services and DTOs, infrastructure configuration/security, and REST interfaces.

## Technology

| Area | Stack |
| --- | --- |
| Backend | Java 21, Spring Boot 3.5, Spring Security, Spring Data JPA, WebSocket/STOMP |
| Security | JWT, refresh-token rotation, BCrypt, method-level role checks |
| Data | PostgreSQL 16, Flyway |
| Frontend | React 19, Vite, TypeScript, Material UI, React Router v7, React Hook Form, Axios |
| Integrations | Google Maps JavaScript API, STOMP WebSocket, SheetJS, jsPDF |
| Delivery | Docker, Railway, Vercel, GitHub Actions |

## Run locally with Docker

Prerequisites: Docker Desktop.

```bash
git clone https://github.com/avnishweb91/tracksphere.git
cd tracksphere
docker compose up --build
```

The API is available at `http://localhost:8080`; Swagger UI is at `http://localhost:8080/swagger-ui.html`.

The Compose profile starts PostgreSQL and the backend. Run the Vite client separately for frontend development.

## Local development

Prerequisites: Java 21, Maven 3.9+, Node.js 22+, and PostgreSQL 16 (unless Docker is used for the database).

```bash
# Terminal 1: PostgreSQL + API
docker compose up postgres
cd backend
export APP_JWT_SECRET='use-a-unique-secret-of-at-least-32-characters'
mvn spring-boot:run
```

```bash
# Terminal 2: frontend
cd frontend
cp .env.example .env
npm ci
npm run dev
```

Open `http://localhost:5173`.

### Environment variables

| Variable | Used by | Purpose |
| --- | --- | --- |
| `APP_JWT_SECRET` | backend | Strong 32-byte minimum JWT signing secret |
| `SPRING_DATASOURCE_URL` | backend | PostgreSQL JDBC URL |
| `SPRING_DATASOURCE_USERNAME` / `SPRING_DATASOURCE_PASSWORD` | backend | Database credentials |
| `APP_CORS_ALLOWED_ORIGINS` | backend | Comma-separated allowed frontend origins |
| `VITE_API_URL` | frontend | API base URL; default is `http://localhost:8080/api/v1` |
| `VITE_GOOGLE_MAPS_API_KEY` | frontend | Enables the Google Maps live-map renderer |

## API overview

All endpoints below, except authentication and operational health/docs, require `Authorization: Bearer <access-token>`.

| Area | Endpoint | Notes |
| --- | --- | --- |
| Authentication | `POST /api/v1/auth/register`, `/login`, `/refresh` | Creates accounts and issues/rotates tokens |
| User | `GET /api/v1/users/me` | Current authenticated user |
| Locations | `GET /api/v1/locations/live` | Recent live location feed |
| Locations | `POST /api/v1/locations` | Record/broadcast location; admin-only |
| Locations | `GET /api/v1/locations/{vehicleId}/latest` | Latest vehicle position |
| Locations | `GET /api/v1/locations/{vehicleId}/history` | Route history; supports `from` and `to` ISO timestamps |
| Attendance | `POST /api/v1/attendance/clock-in`, `/clock-out` | Personal attendance actions |
| Attendance | `GET /api/v1/attendance/today`, `/report` | Current status and searchable reports |
| Safety | `GET`/`POST /api/v1/geofences` | Creation is admin-only |
| Safety | `POST /api/v1/sos` | Creates and broadcasts an SOS alert |
| Safety | `GET /api/v1/notifications` | Current user's safety notifications |
| Safety | `GET /api/v1/sos`, `/audit-logs` | Administrator-only operational views |

Interactive API documentation is available at `/swagger-ui.html`.

## Real-time events

Connect a STOMP client to `/ws` and subscribe to:

- `/topic/locations` — newly recorded GPS locations
- `/topic/alerts` — newly created SOS alerts

## Quality checks

```bash
cd backend && mvn verify
cd frontend && npm ci && npm run build
```

GitHub Actions runs these checks for pushes and pull requests targeting `develop` and `main`.

## Deployment

### Railway (backend)

Deploy the `backend/` directory as a Docker service and attach a PostgreSQL service. Set the datasource variables, `APP_JWT_SECRET`, and `APP_CORS_ALLOWED_ORIGINS` to the deployed frontend origin. Railway uses `/actuator/health` for its health check.

### Vercel (frontend)

Import the repository, set `frontend` as the root directory, and provide `VITE_API_URL` and (optionally) `VITE_GOOGLE_MAPS_API_KEY`. The included `frontend/vercel.json` rewrites client-side routes to `index.html`.

## Security notes

- Do not use the development JWT secret outside local development.
- Restrict CORS to exact production origins.
- Use a restricted Google Maps browser key and configure permitted referrers.
- Store deployment values in Railway/Vercel secrets, never in committed `.env` files.

## License

No license has been specified for this repository.
