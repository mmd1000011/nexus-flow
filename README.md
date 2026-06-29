 Nexus Flow - Event Sourcing Engine
A robust, enterprise-grade Event Sourcing system built with a modern Monorepo architecture. Instead of simply storing the current state of data, Nexus Flow persists every single event (fact) that has occurred in the system.

 Tech Stack
Backend: NestJS, TypeORM, PostgreSQL, TypeScript
Frontend: Next.js 14 (App Router), Tailwind CSS, TypeScript
Infrastructure: Docker, Docker Compose, Redis
Architecture: Event Sourcing, CQRS-Ready, Monorepo (NPM Workspaces)
 Quick Start
Prerequisites
Node.js (v18+)
Docker Desktop
1. Clone & Install
git clone https://github.com/mmd1000011/nexus-flow.gitcd nexus-flownpm install
2. Start Databases
bash

docker-compose up -d
3. Configure Environment
Rename .env.example to .env in apps/api/ and fill in your database credentials.

4. Run the System
bash

# Terminal 1: Backend (Port 8000)
cd apps/api
npm run start:dev

# Terminal 2: Frontend (Port 8001)
cd apps/web
npm run dev
Open http://localhost:8001 to view the Event Stream Dashboard.
 How It Works
The Frontend dispatches an Event (e.g., USER_REGISTERED).
The Backend receives it and saves it as a JSONB payload into PostgreSQL.
The system creates an immutable log of everything that happens.
This is version 1. Stay tuned for new versions.
