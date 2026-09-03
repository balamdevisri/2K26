// ─── Status Enums — SINGLE SOURCE OF TRUTH ───────────────────────────────────
// Never redefine these elsewhere in the codebase.

export const REGISTRATION_STATUS = {
  DRAFT: 'DRAFT',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAYMENT_VERIFIED: 'PAYMENT_VERIFIED',
  CONFIRMED: 'CONFIRMED',
  CHECKED_IN: 'CHECKED_IN',
  SUBMITTED: 'SUBMITTED',
  JUDGED: 'JUDGED',
  COMPLETED: 'COMPLETED',
} as const;

export type RegistrationStatus = typeof REGISTRATION_STATUS[keyof typeof REGISTRATION_STATUS];

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  VERIFICATION_FAILED: 'VERIFICATION_FAILED',
  REFUNDED: 'REFUNDED',
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

export const SUBMISSION_STATUS = {
  DRAFT: 'DRAFT',
  FINAL_SUBMITTED: 'FINAL_SUBMITTED',
  LOCKED: 'LOCKED',
  REOPENED: 'REOPENED',
} as const;

export type SubmissionStatus = typeof SUBMISSION_STATUS[keyof typeof SUBMISSION_STATUS];

export const JUDGING_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  SAVED: 'SAVED',
  FINALIZED: 'FINALIZED',
} as const;

export type JudgingStatus = typeof JUDGING_STATUS[keyof typeof JUDGING_STATUS];

export const RESULT_STATUS = {
  DRAFT: 'DRAFT',
  VALIDATED: 'VALIDATED',
  PUBLISHED: 'PUBLISHED',
} as const;

export type ResultStatus = typeof RESULT_STATUS[keyof typeof RESULT_STATUS];

export const TEAM_STATUS = {
  FORMING: 'FORMING',
  READY: 'READY',
  CHECKED_IN: 'CHECKED_IN',
  HACKING: 'HACKING',
  SUBMITTED: 'SUBMITTED',
  JUDGED: 'JUDGED',
  COMPLETED: 'COMPLETED',
} as const;

export type TeamStatus = typeof TEAM_STATUS[keyof typeof TEAM_STATUS];

export const CHECKIN_STATUS = {
  PENDING: 'PENDING',
  PARTIAL: 'PARTIAL',
  COMPLETE: 'COMPLETE',
} as const;

export type CheckInStatus = typeof CHECKIN_STATUS[keyof typeof CHECKIN_STATUS];

export const EVENT_STAGE = {
  REGISTRATION: 'REGISTRATION',
  HACKING: 'HACKING',
  SUBMISSION: 'SUBMISSION',
  JUDGING: 'JUDGING',
  RESULTS: 'RESULTS',
} as const;

export type EventStage = typeof EVENT_STAGE[keyof typeof EVENT_STAGE];

export const USER_ROLE = {
  PARTICIPANT: 'participant',
  ADMIN: 'admin',
  JUDGE: 'judge',
  VOLUNTEER: 'volunteer',
  MENTOR: 'mentor',
} as const;

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export const ANNOUNCEMENT_TYPE = {
  GENERAL: 'GENERAL',
  URGENT: 'URGENT',
  TECHNICAL: 'TECHNICAL',
  REMINDER: 'REMINDER',
  RESULT: 'RESULT',
} as const;

export type AnnouncementType = typeof ANNOUNCEMENT_TYPE[keyof typeof ANNOUNCEMENT_TYPE];

export const PROBLEM_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type ProblemStatus = typeof PROBLEM_STATUS[keyof typeof PROBLEM_STATUS];

export const CHECKIN_METHOD = {
  QR_SCAN: 'QR_SCAN',
  ID_SEARCH: 'ID_SEARCH',
  MANUAL: 'MANUAL',
} as const;

export type CheckInMethod = typeof CHECKIN_METHOD[keyof typeof CHECKIN_METHOD];
