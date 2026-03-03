# Lab – Quote Flow Platform

Event-driven quote lifecycle platform built with Spring Boot, Kafka and PostgreSQL.

This project simulates the lifecycle of business quotes (draft → submitted → approved → notified) using a microservices architecture and asynchronous communication.

The goal is to explore and demonstrate real-world backend patterns such as:

- Event-driven workflows
- Outbox pattern for reliable event publishing
- Idempotent consumers
- Database-per-service design
- Event ordering per aggregate
- Eventually consistent state transitions

The domain is intentionally simple (quote management) in order to focus on architectural decisions and backend design rather than UI complexity.

---

## Project Structure

```
lab-quote-flow-platform/
├── backend/
│   ├── docker/                  # Docker Compose infrastructure (Kafka, PostgreSQL)
│   │   ├── docker-compose.yml
│   │   └── .env                 # Environment variables for containers
│   └── quote/                   # Quote microservice (Spring Boot)
│       ├── src/
│       │   └── main/
│       │       ├── java/com/ezpeleta/quote/
│       │       │   ├── application/     # App config & common utilities
│       │       │   ├── controller/      # REST controllers (QuoteController)
│       │       │   ├── domain/          # Entities, DTOs, repositories, services
│       │       │   │   ├── entity/      # Quote, OutboxEvent, status enums
│       │       │   │   ├── dto/
│       │       │   │   ├── mapper/
│       │       │   │   ├── repository/
│       │       │   │   └── service/
│       │       │   └── scheduler/       # Outbox polling scheduler
│       │       └── resources/
│       │           ├── application.yaml
│       │           └── db/migration/    # Flyway SQL migrations
│       └── pom.xml
└── frontend/                    # UI layer (Copilot-driven)
```

---

## Tech Stack

| Layer          | Technology                                  |
|----------------|---------------------------------------------|
| Language       | Java 25                                     |
| Framework      | Spring Boot 4.0.3                           |
| Persistence    | Spring Data JPA + PostgreSQL 16 + Flyway    |
| Messaging      | Apache Kafka 4.2.0 (KRaft mode)             |
| Security       | Spring Security                             |
| API Docs       | SpringDoc OpenAPI 3 (Swagger UI)            |
| Build          | Maven (wrapper `mvnw` / `mvnw.cmd`)         |
| Infrastructure | Docker + Docker Compose                     |

---

## Prerequisites

- **Docker Desktop** (with Docker Compose v2)
- **Java 25** JDK
- **Maven 3.9+** (or use the included `mvnw` wrapper)

---

## Quick Start

### 1. Start infrastructure (PostgreSQL + Kafka)

```bash
cd backend/docker
docker compose up -d
```

This starts:

| Service         | Port (host) | Description                          |
|-----------------|-------------|--------------------------------------|
| postgres-quote  | `5432`      | PostgreSQL DB for the Quote service  |
| postgres-approval | `5433`    | PostgreSQL DB for the Approval service |
| kafka           | `9094`      | Kafka broker (external/host access)  |
| kafka-ui        | `8070`      | Kafka UI (Kafbat)                    |

### 2. Configure environment variables

Copy or review `backend/docker/.env`:

```dotenv
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

POSTGRES_QUOTE_DB=postgres-quote
POSTGRES_QUOTE_PORT=5432

POSTGRES_APPROVAL_DB=postgres-approval
POSTGRES_APPROVAL_PORT=5433

KAFKA_PORT=9092
```

### 3. Start the Quote service

```bash
cd backend/quote

# Linux / macOS
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

The service starts on **`http://localhost:8080/api`**.

### 4. Explore the API

Swagger UI is available at:

```
http://localhost:8080/api/swagger-ui/index.html
```

---

## Architecture Overview

```
Client
  │
  ▼
[Quote Service :8080]
  │  REST API
  │  PostgreSQL (postgres-quote :5432)
  │  Outbox table → Scheduler polls & publishes
  │
  ▼
[Kafka :9094]
  │
  ▼
[Approval Service]  ← (future)
  │  PostgreSQL (postgres-approval :5433)
  ▼
[Notification Service]  ← (future)
```

The **Outbox pattern** guarantees that domain events are written to the same database transaction as the business state change, and then published to Kafka by a polling scheduler — eliminating dual-write inconsistencies.

---

## Key Design Patterns

| Pattern                  | Where applied                                  |
|--------------------------|------------------------------------------------|
| Outbox Pattern           | `OutboxEvent` entity + `scheduler/`           |
| Database-per-service     | Separate PostgreSQL instances per service      |
| Idempotent consumers     | Planned for Approval / Notification services   |
| Event ordering           | Per-aggregate Kafka topic partitioning         |
| Eventually consistent    | State transitions via async Kafka events       |

---

## Scope of the First Version

The initial version focuses on:

- Creating and submitting quotes
- Publishing domain events reliably via the Outbox pattern
- Processing approval asynchronously
- Ensuring consistency between database transactions and event publication

Future iterations will introduce:
- Approval service implementation
- Notification service
- SLA management
- Advanced approval rules
- Authentication integration
- Observability enhancements (metrics, tracing)

---

## Frontend

The frontend implementation is intentionally delegated and developed through Copilot-driven pull requests. The focus of this project remains on backend architecture and distributed system patterns.
