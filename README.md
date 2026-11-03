# ABHAYATRA 🛡️

**अभयात्रा — Every journey deserves confidence.**

ABHAYATRA is an AI-powered personal journey safety companion. It helps people prepare for and monitor journeys through trusted-contact sharing, trip check-ins, vehicle-detail records, emergency workflows, and explainable AI-assisted safety insights. The name is inspired by the Sanskrit words *abhaya* (fearlessness) and *yātrā* (journey).

> **Important:** ABHAYATRA is an independent safety companion, not an emergency service or a government vehicle-verification system. It cannot guarantee personal safety. In an emergency in India, contact emergency services (112) directly. Do not rely on this application as the only way to request help.

## Product goals

- Make it easy to create a journey plan and share it with trusted contacts.
- Support explicit trip check-ins and clear journey status.
- Let users record and review vehicle and driver details without claiming official verification.
- Provide an SOS workflow that prepares an alert with the user's consent and shares the latest available location with selected contacts.
- Offer explainable, advisory AI insights based on disclosed journey signals.
- Minimize collection and retention of sensitive location and identity data.

## Planned features

### Account and trusted contacts
- Secure sign-up/sign-in.
- User-managed trusted contacts.
- Consent and privacy controls.

### Journey management
- Start, pause, complete, and cancel a journey.
- Origin, destination, planned route, and expected arrival time.
- Periodic check-ins and overdue-arrival reminders.
- Optional live location sharing, clearly visible and user-controlled.

### Vehicle information
- Record registration number, vehicle type, colour, and driver-provided details.
- Review and confirm details before starting a trip.
- Clearly distinguish user-entered information from independently verified information.

### Emergency assistance
- Prominent SOS action with a confirmation/cancel flow designed to reduce accidental activation.
- Share a concise emergency message and latest available location with selected trusted contacts.
- Display India's emergency number **112** and make clear that contacting emergency services may require a separate phone action.
- Never represent a notification as delivered unless delivery is confirmed by the service.

### AI safety intelligence
- Explainable advisory risk indicators based on transparent signals such as route deviation, missed check-ins, or an overdue journey.
- Context-aware safety suggestions.
- AI-generated summaries that identify their inputs and uncertainty.
- No facial recognition, emotion inference, or unsupported claims that a person, driver, or location is dangerous.
- AI must never delay or gate an SOS action.

## Proposed technology

| Layer | Planned technology |
| --- | --- |
| Frontend | React, TypeScript, Tailwind CSS |
| Backend | Java, Spring Boot |
| Database and authentication | Supabase (PostgreSQL and Auth) |
| Maps | OpenStreetMap-compatible mapping |
| AI | Gemini API where an eligible free tier is available; deterministic fallback for core safety logic |
| Deployment | Vercel (frontend) and Render (backend), subject to current free-tier limits |

The stack is a proposal and will be confirmed against the actual implementation before deployment. Third-party free tiers, quotas, and terms can change.

## Privacy and safety principles

- Collect only data required for a user-requested feature.
- Ask for explicit permission before accessing or sharing location.
- Make location sharing visible, revocable, and time-limited.
- Do not expose precise location in public pages, logs, analytics, or AI prompts unnecessarily.
- Keep API keys and service credentials on the server; never commit secrets.
- Use access controls so users can access only their own journeys and contacts.
- Treat AI output as advisory and show the reasons behind each indicator.
- Provide deletion and retention controls for sensitive journey data.
- Test emergency flows carefully; use clearly labelled demo mode during development.

## Development roadmap

1. **Foundation:** responsive UI, project structure, configuration, and documentation.
2. **Identity:** authentication, profile, and trusted-contact management.
3. **Journeys:** create/manage trips, check-ins, and map display.
4. **Safety workflows:** consent-based location sharing and SOS alert integration.
5. **AI layer:** explainable risk signals and safety assistant with safe fallbacks.
6. **Hardening:** authorization tests, privacy review, accessibility, monitoring, and deployment.

## Local development

Setup instructions will be added after the frontend and backend scaffolds are committed. Never put real API keys in source control. Use environment variables and provide only placeholder values in example files.

## Current implementation

The first frontend milestone includes:
- Responsive dashboard and mobile navigation.
- Create journey plans with origin, destination, departure time, optional contact details, and notes.
- Save journey plans in browser local storage and reload them on the same browser profile.
- Start, check in, complete, cancel, and remove saved journey plans.
- Safety guidance and a clearly labelled emergency call shortcut for India (112).

This is a **local frontend prototype**. It does not yet provide accounts, cloud synchronization, real-time GPS tracking, trusted-contact messaging, automatic SOS delivery, route-risk analysis, or a live AI assistant. Local browser storage is not a secure vault; avoid entering sensitive personal information or using the prototype on a shared device. Features are not production-ready until implemented, tested, and deployed. Do not use a development build as an emergency service.

## Contributing

Issues and suggestions are welcome. Please do not submit real people's personal information, phone numbers, registration documents, or precise location histories in issues or pull requests.

## License

No license has been selected yet. Until a license is added, standard copyright applies and reuse is not automatically permitted.
