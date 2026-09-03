// ─── Application Routes — single source of truth ────────────────────────────

export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  RULES: '/rules',
  PROBLEMS: '/problems',
  SCHEDULE: '/schedule',
  FAQ: '/faq',
  CONTACT: '/contact',
  RESULTS: '/results',

  // Auth
  LOGIN: '/login',

  // Registration & Payment
  REGISTER: '/register',
  PAYMENT: '/payment',
  CONFIRMATION: '/confirmation',

  // Participant dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_TEAM: '/dashboard/team',
  DASHBOARD_ANNOUNCEMENTS: '/dashboard/announcements',
  DASHBOARD_CHECKIN: '/dashboard/checkin',
  DASHBOARD_SUBMISSION: '/dashboard/submission',
  DASHBOARD_RESULT: '/dashboard/result',

  // Admin
  ADMIN: '/admin',
  ADMIN_PARTICIPANTS: '/admin/participants',
  ADMIN_TEAMS: '/admin/teams',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_CHECKINS: '/admin/checkins',
  ADMIN_PROBLEMS: '/admin/problems',
  ADMIN_ANNOUNCEMENTS: '/admin/announcements',
  ADMIN_SUBMISSIONS: '/admin/submissions',
  ADMIN_JUDGES: '/admin/judges',
  ADMIN_SCORES: '/admin/scores',
  ADMIN_RESULTS: '/admin/results',
  ADMIN_EXPORTS: '/admin/exports',
  ADMIN_SETTINGS: '/admin/settings',

  // Judge
  JUDGE: '/judge',
  JUDGE_TEAMS: '/judge/teams',
  JUDGE_SUBMISSION: '/judge/submissions/:teamId',
  JUDGE_SCORES: '/judge/scores/:teamId',

  // Volunteer
  VOLUNTEER: '/volunteer',
  VOLUNTEER_CHECKIN: '/volunteer/checkin',

  // Mentor
  MENTOR: '/mentor',
  MENTOR_TEAMS: '/mentor/teams',

  // Misc
  NOT_FOUND: '*',
} as const;
