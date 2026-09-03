import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { UserRole } from '../../constants/statusEnums';
import { ROUTES } from '../../constants/routes';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = ROUTES.LOGIN,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="spinner spinner-lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    // Redirect to correct dashboard based on role
    const roleDashboards: Record<string, string> = {
      admin: ROUTES.ADMIN,
      judge: ROUTES.JUDGE,
      volunteer: ROUTES.VOLUNTEER,
      mentor: ROUTES.MENTOR,
      participant: ROUTES.DASHBOARD,
    };
    return <Navigate to={roleDashboards[user.role] || ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}
