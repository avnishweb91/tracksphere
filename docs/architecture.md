# Architecture

The backend separates domain entities and repositories, application use cases and DTOs, infrastructure adapters/configuration, and REST interfaces. Flyway is the only schema writer; JPA runs in `validate` mode. Authentication is stateless: short-lived signed JWTs authorize requests, while one-time refresh tokens are persisted and rotated.
