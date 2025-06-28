# Subnet Explorer Indexer

A Node.js/TypeScript service that subscribes to Tendermint’s WebSocket, ingests new blocks and transactions, and stores them in PostgreSQL. Exposes a simple REST API for querying block and tx data.

---

## 🛠️ Prerequisites

- **Node.js** v16+ and **npm** (or **yarn**)
- **Docker** & **Docker Compose** (optional, but recommended for local dev)
- **PostgreSQL** (if not using Docker Compose)

---

## ⚙️ Configuration

1. Copy the example env file:
   ```bash
   cp .env.example .env
# subnet-explorer-indexer
