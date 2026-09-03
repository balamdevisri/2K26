
function ComingSoon({ title }: { title: string }) {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
        {title}
      </h1>
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 'var(--space-4)' }}>🚧</div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}>Coming in Phase 1</p>
        <p style={{ fontSize: 'var(--text-sm)' }}>This section is being built as part of the P1 implementation phase.</p>
      </div>
    </div>
  );
}

export const AdminParticipantsPage = () => <ComingSoon title="Participants" />;
export const AdminTeamsPage = () => <ComingSoon title="Teams" />;
export const AdminPaymentsPage = () => <ComingSoon title="Payments" />;
export const AdminCheckinsPage = () => <ComingSoon title="Check-ins" />;
export const AdminProblemsPage = () => <ComingSoon title="Problem Statements" />;
export const AdminAnnouncementsPage = () => <ComingSoon title="Announcements" />;
export const AdminSubmissionsPage = () => <ComingSoon title="Submissions" />;
export const AdminJudgesPage = () => <ComingSoon title="Judges" />;
export const AdminScoresPage = () => <ComingSoon title="Scores" />;
export const AdminResultsPage = () => <ComingSoon title="Results" />;
export const AdminExportsPage = () => <ComingSoon title="Exports & Backup" />;
export const AdminSettingsPage = () => <ComingSoon title="Event Settings" />;

// Participant sub-pages
export const TeamPage = () => <ComingSoon title="My Team" />;
export const AnnouncementsPage = () => <ComingSoon title="Announcements" />;
export const CheckinPage = () => <ComingSoon title="Check-in" />;
export const SubmissionPage = () => <ComingSoon title="Submission" />;
export const ResultPage = () => <ComingSoon title="My Results" />;

// Judge pages
export const JudgeDashboard = () => <ComingSoon title="Judge Dashboard" />;
export const JudgeTeamsPage = () => <ComingSoon title="My Assigned Teams" />;
export const SubmissionViewPage = () => <ComingSoon title="View Submission" />;
export const ScoreEntryPage = () => <ComingSoon title="Score Entry" />;

// Volunteer pages
export const VolunteerDashboard = () => <ComingSoon title="Volunteer Portal" />;
export const VolunteerCheckinPage = () => <ComingSoon title="Check-in Scanner" />;

// Mentor pages
export const MentorDashboard = () => <ComingSoon title="Mentor Dashboard" />;
export const MentorTeamsPage = () => <ComingSoon title="My Teams" />;
