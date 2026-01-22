---
order: 2
title: Service Directory
description: Centralized registry for health monitoring and ownership.
---

# Service Directory

The **Service Directory** is the foundational registry of your infrastructure.

### Why is this needed?
Without a Service Directory, alerts are "orphans" with no context. You might know *something* is broken, but you won't know **who owns it**, **how critical it is**, or **where it lives**. This page provides the **Context Map** for every incident, linking technical failures to human owners.

![Service Directory Header](/service-directory-header.png)

## 1. Unified Health Dashboard

The top panel offers an immediate SITREP (Situation Report) of your infrastructure quality. Metrics are typically calculated over a **30-day window** (configurable via retention policy).

*   **Total Services**: The complete count of tracked microservices and monoliths.
*   **Operational**: Services with healthy uptime and no active issues.
*   **Degraded**: Services experiencing minor issues or warning-level incidents.
*   **Critical**: Services currently down or facing P1/P2 incidents.

> [!NOTE]
> **Noise Reduction**: Active incident counts and status calculations automatically exclude "Snoozed" and "Suppressed" incidents, ensuring you only see actionable problems.

---

## 2. Health & Status Logic

Service health is dynamic and determined in real-time by the severity of active incidents.

| Status | Visual | Trigger Condition | Action Required |
| :--- | :--- | :--- | :--- |
| **Operational** | <span class="text-emerald-600 font-bold border px-1 rounded">Green</span> | **0** active incidents. | None. All systems normal. |
| **Degraded** | <span class="text-amber-600 font-bold border px-1 rounded">Yellow</span> | **1+** active incidents, but **NONE** are Critical (e.g., Low/Medium urgency). | Monitor closely. Ack if necessary. |
| **Critical** | <span class="text-red-600 font-bold border px-1 rounded">Red</span> | **1+** active **Critical (High Urgency)** incident. | **Immediate Action**. PagerDuty/On-Call notified. |

---

## 3. Filters & Discovery

Quickly locate the needle in the haystack with the filter interface.

![Service List and Filters](/service-directory-list.png)

### Search & Sort
*   **Deep Search**: Type to filter by **Service Name** or **Description**.
*   **Team Filtering**: Dropdown to isolate services owned by specific squads (e.g., "Customer Success", "Data & AI").
*   **Smart Sorting**:
    *   `Name (A-Z)`: Directory view.
    *   `Status Health`: Bubbles critical services to the top of the list.
    *   `Most Incidents`: Identifies your "noisiest" services based on incident volume.

---

## 4. Creating & Configuring Services

To add a new service, click **[ + Create ]** in the top right.

### Required Configuration
*   **Service Name**: Must be unique across the organization.
*   **Owner Team**: The specific squad responsible for this service (e.g., "Platform Team").

### Optional Metadata
*   **Description**: Brief summary of the service's role.
*   **Region**: Hosting location (e.g., `us-east-1`, `eu-west-1`). Active incidents will display this region context.
*   **SLA Tier**: Criticality level (`Platinum 99.99%`, `Gold 99.9%`, etc.). Used for reporting and prioritizing fixes.
*   **Escalation Policy**: Determines who gets paged when this service fails.

> [!TIP]
> **Integrations**: After creation, go to **Settings > Integrations** to connect tools like Datadog, Prometheus, or generic Webhooks to automatically trigger incidents.

---

## 5. Service Cards

The list view is designed for scannability. Each card acts as a high-density dashboard.

*   **Status Border**: The left-hand border is color-coded for instant health recognition while scrolling.
*   **Opening State**: Clicking any card shows a "Opening..." loading overlay, providing immediate visual feedback.
*   **Meta Details**: Displays Region, SLA Tier, and specific count of open incidents (e.g., "2 active incidents").
