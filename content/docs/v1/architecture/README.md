---
order: 8
title: Architecture
description: System design, components, and operational architecture of OpsKnight
---

# System Architecture

This section covers the internal architecture of OpsKnight, including system components, data flow, database design, and scaling considerations. Understanding the architecture helps with troubleshooting, customization, and capacity planning.

---

## High-Level Architecture

```
                           ┌────────────────────────────────────────────────────────┐
                           │                    CLIENTS                              │
                           │  Web Browser │ Mobile PWA │ API Consumers │ Webhooks   │
                           └──────────────────────────┬─────────────────────────────┘
                                                      │
                                                      ▼
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                    NEXT.JS APPLICATION                                   │
│  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────────────────────┐ │
│  │    React UI        │  │    API Routes      │  │     Background Jobs                │ │
│  │  - Dashboard       │  │  - /api/events     │  │  - Escalation Worker              │ │
│  │  - Incidents       │  │  - /api/incidents  │  │  - Notification Worker            │ │
│  │  - Schedules       │  │  - /api/schedules  │  │  - Auto-Unsnooze Worker           │ │
│  │  - Settings        │  │  - /api/users      │  │  - Data Cleanup Worker            │ │
│  │  - Mobile          │  │  - /api/webhooks   │  │  - Metric Rollup Worker           │ │
│  └────────────────────┘  └────────────────────┘  └────────────────────────────────────┘ │
└──────────────────────────────────────────────┬───────────────────────────────────────────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
                    ▼                          ▼                          ▼
           ┌───────────────┐          ┌───────────────┐          ┌───────────────┐
           │  PostgreSQL   │          │   Job Queue   │          │   External    │
           │   Database    │          │   (Postgres)  │          │   Services    │
           │               │          │               │          │               │
           │ - Users       │          │ - Pending     │          │ - SMTP        │
           │ - Teams       │          │ - Processing  │          │ - Twilio      │
           │ - Services    │          │ - Completed   │          │ - Slack       │
           │ - Incidents   │          │ - Failed      │          │ - Firebase    │
           │ - Schedules   │          │               │          │               │
           └───────────────┘          └───────────────┘          └───────────────┘
```

---

## Technology Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | Next.js 16 + React 19 | SSR, great DX, unified routing |
| **UI Components** | Radix UI + Tailwind CSS | Accessible, beautiful, fast |
| **State** | React Query + React Context | Efficient data fetching, simple state |
| **Database** | PostgreSQL 14+ | Reliable, performant, feature-rich |
| **ORM** | Prisma | Type-safe, migrations, query builder |
| **Auth** | NextAuth.js | Flexible, SSO support, sessions |
| **Job Queue** | Custom (Postgres-based) | No Redis dependency |
| **Charts** | Recharts | React-native charting |
| **Forms** | React Hook Form + Zod | Performant validation |

---

## Component Architecture

### Frontend Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # Authenticated routes
│   │   ├── dashboard/     # Command center
│   │   ├── incidents/     # Incident management
│   │   ├── schedules/     # On-call schedules
│   │   ├── services/      # Service directory
│   │   ├── policies/      # Escalation policies
│   │   ├── teams/         # Team management
│   │   └── settings/      # Configuration
│   ├── api/               # API routes
│   │   ├── events/        # Events API
│   │   ├── incidents/     # Incidents API
│   │   ├── integrations/  # Webhook receivers
│   │   └── ...
│   └── m/                 # Mobile routes
├── components/            # React components
│   ├── incident/          # Incident-related
│   ├── dashboard/         # Dashboard widgets
│   ├── schedules/         # Schedule UI
│   └── ui/                # Shared UI components
├── lib/                   # Business logic
│   ├── integrations/      # Integration parsers
│   ├── notifications/     # Notification handlers
│   └── escalation/        # Escalation engine
├── hooks/                 # Custom React hooks
├── contexts/              # React contexts
└── types/                 # TypeScript types
```

### API Structure

```
/api
├── /events              # Alert ingestion (Events API)
├── /incidents           # Incident CRUD
├── /services            # Service management
├── /schedules           # Schedule management
├── /users               # User management
├── /teams               # Team management
├── /integrations        # Webhook receivers
│   ├── /datadog
│   ├── /prometheus
│   ├── /cloudwatch
│   └── /webhook
├── /slack               # Slack integration
├── /admin               # Admin operations
├── /health              # Health checks
└── /realtime            # SSE streams
```

---

## Database Architecture

### Core Tables

| Table | Purpose |
|-------|---------|
| `User` | User accounts and profiles |
| `Team` | Team organization |
| `TeamMember` | User-team relationships |
| `Service` | Monitored services |
| `Incident` | Incident records |
| `Alert` | Raw alerts from integrations |
| `OnCallSchedule` | Schedule definitions |
| `OnCallLayer` | Rotation layers |
| `OnCallOverride` | Temporary overrides |
| `EscalationPolicy` | Escalation definitions |
| `EscalationRule` | Policy steps |
| `Notification` | Notification records |

### Indexing Strategy

Key indexes for performance:

```sql
-- Incident queries
CREATE INDEX idx_incident_status_urgency
  ON Incident(status, urgency, createdAt);

-- On-call lookups
CREATE INDEX idx_schedule_layer_time
  ON OnCallShift(scheduleId, startTime, endTime);

-- Escalation processing
CREATE INDEX idx_incident_escalation
  ON Incident(nextEscalationAt, escalationStatus);

-- Service lookups
CREATE INDEX idx_incident_service
  ON Incident(serviceId, status, createdAt);
```

---

## Job Queue Architecture

OpsKnight uses a **Postgres-based job queue** instead of Redis:

### Job Types

| Job Type | Purpose | Frequency |
|----------|---------|-----------|
| `ESCALATION` | Execute escalation step | Per incident |
| `NOTIFICATION` | Send notification | Per notification |
| `AUTO_UNSNOOZE` | Unsnooze incidents | Per snoozed incident |
| `SCHEDULED_TASK` | Cron jobs | Scheduled |

### Job Flow

```
1. Job Created → status: PENDING
2. Worker Claims → status: PROCESSING
3. Work Executed
4. Success → status: COMPLETED
   Failure → status: FAILED (retry if attempts < max)
```

### Benefits of Postgres Queue

- **No additional infrastructure** — Uses existing database
- **Transactional** — Jobs created with data atomically
- **Reliable** — ACID guarantees
- **Simpler operations** — One less service to manage

---

## Escalation Engine

The escalation engine is the core of OpsKnight's notification routing:

### Flow

```
Incident Created
       │
       ▼
┌──────────────────────┐
│ Find Escalation      │
│ Policy for Service   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Execute Step 1       │
│ (immediate)          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Resolve Target       │
│ (User/Team/Schedule) │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Send Notifications   │
│ via configured       │
│ channels             │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Schedule Next Step   │
│ (if not acknowledged)│
└──────────────────────┘
```

### Target Resolution

When a step targets a **Schedule**:
1. Query schedule for current on-call user
2. Resolve layers (higher layers override)
3. Apply overrides
4. Return on-call user(s)

When a step targets a **Team**:
1. Get team members
2. If "team lead only", filter to leads
3. Return users to notify

---

## Notification Flow

```
Escalation Step Executed
           │
           ▼
┌──────────────────────┐
│ Create Notification  │
│ Records              │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Determine Channels   │
│ (user prefs +        │
│  step overrides)     │
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
  ┌──────┐   ┌──────┐
  │Email │   │ SMS  │  ... (Push, Slack, etc.)
  └──┬───┘   └──┬───┘
     │          │
     ▼          ▼
┌──────────────────────┐
│ Provider Delivery    │
│ (SendGrid, Twilio)   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Track Delivery       │
│ Status               │
└──────────────────────┘
```

---

## Real-time Updates

OpsKnight uses **Server-Sent Events (SSE)** for real-time updates:

### Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/realtime/stream` | Incident updates |
| `/api/events/stream` | Raw events |
| `/api/notifications/stream` | User notifications |

### How It Works

1. Client opens SSE connection
2. Server authenticates and registers connection
3. Changes broadcast to relevant connections
4. Client updates UI optimistically

---

## Security Architecture

### Authentication

```
Request → NextAuth Middleware → Session Check → Route Handler
                                      │
                                      ▼
                              ┌───────────────┐
                              │ Session Store │
                              │ (JWT/Database)│
                              └───────────────┘
```

### API Authentication

```
Request → API Key Check → Scope Validation → Route Handler
              │                  │
              ▼                  ▼
        ┌──────────┐      ┌──────────────┐
        │ API Keys │      │ Scope Rules  │
        │  Table   │      │              │
        └──────────┘      └──────────────┘
```

### Encryption

- **At rest**: Sensitive fields encrypted with AES-256
- **In transit**: TLS 1.2+ required
- **Passwords**: bcrypt with cost factor 10

---

## Scaling Considerations

### Horizontal Scaling

OpsKnight is designed for horizontal scaling:

- **Stateless application** — Scale pods freely
- **Shared database** — PostgreSQL handles concurrency
- **Job queue locking** — Prevents duplicate processing
- **Session storage** — JWT or database-backed

### Recommended Scaling

| Load | Application Pods | Database |
|------|------------------|----------|
| Small (<100 incidents/day) | 1-2 | Single node |
| Medium (100-1000/day) | 2-4 | Primary + replica |
| Large (1000+/day) | 4+ with HPA | Primary + replicas + connection pooling |

### Performance Optimizations

- **Database indexes** on hot paths
- **Query optimization** with Prisma
- **Metric rollups** for historical data
- **Pagination** on list endpoints
- **Caching** for static data

---

## Related Topics

- [Deployment](../deployment/) — Production deployment guides
- [Dashboard Architecture](./dashboard.md) — UI architecture
- [Settings Architecture](./settings.md) — Configuration surfaces
