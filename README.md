# FUZON 2K26 — Digital Event & Hackathon Management Platform

> **FUZON 2K26** — Two-Day Mini Hackathon  
> Department of Computer Science & Engineering (CSE)  
> Sri Krishnadevaraya University College of Engineering and Technology (SKUCET), Ananthapuramu  

---

## ⚡ Overview

FUZON 2K26 is an end-to-end digital operations platform powering university-level hackathon logistics, participant registrations, team formation, secure payment processing, gate QR check-in, real-time broadcasts, project submission locking, criteria-based judging, and result publishing.

```
Website → Registration → Payment → Verification → Registration ID → Team Formation → Check-in → Hackathon → Announcements → Submission → Judging → Score Validation → Results → Certificates/Reporting
```

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Custom CSS Design System (Cosmic Dark Tech theme with Space Grotesk & Inter typography)
- **Routing:** React Router v7 with role-aware route protection
- **Authentication:** Firebase Authentication (Role claims: `participant`, `admin`, `judge`, `volunteer`, `mentor`)
- **Database & Security:** Cloud Firestore + Granular `firestore.rules`
- **Payments:** Razorpay integration with server-side signature verification workflow
- **QR Operations:** SVG QR generation with zero PII exposure

---

## 📁 Project Structure

```
├── firestore.rules          # Security rules for all 10 collections
├── firebase.json            # Firebase hosting and SPA rewrite config
├── .env.example             # Template for Firebase & Razorpay public keys
├── src/
│   ├── components/          # Reusable UI & Layout components
│   │   ├── layout/          # PublicLayout, DashboardLayout, AdminLayout
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ErrorBoundary.tsx
│   ├── constants/           # Single source of truth
│   │   ├── routes.ts        # Canonical route constants
│   │   ├── statusEnums.ts   # Status lifecycle enums
│   │   └── judgingCriteria.ts # 6 weighted criteria (Total: 100%)
│   ├── features/
│   │   └── auth/            # AuthContext, ProtectedRoute
│   ├── pages/
│   │   ├── public/          # Home, About, Rules, Problems, Schedule, FAQ, Contact, Results
│   │   ├── auth/            # Login, Multi-step Register
│   │   ├── payment/         # Razorpay checkout, Confirmation & QR Pass
│   │   ├── participant/     # Dashboard, Team, Announcements, Checkin, Submission, Result
│   │   ├── volunteer/       # QR Scan & ID Gate Check-in
│   │   ├── judge/           # Evaluation Matrix & Scoring Console
│   │   └── admin/           # Metrics, Participants, Teams, Payments, Announcements, Results Engine
│   ├── services/
│   │   └── firebase.ts      # Firebase SDK initialization
│   ├── styles/              # Global variables, typography, and layout CSS
│   └── types/               # TypeScript interfaces for all Firestore models
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Firebase and Razorpay credentials:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🔒 Security Principles

1. **Untrusted Client Boundary:** All privileged mutations are validated server-side.
2. **Zero PII in QR Codes:** QR codes encode solely the non-sensitive Registration ID (`FUZON-2K26-XXXX`).
3. **Immutability Safeguards:** Problem statements and team rosters lock once the hackathon starts; submissions lock after final submit.
4. **Environment Isolation:** Secrets are kept strictly in environment variables and are excluded from version control via `.gitignore`.
