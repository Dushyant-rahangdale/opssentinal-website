---
order: 2
title: Notifications
description: Configure Email, SMS, Push, WhatsApp, and Slack notification channels
---

# Notification Configuration

Notifications are the lifeblood of incident management. Without reliable notifications, incidents go unnoticed and response times suffer. This guide covers setting up all six notification channels supported by OpsKnight.

<!-- placeholder:notifications-overview -->
<!-- Add: Screenshot of the Notifications settings page showing all providers -->

---

## Why Multiple Channels Matter

Different situations call for different notification methods:

| Scenario | Best Channel | Why |
|----------|--------------|-----|
| Normal alerts | Email, Slack | Non-intrusive, async |
| Critical incidents | SMS, Push | Immediate attention |
| On-call escalation | SMS + Push | Can't be missed |
| Team coordination | Slack | Interactive, threaded |
| International teams | WhatsApp | Global reach |
| Automated systems | Webhooks | Integration with other tools |

**Recommendation**: Configure at least **Email + Slack** for basic coverage, add **SMS** for critical alerts.

---

## Notification Channels Overview

| Channel | Provider Options | Best For |
|---------|------------------|----------|
| **Email** | SMTP, SendGrid, AWS SES, Resend | All users, reliable delivery |
| **SMS** | Twilio, AWS SNS | Critical alerts, on-call |
| **Push** | Firebase (FCM), OneSignal | Mobile/PWA users |
| **Slack** | Slack OAuth | Team collaboration |
| **WhatsApp** | Twilio | International teams |
| **Webhooks** | Any HTTP endpoint | Custom integrations |

---

## Email Configuration

Email is the most universal notification channel — every user has an email address.

### Provider Options

| Provider | Pros | Cons |
|----------|------|------|
| **SMTP** | Universal, self-hosted | May hit spam filters |
| **SendGrid** | High deliverability | Cost at scale |
| **AWS SES** | Low cost, scalable | AWS account required |
| **Resend** | Developer-friendly | Newer service |

### SMTP Configuration

For Gmail, Microsoft 365, or any SMTP server:

1. Go to **Settings** → **Notifications** → **Email**
2. Select **SMTP** provider
3. Enter credentials:

| Field | Example | Notes |
|-------|---------|-------|
| **SMTP Host** | `smtp.gmail.com` | Your mail server |
| **SMTP Port** | `587` | Usually 587 (TLS) or 465 (SSL) |
| **Username** | `alerts@yourco.com` | Email account |
| **Password** | `••••••••` | App password recommended |
| **From Address** | `noreply@yourco.com` | Sender address |
| **From Name** | `OpsKnight Alerts` | Display name |

4. Click **Test Connection** to verify
5. Click **Save**

<!-- placeholder:smtp-config -->
<!-- Add: Screenshot of SMTP configuration form -->

#### Gmail Setup Notes

For Gmail/Google Workspace:
1. Enable "Less secure app access" OR
2. Create an **App Password** (recommended):
   - Go to Google Account → Security → App Passwords
   - Generate password for "Mail"
   - Use this as the SMTP password

### SendGrid Configuration

1. Create a SendGrid account at sendgrid.com
2. Go to Settings → API Keys → Create API Key
3. In OpsKnight:
   - Select **SendGrid** provider
   - Enter your API key
   - Set From Address (must be verified in SendGrid)
4. Test and save

### AWS SES Configuration

1. Set up AWS SES in your AWS account
2. Verify your sending domain
3. In OpsKnight:
   - Select **AWS SES** provider
   - Enter AWS credentials (Access Key, Secret Key)
   - Set Region (e.g., `us-east-1`)
   - Set From Address (must be verified)
4. Test and save

### Resend Configuration

1. Create a Resend account at resend.com
2. Generate an API key
3. In OpsKnight:
   - Select **Resend** provider
   - Enter your API key
   - Set From Address
4. Test and save

---

## SMS Configuration

SMS cuts through the noise — it's the best way to reach on-call responders for critical incidents.

### Twilio Setup

Twilio is the most popular option for SMS:

1. **Create Twilio Account**
   - Sign up at twilio.com
   - Note your Account SID and Auth Token

2. **Get a Phone Number**
   - Buy a phone number with SMS capability
   - Format: `+1234567890`

3. **Configure in OpsKnight**
   - Go to **Settings** → **Notifications** → **SMS**
   - Select **Twilio** provider
   - Enter credentials:

| Field | Description |
|-------|-------------|
| **Account SID** | From Twilio Console |
| **Auth Token** | From Twilio Console |
| **Phone Number** | Your Twilio number (+1...) |

4. **Test** by sending a test SMS
5. **Save** configuration

<!-- placeholder:twilio-config -->
<!-- Add: Screenshot of Twilio configuration form -->

### AWS SNS Setup

For high-volume SMS or if you're already on AWS:

1. **Set Up AWS SNS**
   - Enable SMS in AWS SNS console
   - Request production access for higher limits

2. **Configure in OpsKnight**
   - Select **AWS SNS** provider
   - Enter credentials:

| Field | Description |
|-------|-------------|
| **AWS Region** | e.g., `us-east-1` |
| **Access Key ID** | IAM user access key |
| **Secret Access Key** | IAM user secret key |

3. **Test** and **Save**

### User Phone Numbers

Users must add and verify their phone numbers:

1. User goes to **Profile** → **Contact Info**
2. Enters phone number (with country code)
3. Clicks **Verify**
4. Enters SMS verification code
5. Phone number is now active for SMS

> **Note**: Users can enable/disable SMS notifications in their preferences.

---

## Push Notifications

Push notifications reach users on their mobile devices via the OpsKnight PWA.

### Firebase Cloud Messaging (FCM)

1. **Create Firebase Project**
   - Go to Firebase Console
   - Create a new project or use existing

2. **Get Server Credentials**
   - Go to Project Settings → Cloud Messaging
   - Note the Server Key and Sender ID

3. **Configure in OpsKnight**
   - Go to **Settings** → **Notifications** → **Push**
   - Select **Firebase** provider
   - Enter credentials:

| Field | Description |
|-------|-------------|
| **Server Key** | From Firebase Console |
| **Sender ID** | From Firebase Console |

4. **Test** and **Save**

### OneSignal Setup

Alternative to Firebase with additional features:

1. **Create OneSignal Account**
   - Sign up at onesignal.com
   - Create a new app

2. **Get Credentials**
   - App ID and REST API Key from Settings

3. **Configure in OpsKnight**
   - Select **OneSignal** provider
   - Enter App ID and REST API Key
   - Test and Save

### User Device Registration

For push notifications to work, users must:

1. **Open OpsKnight PWA** in their mobile browser
2. **Accept notification permission** when prompted
3. **Device is automatically registered**

Users can manage devices in **Profile** → **Devices**.

---

## WhatsApp Configuration

WhatsApp is useful for international teams where SMS may be unreliable or expensive.

### Twilio WhatsApp Setup

WhatsApp uses Twilio's WhatsApp Business API:

1. **Enable WhatsApp in Twilio**
   - Go to Twilio Console → Messaging → WhatsApp
   - Complete WhatsApp Business onboarding

2. **Get WhatsApp Number**
   - Use your existing Twilio number OR
   - Request a dedicated WhatsApp number

3. **Configure in OpsKnight**
   - Use the same Twilio credentials as SMS
   - Enable WhatsApp channel
   - Enter WhatsApp-enabled phone number

4. **Test** and **Save**

### WhatsApp User Setup

Users must:
1. Add their WhatsApp number to their profile
2. Opt-in by sending a message to the OpsKnight WhatsApp number
3. Receive confirmation

---

## Slack Integration

Slack provides rich, interactive notifications with buttons for quick actions.

### Why Slack is Recommended

- **Interactive buttons** — Acknowledge/Resolve without leaving Slack
- **Thread updates** — Timeline events in threads
- **Channel routing** — Different channels for different services
- **Team visibility** — Everyone sees incident activity

### Setup

Full setup guide: [Slack OAuth Setup](../integrations/slack-oauth-setup.md)

Quick overview:
1. Go to **Settings** → **Integrations** → **Slack**
2. Click **Connect to Slack**
3. Authorize OpsKnight in your workspace
4. Select default notification channel
5. Done!

### Per-Service Channels

You can route different services to different Slack channels:

1. Edit a service
2. Set **Slack Channel** to the desired channel
3. Alerts for that service go to that channel

---

## Webhooks (Custom)

Send notifications to any HTTP endpoint for custom integrations.

### Configuration

1. Go to **Settings** → **Notifications** → **Webhooks**
2. Click **Add Webhook**
3. Configure:

| Field | Description |
|-------|-------------|
| **URL** | Your webhook endpoint |
| **Secret** | For HMAC signature verification |
| **Events** | Which events trigger the webhook |

### Webhook Payload

```json
{
  "event": "incident.triggered",
  "incident": {
    "id": "inc_abc123",
    "title": "High CPU on web-01",
    "status": "OPEN",
    "urgency": "HIGH",
    "service": "Payment API"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Signature Verification

OpsKnight signs webhooks with HMAC-SHA256:

```
X-OpsKnight-Signature: sha256=abc123...
```

Verify by computing HMAC of request body with your secret.

---

## Notification Preferences

### User-Level Preferences

Each user controls their notification preferences:

**Settings** → **Profile** → **Notifications**

| Setting | Description |
|---------|-------------|
| **Email notifications** | Enable/disable email |
| **SMS notifications** | Enable/disable SMS |
| **Push notifications** | Enable/disable push |
| **WhatsApp notifications** | Enable/disable WhatsApp |
| **Quiet hours** | Do not disturb window |
| **Digest level** | ALL, HIGH only, or NONE |

### Quiet Hours

Users can set quiet hours to avoid notifications during sleep:

- **Start time**: e.g., 10pm
- **End time**: e.g., 7am
- **Override for HIGH urgency**: Still notify for critical

### Service-Level Settings

Per-service notification settings:

| Setting | Default | Description |
|---------|---------|-------------|
| **Notify on trigger** | Yes | When incident created |
| **Notify on acknowledge** | Yes | When someone acks |
| **Notify on resolve** | Yes | When incident resolved |
| **Notify on SLA breach** | Yes | When SLA exceeded |

---

## Notification Delivery Tracking

OpsKnight tracks delivery status for all notifications:

| Status | Meaning |
|--------|---------|
| **PENDING** | Queued for delivery |
| **SENT** | Sent to provider |
| **DELIVERED** | Confirmed delivery (where supported) |
| **FAILED** | Delivery failed |

### Viewing Delivery Status

1. Open an incident
2. Check the **Timeline** for notification events
3. See delivery status for each notification

### Troubleshooting Failed Notifications

1. Check **System Logs** for error details
2. Verify provider credentials
3. Check user has valid contact info
4. Verify user has channel enabled
5. Check for rate limits

---

## Best Practices

### Channel Selection

| Urgency | Recommended Channels |
|---------|---------------------|
| **HIGH** | SMS + Push + Slack |
| **MEDIUM** | Email + Slack |
| **LOW** | Email only |

### Reduce Alert Fatigue

- Use **quiet hours** for off-duty users
- Set **digest level** to HIGH for non-critical channels
- Use **Slack threads** instead of channel spam
- Configure **deduplication** to prevent flood

### Testing

- **Test each provider** after configuration
- **Test as different users** to verify routing
- **Verify phone numbers** before relying on SMS
- **Check spam folders** for email delivery

### Redundancy

- Configure **multiple channels** for critical services
- SMS should always be a backup for on-call
- Don't rely solely on email (can be delayed)

---

## Troubleshooting

### Email Not Arriving

1. Check spam/junk folder
2. Verify SMTP credentials
3. Check if From Address is verified (SES, SendGrid)
4. Test with "Send Test Email"
5. Check system logs for errors

### SMS Not Received

1. Verify phone number format (+1234567890)
2. Check Twilio console for delivery status
3. Verify user has SMS enabled
4. Check Twilio account balance
5. Verify phone number can receive SMS

### Push Not Working

1. User must accept notification permission
2. Check device is registered in Profile → Devices
3. Verify FCM/OneSignal credentials
4. Check service worker is installed (PWA)

### Slack Not Posting

1. Verify OAuth connection is active
2. Check bot has access to channel
3. Re-authorize if permissions changed
4. Check Slack channel exists

---

## Related Topics

- [Slack Integration](../integrations/slack.md) — Full Slack setup
- [User Management](../core-concepts/users.md) — User notification preferences
- [Escalation Policies](../core-concepts/escalation-policies.md) — Channel routing
