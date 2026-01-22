---
order: 1
title: Dashboard
description: Technical breakdown of the Command Center capabilities and logic.
---

# Command Center Dashboard

The **Command Center** provides the high-level executive summary of your organization's health.

### Why is this needed?
While the *Incident List* focuses on fighting individual fires, the *Dashboard* reveals the "Forest Fire." It aggregates data across all teams to reveal **Systemic Risks** (e.g., "Are we having more incidents than usual?") and **Workload Bottlenecks** that are invisible when looking at single tickets.

![OpsKnight Command Center](/command-center.png)

## 1. System Status Logic

The "System Status" badge in the top-left isn't just a label; it's a computed state driven by active incident urgency.

| Status | Trigger Condition |
| :--- | :--- |
| **CRITICAL** | Any active **HIGH** urgency incident exists. |
| **DEGRADED** | No High urgency, but active **MEDIUM** or **LOW** incidents exist. |
| **OPERATIONAL** | No active incidents found. |

> **Tech Note:** The status is re-evaluated in real-time. Resolving the last P1 incident immediately downgrades status from `CRITICAL` to `DEGRADED` or `OPERATIONAL`.

## 2. AI Smart Insights

The dashboard runs a rules engine against your live incident data to surface "Smart Insights". These appear as colored banners below the metrics.

### Detection Rules

*   **Workload Risk** (Yellow Banner)
    *   **Logic:** `Unassigned Incidents / Total Open Incidents > 30%`
    *   **Action:** Warns that too many issues are sitting in queue without an owner.

*   **Critical Spike** (Red/Yellow Banner)
    *   **Logic:** `Active HIGH Urgency Incidents >= 3`
    *   **Action:** Signals a potential "Major Outage" or complex failure scenario involving multiple systems.

*   **Root Cause Hint / Concentration** (Blue Banner)
    *   **Logic:** A single service accounts for `>= 40%` of all active incidents (minimum 3).
    *   **Action:** Suggests that a dependent service is failing (e.g., "40% of alerts are from 'API Gateway'").

*   **Volume Anomaly** (Blue Banner)
    *   **Logic:** Today's incident count > `1.5x` the 30-day daily average.
    *   **Action:** Highlights unusual noise or "death by 1000 cuts" scenarios that don't trigger individual critical alerts.

## 3. Metrics & Retention

The four hero cards provide immediate quantification of the current state.

*   **TOTAL**: Count of all incidents created within the selected `Range` (default: 30 days).
*   **OPEN**: Strictly counts incidents with status `OPEN`. Acknowledged or Snoozed items are excluded from this specific "To-Do" pile (check "Active" for the full list).
*   **UNASSIGNED**:
    *   **Scope**: By default, this looks at **ALL TIME** data, not just the selected range. This ensures a ticket from 2 months ago doesn't disappear just because your filter is set to "Last 7 Days".
    *   **Retention Warning**: If your system has a retention limit (e.g., 30 days) and you request "Last 90 Days", a `Retention Limit` warning badge will appear to indicate data clipping.

## 4. Operational Widgets

*   **Ops Pulse**: A unified feed showing assignments ("My Queue"), prioritized "Critical Focus" items, and "Services at Risk".
*   **Heatmap**: Visualizes incident density over the last 365 days to identify seasonal patterns or "bad deployment days".
*   **Auto-Refresh**: The dashboard supports a "Kiosk Mode" via the `Auto ON` toggle, which refreshes data every 60 seconds (default) without user intervention.
