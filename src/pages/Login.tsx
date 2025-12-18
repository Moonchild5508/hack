import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Users, Stethoscope } from 'lucide-react';

type LoginType = 'child' | 'parent' | 'therapist';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<LoginType | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as any)?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both username and password',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    const { error } = await signIn(username, password);
    setLoading(false);

    if (error) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid username or password',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Logged in successfully'
      });
      navigate(from, { replace: true });
    }
  };

  if (!loginType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Select your login type to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setLoginType('child')}
                className="p-6 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-3"
              >
                <User className="h-12 w-12 text-primary" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">Child/Patient</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Play activities and games
                  </p>
                </div>
              </button>

              <button
                onClick={() => setLoginType('parent')}
                className="p-6 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-3"
              >
                <Users className="h-12 w-12 text-primary" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">Parent</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    View your child's progress
                  </p>
                </div>
              </button>

              <button
                onClick={() => setLoginType('therapist')}
                className="p-6 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-3"
              >
                <Stethoscope className="h-12 w-12 text-primary" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">Therapist</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create and assign activities
                  </p>
                </div>
              </button>
            </div>
            <div className="mt-6 text-center text-sm">
              Therapist? Need an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getLoginTitle = () => {
    switch (loginType) {
      case 'child':
        return 'Child/Patient Login';
      case 'parent':
        return 'Parent Login';
      case 'therapist':
        return 'Therapist Login';
    }
  };

  const getLoginIcon = () => {
    switch (loginType) {
      case 'child':
        return <User className="h-8 w-8 text-primary" />;
      case 'parent':
        return <Users className="h-8 w-8 text-primary" />;
      case 'therapist':
        return <Stethoscope className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            {getLoginIcon()}
          </div>
          <CardTitle className="text-2xl font-bold text-center">{getLoginTitle()}</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLoginType(null)}
            >
              ← Back to login type selection
            </Button>
          </div>
          {loginType === 'therapist' && (
            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
