import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { ROUTES } from './constants/routes';
import { USER_ROLE } from './constants/statusEnums';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { RulesPage } from './pages/public/RulesPage';
import { ProblemsPage } from './pages/public/ProblemsPage';
import { SchedulePage } from './pages/public/SchedulePage';
import { FAQPage } from './pages/public/FAQPage';
import { ContactPage } from './pages/public/ContactPage';
import { ResultsPage } from './pages/public/ResultsPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Auth pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Payment pages
import { PaymentPage } from './pages/payment/PaymentPage';
import { ConfirmationPage } from './pages/payment/ConfirmationPage';

// Participant pages
import { DashboardPage } from './pages/participant/DashboardPage';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Participant sub-pages
import { TeamPage } from './pages/participant/TeamPage';
import { AnnouncementsPage } from './pages/participant/AnnouncementsPage';
import { CheckinPage } from './pages/participant/CheckinPage';
import { SubmissionPage } from './pages/participant/SubmissionPage';
import { ResultPage } from './pages/participant/ResultPage';

// Volunteer pages
import { VolunteerCheckinPage, VolunteerDashboard } from './pages/volunteer/CheckinPage';

// Judge pages
import { JudgeDashboard, JudgeTeamsPage, SubmissionViewPage, ScoreEntryPage } from './pages/judge/JudgeDashboard';

// Admin modules
import { AdminParticipantsPage } from './pages/admin/ParticipantsPage';
import { AdminTeamsPage } from './pages/admin/TeamsPage';
import { AdminPaymentsPage, AdminCheckinsPage } from './pages/admin/PaymentsPage';
import { AdminAnnouncementsPage, AdminProblemsPage } from './pages/admin/AnnouncementsPage';
import {
  AdminResultsPage, AdminExportsPage, AdminSettingsPage,
  AdminSubmissionsPage, AdminJudgesPage, AdminScoresPage
} from './pages/admin/ResultsPage';

// Mentor placeholder pages
import { MentorDashboard, MentorTeamsPage } from './pages/PlaceholderPages';

// CSS imports
import './index.css';
import './styles/page-hero.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Public routes ── */}
          <Route element={<PublicLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.RULES} element={<RulesPage />} />
            <Route path={ROUTES.PROBLEMS} element={<ProblemsPage />} />
            <Route path={ROUTES.SCHEDULE} element={<SchedulePage />} />
            <Route path={ROUTES.FAQ} element={<FAQPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
          </Route>

          {/* ── Auth routes (no layout wrapper needed) ── */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.PAYMENT} element={<PaymentPage />} />
          <Route path={ROUTES.CONFIRMATION} element={<ConfirmationPage />} />

          {/* ── Participant dashboard ── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.PARTICIPANT]}>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DASHBOARD_TEAM}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.PARTICIPANT]}>
                <DashboardLayout>
                  <TeamPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DASHBOARD_ANNOUNCEMENTS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.PARTICIPANT]}>
                <DashboardLayout>
                  <AnnouncementsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DASHBOARD_CHECKIN}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.PARTICIPANT]}>
                <DashboardLayout>
                  <CheckinPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DASHBOARD_SUBMISSION}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.PARTICIPANT]}>
                <DashboardLayout>
                  <SubmissionPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DASHBOARD_RESULT}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.PARTICIPANT]}>
                <DashboardLayout>
                  <ResultPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* ── Admin routes ── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.ADMIN]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="participants" element={<AdminParticipantsPage />} />
            <Route path="teams" element={<AdminTeamsPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="checkins" element={<AdminCheckinsPage />} />
            <Route path="problems" element={<AdminProblemsPage />} />
            <Route path="announcements" element={<AdminAnnouncementsPage />} />
            <Route path="submissions" element={<AdminSubmissionsPage />} />
            <Route path="judges" element={<AdminJudgesPage />} />
            <Route path="scores" element={<AdminScoresPage />} />
            <Route path="results" element={<AdminResultsPage />} />
            <Route path="exports" element={<AdminExportsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* ── Judge routes ── */}
          <Route
            path="/judge"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.JUDGE]}>
                <JudgeDashboard />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.JUDGE_TEAMS} element={<ProtectedRoute allowedRoles={[USER_ROLE.JUDGE]}><JudgeTeamsPage /></ProtectedRoute>} />
          <Route path={ROUTES.JUDGE_SUBMISSION} element={<ProtectedRoute allowedRoles={[USER_ROLE.JUDGE]}><SubmissionViewPage /></ProtectedRoute>} />
          <Route path={ROUTES.JUDGE_SCORES} element={<ProtectedRoute allowedRoles={[USER_ROLE.JUDGE]}><ScoreEntryPage /></ProtectedRoute>} />

          {/* ── Volunteer routes ── */}
          <Route
            path="/volunteer"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.VOLUNTEER]}>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.VOLUNTEER_CHECKIN} element={<ProtectedRoute allowedRoles={[USER_ROLE.VOLUNTEER]}><VolunteerCheckinPage /></ProtectedRoute>} />

          {/* ── Mentor routes ── */}
          <Route
            path="/mentor"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLE.MENTOR]}>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.MENTOR_TEAMS} element={<ProtectedRoute allowedRoles={[USER_ROLE.MENTOR]}><MentorTeamsPage /></ProtectedRoute>} />

          {/* ── 404 ── */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
