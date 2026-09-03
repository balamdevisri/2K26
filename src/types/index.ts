import type { Timestamp } from 'firebase/firestore';
import type {
  RegistrationStatus,
  PaymentStatus,
  TeamStatus,
  CheckInStatus,
  SubmissionStatus,
  JudgingStatus,
  ResultStatus,
  UserRole,
  AnnouncementType,
  ProblemStatus,
  EventStage,
  CheckInMethod,
} from '../constants/statusEnums';

// ─── User ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean;
  assignedTeams?: string[]; // for judge/mentor
  photoURL?: string;
}

// ─── Registration ─────────────────────────────────────────────────────────────

export interface Registration {
  registrationId: string; // FUZON-2K26-XXXX
  userId: string;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;

  // Personal info
  fullName: string;
  email: string;
  phone: string;
  rollNumber: string;
  college: string;
  department: string;
  yearOfStudy: string;

  // Team
  teamId?: string;
  isTeamLeader: boolean;

  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  confirmedAt?: Timestamp;
  checkedInAt?: Timestamp;

  // Payment
  paymentId?: string;

  // QR — payload contains only registrationId (no PII)
  qrPayload: string;

  // Consent
  termsAccepted: boolean;
  codeOfConductAccepted: boolean;
}

// ─── Payment ─────────────────────────────────────────────────────────────────

export interface Payment {
  paymentId: string;
  registrationId: string;
  userId: string;

  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;

  amount: number; // in paise
  currency: string; // 'INR'

  status: PaymentStatus;
  verifiedAt?: Timestamp;
  failureReason?: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface Team {
  teamId: string; // FUZON-TEAM-XXXX
  teamName: string;
  leaderId: string;
  memberIds: string[];
  registrationIds: string[];

  selectedProblemId?: string;
  selectedTrack?: string;

  status: TeamStatus;
  mentorId?: string;

  isLocked: boolean;
  lockOverrideAdminId?: string;
  lockOverrideReason?: string;

  checkInStatus: CheckInStatus;
  checkedInMemberIds: string[];

  submissionId?: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Problem Statement ────────────────────────────────────────────────────────

export interface ProblemStatement {
  problemId: string;
  title: string;
  description: string;
  track: string;
  requirements: string[];
  constraints: string[];
  status: ProblemStatus;
  isLocked: boolean;
  selectedByTeamIds: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}

// ─── Announcement ─────────────────────────────────────────────────────────────

export interface Announcement {
  announcementId: string;
  title: string;
  message: string;
  type: AnnouncementType;
  priority: number; // 1 (highest) – 5 (lowest)
  audience: 'ALL' | 'PARTICIPANTS' | 'JUDGES' | 'VOLUNTEERS' | 'MENTORS';
  isActive: boolean;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Submission ───────────────────────────────────────────────────────────────

export interface Submission {
  submissionId: string;
  teamId: string;
  problemId: string;
  track: string;

  projectTitle: string;
  description: string;
  techStack: string[];
  repoLink: string;
  demoLink?: string;
  documentLink?: string;

  status: SubmissionStatus;

  submittedAt?: Timestamp;
  lockedAt?: Timestamp;
  reopenedAt?: Timestamp;
  reopenedBy?: string;
  reopenReason?: string;

  teamMemberConfirmations: Record<string, boolean>;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Score ────────────────────────────────────────────────────────────────────

export interface ScoreCriteria {
  innovation: number; // 0–20
  technicalImplementation: number; // 0–25
  problemSolving: number; // 0–20
  uiUx: number; // 0–15
  impactPracticalValue: number; // 0–10
  presentation: number; // 0–10
}

export interface Score {
  scoreId: string;
  teamId: string;
  submissionId: string;
  judgeId: string;

  criteria: ScoreCriteria;
  totalScore: number; // calculated server-side
  comments?: string;

  status: JudgingStatus;

  createdAt: Timestamp;
  updatedAt: Timestamp;
  finalizedAt?: Timestamp;
}

// ─── Result ───────────────────────────────────────────────────────────────────

export interface Result {
  resultId: string;
  teamId: string;

  aggregatedScore: number;
  rank: number;
  scoreBreakdown: Record<string, number>; // judgeId → score
  criteriaAverages: Record<string, number>;

  status: ResultStatus;

  validatedBy?: string;
  publishedBy?: string;
  publishedAt?: Timestamp;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Check-in ─────────────────────────────────────────────────────────────────

export interface CheckIn {
  checkinId: string;
  registrationId: string;
  teamId?: string;
  userId: string;

  method: CheckInMethod;
  checkedInBy: string;
  checkedInAt: Timestamp;
  notes?: string;
}

// ─── Event Config ─────────────────────────────────────────────────────────────

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  type: 'REGISTRATION' | 'HACKING' | 'BREAK' | 'JUDGING' | 'CEREMONY' | 'OTHER';
  day: 1 | 2;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EventConfig {
  eventName: string;
  tagline: string;
  registrationOpen: boolean;
  registrationFeeAmount: number; // in paise
  maxTeamSize: number;
  minTeamSize: number;
  eventStage: EventStage;
  hackathonStartTime?: Timestamp;
  hackathonEndTime?: Timestamp;
  submissionDeadline?: Timestamp;
  venue: string;
  contactEmail: string;
  contactPhone: string;
  judgingCriteria: Record<string, number>;
  tieBreakOrder: string[];
  scheduleItems: ScheduleItem[];
  rulesMarkdown: string;
  faqItems: FAQItem[];
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole | null;
  photoURL?: string | null;
}
