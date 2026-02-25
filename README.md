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

## Project Structure

The repository is organized into two main folders:

### /backend

Contains the microservices that implement the quote lifecycle platform.

Each service is responsible for its own data and communicates asynchronously via Kafka.

The backend focuses on:

- Quote creation and state transitions
- Approval processing
- Notification handling
- Reliable event publishing through the Outbox pattern
- Idempotent message consumption

All services use PostgreSQL and follow a database-per-service approach.

### /frontend

Contains the user interface layer.

The frontend implementation is intentionally delegated and developed through Copilot-driven pull requests. The focus of this project remains on backend architecture and distributed system patterns.

## Scope of the First Version

The initial version focuses on:

- Creating and submitting quotes
- Processing approval asynchronously
- Publishing domain events
- Ensuring reliability between database transactions and event publication

Future iterations will introduce SLA management, advanced approval rules, authentication integration, and observability enhancements.
