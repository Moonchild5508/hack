import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, LayoutDashboard, Store, Package } from 'lucide-react';

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Don't show header on login/signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Therapy Studio
            </span>
          </Link>
          {user && (
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
              <Link
                to="/"
                className="transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/library"
                className="transition-colors hover:text-primary"
              >
                Library
              </Link>
              <Link
                to="/marketplace"
                className="transition-colors hover:text-primary"
              >
                Marketplace
              </Link>
              <Link
                to="/my-resources"
                className="transition-colors hover:text-primary"
              >
                My Resources
              </Link>
              {profile?.role === 'therapist' || profile?.role === 'admin' ? (
                <>
                  <Link
                    to="/therapist-dashboard"
                    className="transition-colors hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/manage-users"
                    className="transition-colors hover:text-primary"
                  >
                    Manage Users
                  </Link>
                  <Link
                    to="/activity-builder"
                    className="transition-colors hover:text-primary"
                  >
                    Create Activity
                  </Link>
                </>
              ) : null}
              {profile?.role === 'child' && (
                <Link
                  to="/child-dashboard"
                  className="transition-colors hover:text-primary"
                >
                  My Activities
                </Link>
              )}
              {profile?.role === 'parent' && (
                <Link
                  to="/parent-dashboard"
                  className="transition-colors hover:text-primary"
                >
                  My Children
                </Link>
              )}
              {profile?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="transition-colors hover:text-primary"
                >
                  Admin
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{profile.full_name || profile.username}</span>
                  <span className="inline sm:hidden">{profile.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{profile.full_name || profile.username}</p>
                    <p className="text-xs text-muted-foreground">@{profile.username}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      Role: {profile.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/marketplace')}>
                  <Store className="mr-2 h-4 w-4" />
                  Marketplace
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/my-resources')}>
                  <Package className="mr-2 h-4 w-4" />
                  My Resources
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {(profile.role === 'therapist' || profile.role === 'admin') && (
                  <DropdownMenuItem onClick={() => navigate('/therapist-dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                )}
                {profile.role === 'child' && (
                  <DropdownMenuItem onClick={() => navigate('/child-dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    My Activities
                  </DropdownMenuItem>
                )}
                {profile.role === 'parent' && (
                  <DropdownMenuItem onClick={() => navigate('/parent-dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    My Children
                  </DropdownMenuItem>
                )}
                {profile.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
}
