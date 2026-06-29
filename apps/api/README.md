1.Nexus Flow - Event Sourcing Engine
A robust, enterprise-grade Event Sourcing system built with a modern Monorepo architecture. Instead of simply storing the current state of data, Nexus Flow persists every single event (fact) that has occurred in the system, creating a reliable audit log and enabling powerful workflow automation

2.Tech Stack
Backend: NestJS, TypeORM, PostgreSQL, TypeScript
Frontend: Next.js 14 (App Router), Tailwind CSS, TypeScript
Infrastructure: Docker, Docker Compose, Redis (Prepared for queuing)
Architecture: Event Sourcing, CQRS-Ready, Monorepo (NPM Workspaces)


3.Quick Start (Zero Hassle)
Prerequisites
Node.js (v18+)
Docker Desktop
1. Clone & Install
git clone <YOUR_REPO_URL>cd nexus-flownpm install
2. Start Databases
docker-compose up -d
3. Configure Environment
Rename .env.example to .env in apps/api/ and fill in your database credentials (Defaults match docker-compose).
4. Run the System
# Terminal 1: Backend
cd apps/api
npm run start:dev

# Terminal 2: Frontend
cd apps/web
npm run dev
Open http://localhost:8001 to view the Event Stream Dashboard.

 How It Works
The Frontend dispatches an Event (e.g., USER_REGISTERED).
The Backend receives it via an API endpoint.
The EventPublisher service generates a UUID and saves the raw event as a JSONB payload into the events table in PostgreSQL.
The Frontend queries the store and displays the immutable log