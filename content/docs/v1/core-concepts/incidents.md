---
order: 3
title: Incident Management
description: Master the Incident List, Bulk Actions, and SLAs.
---

# Incident Management

The **Incident List** is the tactical workspace for responders.

### Why is this needed?
Alerts are typically noisy and raw; Incidents represent the actual "Work" to be done. This page turns chaotic noise into a structured queue. It ensures nothing slips through the cracks by enforcing **Assignment** (Who is fixing it?) and **SLAs** (When must it be fixed?).

![Incident List Interface](/incident-list-v2.png)

## 1. The Interface at a Glance

Each row in the incident list is packed with real-time operational data.

### Visual State Indicators
*   **Status Borders**: The left border color-codes the state at a glance:
    *   <span class="text-red-500 font-bold">Red</span>: **Open** (Needs attention)
    *   <span class="text-amber-500 font-bold">Amber</span>: **Acknowledged** (Someone is working on it)
    *   <span class="text-emerald-500 font-bold">Green</span>: **Resolved** (Fixed)
    *   <span class="text-slate-400 font-bold">Grey</span>: **Snoozed / Suppressed** (Hidden)
*   **SLA Countdowns**: Two distinct SLAs are tracked:
    *   **Time to Ack**: How long until someone *must* look at it.
    *   **Time to Resolve**: How long until the issue *must* be fixed.
    *   *Visuals*: Shows "20m left" (Warning) or "Breached" (Critical) badges inline.

### Navigation & Interaction
*   **Keyboard Navigation**: Use `Up` / `Down` arrows to highlight rows, and `Enter` or `Space` to open details.
*   **Quick Preview**: Clicking a row shows an "Opening..." spinner overlay while pre-fetching data.

---

## 2. Filters & Deep Search

The filter bar allows for complex querying of the incident database.

*   **Deep Search**: Queries against `Title`, `Description`, and `Incident ID` (e.g., `#5A261`).
*   **Context Filters**:
    *   **Mine / My Teams**: Quickly toggle between your personal queue and your squad's workload.
    *   **UrgencyChips**: Filter by specific `High`, `Medium`, or `Low` urgency levels.
*   **URL Addressable**: Every filter state is reflected in the URL.
    *   *Example*: `?urgency=HIGH&status=OPEN&sort=priority`
    *   *Pro Tip*: Bookmark your team's specific view for distinct dashboards.

---

## 3. Bulk Actions & Triage

Manage "Alert Storms" effectively with the sticky command bar.

![Bulk Actions Bar](/bulk-actions.png)

### Selection Logic
*   **Range Select**: Click one checkbox, then `Shift + Click` another to select the entire range.
*   **Smart Hints**: The bar analyzes your selection and displays hints like *"Selected contains SUPPRESSED"* if you've accidentally grabbed hidden items.

### Command Reference

| Action | Description |
| :--- | :--- |
| **Acknowledge** | Mark as seen. Stops escalation notifications. |
| **Resolve** | Close the incident. |
| **Reassign** | Transfer ownership to a **User** OR a **Team**. |
| **Snooze** | Hide for a duration (15m, 30m, 1h, 4h, 8h, 24h). |
| **Priority** | Mass-update severity (P1 - P5). |
| **Urgency** | Update urgency classification (High/Medium/Low). |
| **Status** | Force a specific status update. |

### Advanced Actions ("More" Menu)
*   **Unsnooze**: Bring snoozed items back to the active queue immediately.
*   **Suppress**: Mark as noise/false alarm (hides from default view without resolving).
*   **Unsuppress**: Restore suppressed items.
*   **Unacknowledge**: Revert an incident from Acknowledged back to Open (useful if accidental).

---

## 4. Inline Management

You don't always need to open the full details page.

*   **Quick Reassign**: Click the assignee avatar in the list to open a search popover. You can assign to:
    *   **Specific Users** (Search by name/email)
    *   **Entire Teams** (Search by team name)
*   **Status Toggles**: Use the "meatball" menu (`...`) on the right of any row to quickly **Resolve**, **Snooze**, or **Ack** that single item.

    ![Incident Actions Menu](/incident-actions-menu.png)
